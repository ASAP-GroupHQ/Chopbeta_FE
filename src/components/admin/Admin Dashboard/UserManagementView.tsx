"use client";

import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { mockUsers } from "./data";

export default function UserManagementView() {
  const [search, setSearch] = useState("");
  const filteredUsers = mockUsers.filter((user) => {
    const value = search.toLowerCase();
    return [user.name, user.username, user.email].some((field) => field.toLowerCase().includes(value));
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pl-64">
      <AdminSidebar />
      <AdminHeader title="User Management" subtitle="View, manage and monitor all registered users on ChopBeta." />
      <main className="p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-lg font-semibold text-gray-900">Registered users</h2><p className="text-sm text-gray-500">{mockUsers.length} users in your workspace</p></div><button className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"><PlusCircle className="h-4 w-4" />Add user</button></div>
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"><Search className="h-5 w-5 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, username or email" className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" /></div>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"><div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 border-b border-gray-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"><span>User</span><span>Email</span><span>Status</span><span>Last active</span></div>{filteredUsers.map((user) => <div key={user.id} className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-4 border-b border-gray-50 px-5 py-4 last:border-0"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">{user.name.charAt(0)}</div><div><p className="text-sm font-semibold text-gray-800">{user.name}</p><p className="text-xs text-gray-400">{user.username}</p></div></div><span className="truncate text-sm text-gray-600">{user.email}</span><span className="text-sm text-gray-500">{user.status ?? "Active"}</span><span className="text-sm text-gray-500">{user.lastActive ?? "Recently"}</span></div>)}</div>
      </main>
    </div>
  );
}
