"use client";

import { Bell, ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import AdminSidebar from "../Admin Dashboard/AdminSidebar";
import UserManagementStats from "./UserManagementStats";
import UserManagementTable from "./UserManagementTable";
import UserManagementToolbar from "./UserManagementToolbar";
import { usersData } from "./types";

export default function UserManagementView() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = usersData.filter((user) => [user.name, user.username, user.email].some((value) => value.toLowerCase().includes(normalizedQuery)));

  return (
    <div className="min-h-screen bg-[#FBFBFC] font-sans text-slate-800 antialiased lg:pl-64">
      <AdminSidebar />
      <header className="flex items-center justify-between bg-transparent px-5 py-5 sm:px-8"><div><h1 className="text-xl font-bold tracking-tight text-slate-900">User Management</h1><p className="mt-0.5 text-[11px] font-medium text-slate-400">View, manage and monitor all registered users on ChopBeta.</p></div><div className="flex items-center gap-3"><button aria-label="Help" className="rounded-full p-2 text-slate-400 hover:bg-white hover:text-slate-600"><HelpCircle className="h-4 w-4" /></button><button aria-label="Notifications" className="rounded-full p-2 text-slate-400 hover:bg-white hover:text-slate-600"><Bell className="h-4 w-4" /></button><div className="flex items-center gap-2 border-l border-slate-200 pl-2"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">V</div><button className="flex items-center gap-1 text-xs font-bold text-slate-800">Victor<ChevronDown className="h-3 w-3 text-slate-400" /></button></div></div></header>
      <main className="space-y-5 px-5 pb-8 sm:px-8"><UserManagementStats /><UserManagementToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} /><UserManagementTable users={filteredUsers} /></main>
    </div>
  );
}
