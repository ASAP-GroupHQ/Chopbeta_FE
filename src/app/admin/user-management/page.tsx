"use client";

import { useCallback, useMemo, useState } from "react";
import UserDirectoryFilters from "@/components/admin/user-management/UserDirectoryFilters";
import UserActionDialog from "@/components/admin/user-management/UserActionDialog";
import UserManagementHeader from "@/components/admin/user-management/UserManagementHeader";
import UserResults from "@/components/admin/user-management/UserResults";
import UserStats from "@/components/admin/user-management/UserStats";
import type {
  AdminUser,
  UserDialogMode,
  UserEdits,
} from "@/components/admin/user-management/types";
import { USERS_DATA } from "@/constants/admin-management";
import { useToast } from "@/context/ToastContext";

const PAGE_SIZE = 5;

export default function UserManagementPage() {
  const toast = useToast();
  const [users, setUsers] = useState<AdminUser[]>(() =>
    USERS_DATA.map((user) => ({
      ...user,
      gender: "female",
      stateOfOrigin: "Delta",
      LGA: "Burutu",
      houseAddress: "no 2 olakein street",
      countryOfResidence: "Nigeria",
      dateOfBirth: "2026-05-13",
      allergies: [],
      disLikes: [],
      isVerified: true,
      isKYCVerified: true,
    })),
  );
  const [activeDialog, setActiveDialog] = useState<{
    user: AdminUser;
    mode: UserDialogMode;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All roles");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const visiblePage = Math.min(currentPage, pageCount);
  const pageUsers = filteredUsers.slice(
    (visiblePage - 1) * PAGE_SIZE,
    visiblePage * PAGE_SIZE,
  );
  const firstUser = filteredUsers.length
    ? (visiblePage - 1) * PAGE_SIZE + 1
    : 0;
  const lastUser = Math.min(visiblePage * PAGE_SIZE, filteredUsers.length);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
  }, []);

  const saveUser = (id: string, updates: UserEdits) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, ...updates } : user,
      ),
    );
    setActiveDialog(null);
    toast.success("User profile updated.");
  };

  const deactivateUser = (userToDeactivate: AdminUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userToDeactivate.id ? { ...user, status: "Inactive" } : user,
      ),
    );
    setActiveDialog(null);
    toast.success("User account deactivated.");
  };

  const activateUser = (userToActivate: AdminUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userToActivate.id ? { ...user, status: "Active" } : user,
      ),
    );
    setActiveDialog(null);
    toast.success("User account activated.");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRole("All roles");
    setSelectedStatus("All statuses");
    setCurrentPage(1);
  };

  const exportUsers = () => {
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
    const rows = filteredUsers.map((user) => [
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
      <UserStats />
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
          resultCount={filteredUsers.length}
          currentPage={visiblePage}
          pageCount={pageCount}
          onPageChange={(page) =>
            changePage(Math.min(page, pageCount))
          }
          onView={(user) => setActiveDialog({ user, mode: "view" })}
          onEdit={(user) => setActiveDialog({ user, mode: "edit" })}
          onActivate={(user) => setActiveDialog({ user, mode: "activate" })}
          onDeactivate={(user) =>
            setActiveDialog({ user, mode: "deactivate" })
          }
        />
      </section>
      <UserActionDialog
        isOpen={Boolean(activeDialog)}
        user={activeDialog?.user ?? null}
        mode={activeDialog?.mode ?? "view"}
        onClose={closeDialog}
        onSave={saveUser}
        onActivate={activateUser}
        onDeactivate={deactivateUser}
      />
    </div>
  );
}
