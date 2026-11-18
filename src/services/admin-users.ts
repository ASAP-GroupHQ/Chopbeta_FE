import { apiClient } from "@/services/api-client";
import type {
  AdminUser,
  AdminUserPage,
  AdminUserRecord,
  AdminUserSummary,
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

async function getAllStatusIds(
  status: "activeUsers" | "inactiveUsers",
): Promise<Set<string>> {
  const ids = new Set<string>();
  const pageSize = 100;
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const response = await getStatusPage(status, page, pageSize);
    const payload = response.data.data;
    const users = payload[status];
    if (!Array.isArray(users) || !Number.isFinite(payload.totalPages)) {
      throw new Error(`The ${status} API response was incomplete.`);
    }
    users.forEach((user) => ids.add(user._id));
    totalPages = Math.max(1, payload.totalPages!);
    page += 1;
  }
  return ids;
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
    const [activeIds, inactiveIds] = await Promise.all([
      getAllStatusIds("activeUsers"),
      getAllStatusIds("inactiveUsers"),
    ]);
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
        activeIds.has(record._id)
          ? "Active"
          : inactiveIds.has(record._id)
            ? "Inactive"
            : "Unknown",
      ),
    );
  },

  async getSummary(): Promise<AdminUserSummary> {
    const [users, active, inactive] = await Promise.all([
      apiClient.get<ApiEnvelope<UserPagePayload>>("/auth/user/all-users", {
        params: { page: 1, pageSize: 1 },
      }),
      getStatusPage("activeUsers", 1, 1),
      getStatusPage("inactiveUsers", 1, 1),
    ]);
    return {
      totalUsers: requireCount(users.data.data.totalUsers, "total users"),
      activeUsers: requireCount(active.data.data.count, "active users"),
      inactiveUsers: requireCount(inactive.data.data.count, "inactive users"),
    };
  },
};
