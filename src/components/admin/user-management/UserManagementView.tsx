"use client";

import { Bell, ChevronDown, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin";
import AdminSidebar from "../Admin Dashboard/AdminSidebar";
import UserManagementStats from "./UserManagementStats";
import UserManagementTable from "./UserManagementTable";
import UserManagementToolbar from "./UserManagementToolbar";
import type { UserRecord } from "./types";

export default function UserManagementView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [counts, setCounts] = useState({ totalUsers: 0, activeUsers: 0, inactiveUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    adminService.getUsers()
      .then((data) => {
        if (!isCurrent) return;
        setCounts({
          totalUsers: data.totalUsers,
          activeUsers: data.activeUsers,
          inactiveUsers: data.inactiveUsers,
        });
        setUsers(data.users.map((user) => ({
          id: user._id,
          name: user.fullName,
          username: user.username ?? user.role ?? "User",
          email: user.email,
          phone: user.phoneNumber,
          role: user.role,
          status: user.isDeleted || user.isSuspended || user.isActive === false
            ? "Inactive"
            : "Active",
          dateJoined: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : undefined,
          lastActive: user.lastActive
            ? new Date(user.lastActive).toLocaleString()
            : undefined,
          avatar: "",
        })));
      })
      .catch((loadError: Error) => {
        if (isCurrent) setError(loadError.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    [user.name, user.username, user.email].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );

  return (
    <div className="min-h-screen bg-[#FBFBFC] font-sans text-slate-800 antialiased lg:pl-64">
      <AdminSidebar />
      <header className="flex items-center justify-between bg-transparent px-5 py-5 sm:px-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="mt-0.5 text-[11px] font-medium text-slate-400">View, manage and monitor all registered users on ChopBeta.</p>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Help" className="rounded-full p-2 text-slate-400 hover:bg-white hover:text-slate-600"><HelpCircle className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="rounded-full p-2 text-slate-400 hover:bg-white hover:text-slate-600"><Bell className="h-4 w-4" /></button>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">V</div>
            <button className="flex items-center gap-1 text-xs font-bold text-slate-800">Victor<ChevronDown className="h-3 w-3 text-slate-400" /></button>
          </div>
        </div>
      </header>
      <main className="space-y-5 px-5 pb-8 sm:px-8">
        <UserManagementStats {...counts} />
        <UserManagementToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
        {isLoading
          ? <p className="rounded-xl border border-slate-100 bg-white px-5 py-10 text-center text-sm text-slate-500">Loading users…</p>
          : <UserManagementTable users={filteredUsers} />}
      </main>
    </div>
  );
}
