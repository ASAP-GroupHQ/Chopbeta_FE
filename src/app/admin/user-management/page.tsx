"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Ellipsis,
  Filter,
  RotateCcw,
  Search,
  Users,
  X,
} from "lucide-react";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { USER_STATS, USERS_DATA } from "@/constants/admin-management";

const PAGE_SIZE = 5;

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All roles");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return USERS_DATA.filter((user) => {
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
  }, [searchQuery, selectedRole, selectedStatus]);

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const pageUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const firstUser = filteredUsers.length
    ? (currentPage - 1) * PAGE_SIZE + 1
    : 0;
  const lastUser = Math.min(currentPage * PAGE_SIZE, filteredUsers.length);

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
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-5 text-[#17211b] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              User Management
            </h1>
            <p className="mt-1 text-sm text-[#748078]">
              Manage and keep track of registered users.
            </p>
          </div>
          <HeaderActions />
        </div>

        <section
          aria-label="User statistics"
          className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {USER_STATS.map((stat, index) => {
            const Icon = stat.icon;
            const iconColors = [
              "bg-[#eaf4ee] text-[#247443]",
              "bg-[#e8f5ed] text-[#208149]",
              "bg-[#fff0eb] text-[#df6848]",
            ];
            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-[#edf0ed] bg-white p-5 shadow-[0_3px_15px_rgba(27,56,38,0.04)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#748078]">
                      {stat.title}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-[#17211b]">
                      {stat.value}
                    </p>
                  </div>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColors[index]}`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span className="font-semibold text-[#25834a]">
                    +{stat.change}
                  </span>
                  <span className="text-[#829087]">{stat.trendText}</span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#edf0ed] bg-white shadow-[0_3px_18px_rgba(27,56,38,0.04)]">
          <div className="border-b border-[#edf0ed] p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">All Users</h2>
                <p className="mt-1 text-sm text-[#829087]">
                  View and manage all registered users
                </p>
              </div>
              <button
                type="button"
                onClick={exportUsers}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe6e1] px-3 text-sm font-medium text-[#344239] transition hover:border-[#268348] hover:bg-[#f5faf6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Export
              </button>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search users</span>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909a93]"
                  aria-hidden="true"
                />
                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by name, email or phone"
                  className="h-11 w-full rounded-lg border border-[#e4e9e5] bg-white pl-10 pr-10 text-sm outline-none transition placeholder:text-[#9aa39d] focus:border-[#31844d] focus:ring-2 focus:ring-[#31844d]/10"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89948d] hover:text-[#344239]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-expanded={isFiltersOpen}
                  onClick={() => setIsFiltersOpen((open) => !open)}
                  className={`inline-flex h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348] ${
                    isFiltersOpen
                      ? "border-[#268348] bg-[#f4faf6] text-[#246f3e]"
                      : "border-[#e4e9e5] text-[#48564d] hover:bg-[#f8faf8]"
                  }`}
                >
                  <Filter className="h-4 w-4" aria-hidden="true" />
                  Filters
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e4e9e5] px-3 text-sm font-medium text-[#48564d] transition hover:bg-[#f8faf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348]"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
              </div>
            </div>

            {isFiltersOpen && (
              <div className="mt-3 grid gap-3 rounded-xl bg-[#f8faf8] p-3 sm:grid-cols-2 sm:p-4">
                <label className="text-xs font-medium text-[#67746b]">
                  Role
                  <select
                    value={selectedRole}
                    onChange={(event) => {
                      setSelectedRole(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="mt-1.5 h-10 w-full rounded-lg border border-[#e1e7e2] bg-white px-3 text-sm font-normal text-[#344239] outline-none focus:border-[#31844d]"
                  >
                    <option>All roles</option>
                    <option>Student</option>
                    <option>Admin</option>
                  </select>
                </label>
                <label className="text-xs font-medium text-[#67746b]">
                  Status
                  <select
                    value={selectedStatus}
                    onChange={(event) => {
                      setSelectedStatus(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="mt-1.5 h-10 w-full rounded-lg border border-[#e1e7e2] bg-white px-3 text-sm font-normal text-[#344239] outline-none focus:border-[#31844d]"
                  >
                    <option>All statuses</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>
              </div>
            )}
          </div>

          <div className="divide-y divide-[#edf0ed] xl:hidden">
            {pageUsers.map((user) => (
              <article key={user.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#26342b]">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-[#8a958d]">
                        {user.handle}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={user.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-xs">
                  <Detail label="Email" value={user.email} />
                  <Detail label="Phone number" value={user.phone} />
                  <Detail label="Role" value={user.role} />
                  <Detail label="Date joined" value={user.dateJoined} />
                  <Detail label="Last active" value={user.lastActive} />
                  <button
                    type="button"
                    aria-label={`More actions for ${user.name}`}
                    className="justify-self-end self-end rounded-lg p-2 text-[#77837b] transition hover:bg-[#f2f6f3] hover:text-[#2a7544]"
                  >
                    <Ellipsis className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
            {pageUsers.length === 0 && <EmptyState />}
          </div>

          <div className="hidden overflow-x-auto xl:block">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="bg-[#f8faf8] text-xs font-semibold uppercase tracking-[0.04em] text-[#77837b]">
                  <th className="px-5 py-4">User</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Phone number</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Date joined</th>
                  <th className="px-4 py-4">Last active</th>
                  <th className="px-4 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0ed]">
                {pageUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-[#fbfcfb]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatar}
                          alt=""
                          width={42}
                          height={42}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-[#26342b]">
                            {user.name}
                          </p>
                          <p className="mt-0.5 text-xs text-[#8a958d]">
                            {user.handle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#58645c]">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#58645c]">
                      {user.phone}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-[#f2f4f3] px-2.5 py-1 text-xs font-medium text-[#59655d]">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#58645c]">
                      {user.dateJoined}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-[#58645c]">
                      {user.lastActive}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        aria-label={`More actions for ${user.name}`}
                        className="rounded-lg p-2 text-[#77837b] transition hover:bg-[#f2f6f3] hover:text-[#2a7544]"
                      >
                        <Ellipsis className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
                {pageUsers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12">
                      <EmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-col gap-3 border-t border-[#edf0ed] px-4 py-4 text-sm text-[#77837b] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              Showing <span className="font-medium text-[#344239]">{firstUser}</span>
              {" "}to <span className="font-medium text-[#344239]">{lastUser}</span>
              {" "}of <span className="font-medium text-[#344239]">{filteredUsers.length}</span> users
            </p>
            <nav aria-label="User list pagination" className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e9e5] transition hover:bg-[#f6f8f6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={page === currentPage ? "page" : undefined}
                    onClick={() => changePage(page)}
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-[#258148] text-white shadow-sm"
                        : "text-[#657168] hover:bg-[#f2f6f3]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e9e5] transition hover:bg-[#f6f8f6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </footer>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive
          ? "bg-[#eaf6ee] text-[#27804a]"
          : "bg-[#fff0eb] text-[#cf6245]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#31a15b]" : "bg-[#e37958]"}`}
      />
      {status}
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[#929d95]">{label}</p>
      <p className="mt-1 truncate font-medium text-[#46534a]">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-5 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5f0] text-[#31844d]">
        <Users className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-[#344239]">No users found</p>
      <p className="mt-1 text-xs text-[#829087]">
        Try changing your search or filters.
      </p>
    </div>
  );
}
