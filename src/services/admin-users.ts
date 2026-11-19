import { apiClient } from "@/services/api-client";
import type {
  AdminUser,
  AdminUserPage,
  AdminUserRecord,
} from "@/types/admin-users";

interface ApiEnvelope<T> {
  data: T;
}

interface UserPagePayload {
  users?: AdminUserRecord[];
  totalUsers?: number;
  totalPages?: number;
  currentPage?: number;
}

interface StatusPayload {
  activeUsers?: AdminUserRecord[];
  inactiveUsers?: AdminUserRecord[];
  count?: number;
  totalPages?: number;
  currentPage?: number;
}

const requireCount = (value: unknown, label: string): number => {
  const count = Number(value);
  if (value === null || value === undefined || !Number.isFinite(count)) {
    throw new Error(`The ${label} API response was invalid.`);
  }
  return count;
};

const mapUser = (
  record: AdminUserRecord,
  status: "Active" | "Inactive" | "Unknown",
): AdminUser => ({
  id: record._id,
  name: record.fullName,
  handle: record.username ? `@${record.username}` : record.email,
  email: record.email,
  phone: record.phoneNumber ?? "—",
  profilePicture: record.profilePicture || record.avatar || record.image || undefined,
  role:
    record.role?.toLowerCase() === "admin"
      ? "Admin"
      : record.role?.toLowerCase() === "user"
        ? "User"
        : record.role ?? "—",
  status:
    record.isSuspended === true
      ? "Suspended"
      : record.isActive === true
        ? "Active"
        : record.isActive === false
          ? "Inactive"
          : status,
  dateJoined: formatDate(record.createdAt, false),
  lastActive: formatDate(record.lastActive, true),
});

function formatDate(value: string | undefined, includeTime: boolean): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return includeTime ? date.toLocaleString() : date.toLocaleDateString();
}

async function getStatusPage(
  status: "activeUsers" | "inactiveUsers",
  page: number,
  pageSize: number,
){
  return apiClient.get<ApiEnvelope<StatusPayload>>(
    `/auth/user/${status === "activeUsers" ? "active-users" : "inactive-users"}`,
    { params: { page, pageSize } },
  );
}

export const adminUsersService = {
  async getUsersPage(page: number, pageSize: number): Promise<AdminUserPage> {
    const response = await apiClient.get<ApiEnvelope<UserPagePayload>>(
      "/auth/user/all-users",
      { params: { page, pageSize } },
    );
    const payload = response.data.data;
    if (
      !Array.isArray(payload.users) ||
      !Number.isFinite(payload.totalUsers) ||
      !Number.isFinite(payload.totalPages)
    ) {
      throw new Error("The paginated users API response was incomplete.");
    }
    return {
      users: payload.users.map((user) =>
        mapUser(
          user,
          user.isActive === true
            ? "Active"
            : user.isActive === false
              ? "Inactive"
              : "Unknown",
        ),
      ),
      totalUsers: payload.totalUsers!,
      currentPage: payload.currentPage ?? page,
      totalPages: payload.totalPages!,
    };
  },

  async getAllUsers(): Promise<AdminUser[]> {
    const first = await apiClient.get<ApiEnvelope<UserPagePayload>>(
      "/auth/user/all-users",
      { params: { page: 1, pageSize: 100 } },
    );
    const payload = first.data.data;
    if (!Array.isArray(payload.users) || !Number.isFinite(payload.totalPages)) {
      throw new Error("The users API response was incomplete.");
    }
    const records = [...payload.users];
    for (let page = 2; page <= payload.totalPages!; page += 1) {
      const response = await apiClient.get<ApiEnvelope<UserPagePayload>>(
        "/auth/user/all-users",
        { params: { page, pageSize: 100 } },
      );
      if (!Array.isArray(response.data.data.users)) {
        throw new Error("The users API response was invalid.");
      }
      records.push(...response.data.data.users);
    }
    return records.map((record) =>
      mapUser(
        record,
        record.isActive === true
          ? "Active"
          : record.isActive === false
            ? "Inactive"
            : "Unknown",
      ),
    );
  },

  async getTotalUsers(): Promise<number> {
    const response = await apiClient.get<ApiEnvelope<UserPagePayload>>(
      "/auth/user/all-users",
      { params: { page: 1, pageSize: 1 } },
    );
    return requireCount(response.data.data.totalUsers, "total users");
  },

  async getActiveUsers(): Promise<number> {
    const response = await getStatusPage("activeUsers", 1, 1);
    return requireCount(response.data.data.count, "active users");
  },

  async getInactiveUsers(): Promise<number> {
    const response = await getStatusPage("inactiveUsers", 1, 1);
    return requireCount(response.data.data.count, "inactive users");
  },
};
