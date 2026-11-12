"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import UserActionsMenu from "./UserActionsMenu";
import type { AdminUser } from "./types";

interface UserResultsProps {
  users: AdminUser[];
  firstUser: number;
  lastUser: number;
  resultCount: number;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onActivate: (user: AdminUser) => void;
  onDeactivate: (user: AdminUser) => void;
}

export default function UserResults({
  users,
  firstUser,
  lastUser,
  resultCount,
  currentPage,
  pageCount,
  onPageChange,
  onView,
  onEdit,
  onActivate,
  onDeactivate,
}: UserResultsProps) {
  return (
    <>
      <div className="divide-y divide-[#edf0ed] xl:hidden">
        {users.map((user) => (
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
              <UserActionsMenu
                userName={user.name}
                status={user.status}
                onView={() => onView(user)}
                onEdit={() => onEdit(user)}
                onActivate={() => onActivate(user)}
                onDeactivate={() => onDeactivate(user)}
              />
            </div>
          </article>
        ))}
        {users.length === 0 && <EmptyState />}
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
            {users.map((user) => (
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
                  <UserActionsMenu
                    userName={user.name}
                    status={user.status}
                    onView={() => onView(user)}
                    onEdit={() => onEdit(user)}
                    onActivate={() => onActivate(user)}
                    onDeactivate={() => onDeactivate(user)}
                  />
                </td>
              </tr>
            ))}
            {users.length === 0 && (
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
          Showing{" "}
          <span className="font-medium text-[#344239]">{firstUser}</span> to{" "}
          <span className="font-medium text-[#344239]">{lastUser}</span> of{" "}
          <span className="font-medium text-[#344239]">{resultCount}</span>{" "}
          users
        </p>
        <nav
          aria-label="User list pagination"
          className="flex items-center gap-1"
        >
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
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
                onClick={() => onPageChange(page)}
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
            onClick={() => onPageChange(currentPage + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e9e5] transition hover:bg-[#f6f8f6] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </footer>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive ? "bg-[#eaf6ee] text-[#27804a]" : "bg-[#fff0eb] text-[#cf6245]"
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
