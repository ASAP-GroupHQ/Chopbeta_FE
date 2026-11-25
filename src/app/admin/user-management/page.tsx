"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import UserDirectoryFilters from "@/components/admin/user-management/UserDirectoryFilters";
import UserActionDialog from "@/components/admin/user-management/UserActionDialog";
import UserManagementHeader from "@/components/admin/user-management/UserManagementHeader";
import UserResults from "@/components/admin/user-management/UserResults";
import UserStats from "@/components/admin/user-management/UserStats";
import type { AdminUser, AdminUserSummary } from "@/types/admin-users";
import { adminUsersService } from "@/services/admin-users";
import { useToast } from "@/context/ToastContext";

const PAGE_SIZE = 10;

export default function UserManagementPage() {
  const toast = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Partial<AdminUserSummary>>({});
  const [statsErrors, setStatsErrors] = useState<
    Partial<Record<keyof AdminUserSummary, string>>
  >({});
  const [loadError, setLoadError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [serverTotalUsers, setServerTotalUsers] = useState(0);
  const [serverTotalPages, setServerTotalPages] = useState(1);
  const [activeDialog, setActiveDialog] = useState<{
    user: AdminUser;
    mode: "view";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All roles");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filtersActive =
    Boolean(searchQuery.trim()) ||
    selectedRole !== "All roles" ||
    selectedStatus !== "All statuses";

  useEffect(() => {
    let active = true;
    const request = filtersActive
      ? adminUsersService.getAllUsers().then((userRecords) => ({
          users: userRecords,
          totalUsers: userRecords.length,
          currentPage: 1,
          totalPages: Math.max(1, Math.ceil(userRecords.length / PAGE_SIZE)),
        }))
      : adminUsersService.getUsersPage(currentPage, PAGE_SIZE);
    request
      .then((result) => {
        if (!active) return;
        setUsers(result.users);
        setServerTotalUsers(result.totalUsers);
        setServerTotalPages(result.totalPages);
        setLoadError("");
      })
      .catch((error: unknown) => {
        if (!active) return;
        setLoadError(
          error instanceof Error ? error.message : "Could not load users.",
        );
        toast.error(
          "Could not load users",
          error instanceof Error ? error.message : "Please try again.",
        );
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [
    currentPage,
    filtersActive,
    searchQuery,
    selectedRole,
    selectedStatus,
    toast,
  ]);

  useEffect(() => {
    let active = true;
    const loadStat = (
      key: keyof AdminUserSummary,
      request: Promise<number>,
    ) => {
      request
        .then((value) => {
          if (!active) return;
          setStats((current) => ({ ...current, [key]: value }));
          setStatsErrors((current) => {
            const next = { ...current };
            delete next[key];
            return next;
          });
        })
        .catch((error: unknown) => {
          if (!active) return;
          const message =
            error instanceof Error ? error.message : "Please try again.";
          setStatsErrors((current) => ({
            ...current,
            [key]: `Could not load ${key}: ${message}`,
          }));
        });
    };

    loadStat("totalUsers", adminUsersService.getTotalUsers());
    loadStat("activeUsers", adminUsersService.getActiveUsers());
    loadStat("inactiveUsers", adminUsersService.getInactiveUsers());
    return () => {
      active = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery =
        !query ||
        [user.name, user.handle, user.email, user.phone].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesRole =
        selectedRole === "All roles" || user.role === selectedRole;
      const matchesStatus =
        selectedStatus === "All statuses" || user.status === selectedStatus;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, selectedRole, selectedStatus]);

  const pageCount = filtersActive
    ? Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
    : serverTotalPages;
  const visiblePage = Math.min(currentPage, pageCount);
  const pageUsers = filtersActive
    ? filteredUsers.slice(
        (visiblePage - 1) * PAGE_SIZE,
        visiblePage * PAGE_SIZE,
      )
    : users;
  const resultCount = filtersActive ? filteredUsers.length : serverTotalUsers;
  const firstUser = resultCount
    ? (visiblePage - 1) * PAGE_SIZE + 1
    : 0;
  const lastUser = Math.min(visiblePage * PAGE_SIZE, resultCount);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRole("All roles");
    setSelectedStatus("All statuses");
    setCurrentPage(1);
  };

  const exportUsers = async () => {
    let usersToExport = filteredUsers;
    if (!filtersActive) {
      try {
        usersToExport = await adminUsersService.getAllUsers();
      } catch (error) {
        toast.error(
          "Could not export users",
          error instanceof Error ? error.message : "Please try again.",
        );
        return;
      }
    }

    const columns = [
      "Name",
      "Handle",
      "Email",
      "Phone",
      "Role",
      "Status",
      "Date joined",
      "Last active",
    ];
    const rows = usersToExport.map((user) => [
      user.name,
      user.handle,
      user.email,
      user.phone,
      user.role,
      user.status,
      user.dateJoined,
      user.lastActive,
    ]);
    const csv = [columns, ...rows]
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "chopbeta-users.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const changePage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), pageCount));
  };

  return (
    <div className="space-y-6">
      <UserManagementHeader />
      <UserStats stats={stats} />
      {Object.entries(statsErrors).map(([key, error]) => (
        <p key={key} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ))}
      {loadError && (
        <p role="alert" className="text-sm text-red-600">
          Could not load users: {loadError}
        </p>
      )}
      <section className="overflow-hidden rounded-2xl border border-[#edf0ed] bg-white shadow-[0_3px_18px_rgba(27,56,38,0.04)]">
        <UserDirectoryFilters
          searchQuery={searchQuery}
          selectedRole={selectedRole}
          selectedStatus={selectedStatus}
          isFiltersOpen={isFiltersOpen}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          onRoleChange={(value) => {
            setSelectedRole(value);
            setCurrentPage(1);
          }}
          onStatusChange={(value) => {
            setSelectedStatus(value);
            setCurrentPage(1);
          }}
          onFiltersToggle={() => setIsFiltersOpen((open) => !open)}
          onReset={resetFilters}
          onExport={exportUsers}
        />
        <UserResults
          users={pageUsers}
          firstUser={firstUser}
          lastUser={lastUser}
          resultCount={resultCount}
          currentPage={visiblePage}
          pageCount={pageCount}
          onPageChange={(page) =>
            changePage(Math.min(page, pageCount))
          }
          onView={(user) => setActiveDialog({ user, mode: "view" })}
        />
        {isLoading && (
          <p role="status" className="px-4 py-3 text-sm text-gray-500">
            Loading users…
          </p>
        )}
      </section>
      <UserActionDialog
        isOpen={Boolean(activeDialog)}
        user={activeDialog?.user ?? null}
        mode={activeDialog?.mode ?? "view"}
        onClose={closeDialog}
        onSave={() =>
          toast.error(
            "User editing is unavailable",
            "The API documentation does not provide an admin user-update endpoint.",
          )
        }
        onActivate={() =>
          toast.error(
            "User status changes are unavailable",
            "The API documentation does not provide an admin activation endpoint.",
          )
        }
        onDeactivate={() =>
          toast.error(
            "User status changes are unavailable",
            "The API documentation does not provide an admin deactivation endpoint.",
          )
        }
      />
    </div>
  );
}
