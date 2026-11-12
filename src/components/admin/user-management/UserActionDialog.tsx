"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Pencil,
  Power,
  UserRound,
  UserRoundCheck,
  X,
} from "lucide-react";
import type { AdminUser, UserDialogMode, UserEdits } from "./types";

interface UserActionDialogProps {
  isOpen: boolean;
  user: AdminUser | null;
  mode: UserDialogMode;
  onClose: () => void;
  onSave: (id: string, updates: UserEdits) => void;
  onActivate: (user: AdminUser) => void;
  onDeactivate: (user: AdminUser) => void;
}

const inputClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-[#e4e9e5] bg-white px-3.5 text-sm text-[#28352d] outline-none transition focus:border-[#31844d] focus:ring-2 focus:ring-[#31844d]/10";

type UserTextField = Exclude<keyof UserEdits, "allergies" | "disLikes">;

export default function UserActionDialog({
  isOpen,
  user,
  mode,
  onClose,
  onSave,
  onActivate,
  onDeactivate,
}: UserActionDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  const title =
    mode === "view"
      ? "User profile"
      : mode === "edit"
        ? "Edit user"
        : mode === "activate"
          ? "Activate account"
          : "Deactivate account";
  const subtitle =
    mode === "view"
      ? "Profile information and account status"
      : mode === "edit"
        ? "Update this user's profile information"
        : mode === "activate"
          ? "Restore this user's access"
          : "Review the impact before continuing";

  return createPortal(
    <AnimatePresence>
      {isOpen && user && (
        <motion.div
          key={`${mode}-${user.id}`}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#111922]/55 p-3 backdrop-blur-[2px] sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role={
              mode === "deactivate" || mode === "activate"
                ? "alertdialog"
                : "dialog"
            }
            aria-modal="true"
            aria-labelledby="user-action-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e4e9e5] bg-white shadow-[0_24px_70px_rgba(17,25,34,0.24)]"
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#edf0ed] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    mode === "deactivate"
                      ? "bg-[#fbefed] text-[#bd665c]"
                      : "bg-[#eaf4ee] text-[#247443]"
                  }`}
                >
                  {mode === "deactivate" ? (
                    <Power className="h-5 w-5" aria-hidden="true" />
                  ) : mode === "activate" ? (
                    <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
                  ) : mode === "edit" ? (
                    <Pencil className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0">
                  <h2
                    id="user-action-title"
                    className="text-lg font-bold tracking-tight text-[#26342b] sm:text-xl"
                  >
                    {title}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#7b887f]">{subtitle}</p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="rounded-lg p-2 text-[#7b887f] transition hover:bg-[#f3f6f3] hover:text-[#344239]"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {mode === "view" && <UserProfile user={user} onClose={onClose} />}
            {mode === "edit" && (
              <EditUserForm
                key={user.id}
                user={user}
                onCancel={onClose}
                onSave={onSave}
              />
            )}
            {mode === "deactivate" && (
              <div className="px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3 rounded-xl bg-[#fbf6f4] p-4">
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#bd665c]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-[#59645c]">
                    Deactivate{" "}
                    <span className="font-semibold text-[#26342b]">
                      {user.name}
                    </span>
                    ? They will no longer be able to access their account. You
                    can review and restore access later.
                  </p>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeactivate(user)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#bd5147] px-5 text-sm font-bold text-white transition hover:bg-[#a6433a] active:scale-[0.98]"
                  >
                    <Power className="h-4 w-4" aria-hidden="true" />
                    Deactivate account
                  </button>
                </div>
              </div>
            )}
            {mode === "activate" && (
              <div className="px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3 rounded-xl bg-[#f0f8f2] p-4">
                  <UserRoundCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#27804a]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-[#59645c]">
                    Activate{" "}
                    <span className="font-semibold text-[#26342b]">
                      {user.name}
                    </span>
                    ? They will be able to access their account again.
                  </p>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => onActivate(user)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white transition hover:bg-[#185a31] active:scale-[0.98]"
                  >
                    <UserRoundCheck className="h-4 w-4" aria-hidden="true" />
                    Activate account
                  </button>
                </div>
              </div>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function UserProfile({
  user,
  onClose,
}: {
  user: AdminUser;
  onClose: () => void;
}) {
  return (
    <div className="space-y-5 px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-4 rounded-xl bg-[#f7f9f7] p-4 sm:flex-row sm:items-center">
        <Image
          src={user.avatar}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-[#26342b]">
            {user.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-[#7b887f]">
            {user.handle} · {user.email}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={user.status} />
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#59655d]">
              {user.role}
            </span>
            {user.isVerified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#27804a]">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-[#344239]">
          Personal information
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ProfileDetail label="Phone number" value={user.phone} />
          <ProfileDetail label="Gender" value={user.gender} />
          <ProfileDetail label="Date of birth" value={formatDate(user.dateOfBirth)} />
          <ProfileDetail label="Country of residence" value={user.countryOfResidence} />
          <ProfileDetail label="State of origin" value={user.stateOfOrigin} />
          <ProfileDetail label="LGA" value={user.LGA} />
          <ProfileDetail
            label="House address"
            value={user.houseAddress}
            className="sm:col-span-2"
          />
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-[#344239]">
          Dietary preferences
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TagList label="Allergies" values={user.allergies} />
          <TagList label="Dislikes" values={user.disLikes} />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <ProfileDetail label="Date joined" value={user.dateJoined} />
        <ProfileDetail label="Last active" value={user.lastActive} />
        <ProfileDetail
          label="KYC verification"
          value={user.isKYCVerified ? "Verified" : "Not verified"}
        />
        <ProfileDetail label="Account status" value={user.status} />
      </div>

      <DialogFooter onCancel={onClose} />
    </div>
  );
}

function EditUserForm({
  user,
  onCancel,
  onSave,
}: {
  user: AdminUser;
  onCancel: () => void;
  onSave: (id: string, updates: UserEdits) => void;
}) {
  const [form, setForm] = useState<UserEdits>(() => ({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    gender: user.gender,
    stateOfOrigin: user.stateOfOrigin,
    LGA: user.LGA,
    houseAddress: user.houseAddress,
    countryOfResidence: user.countryOfResidence,
    dateOfBirth: user.dateOfBirth,
    allergies: user.allergies,
    disLikes: user.disLikes,
  }));
  const [allergiesInput, setAllergiesInput] = useState(user.allergies.join(", "));
  const [dislikesInput, setDislikesInput] = useState(user.disLikes.join(", "));

  const updateField = (field: UserTextField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(user.id, {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      allergies: parseList(allergiesInput),
      disLikes: parseList(dislikesInput),
    });
  };

  return (
    <form onSubmit={submitEdit}>
      <div className="grid max-h-[min(65vh,600px)] gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
        <FormField label="Full name">
          <input
            type="text"
            required
            maxLength={120}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Email address">
          <input
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Phone number">
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Role">
          <select
            value={form.role}
            onChange={(event) => updateField("role", event.target.value)}
            className={inputClassName}
          >
            <option>Student</option>
            <option>Admin</option>
          </select>
        </FormField>
        <FormField label="Gender">
          <select
            value={form.gender}
            onChange={(event) => updateField("gender", event.target.value)}
            className={inputClassName}
          >
            <option value="">Not specified</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </FormField>
        <FormField label="Date of birth">
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={(event) => updateField("dateOfBirth", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Country of residence">
          <input
            type="text"
            value={form.countryOfResidence}
            onChange={(event) =>
              updateField("countryOfResidence", event.target.value)
            }
            className={inputClassName}
          />
        </FormField>
        <FormField label="State of origin">
          <input
            type="text"
            value={form.stateOfOrigin}
            onChange={(event) => updateField("stateOfOrigin", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="LGA">
          <input
            type="text"
            value={form.LGA}
            onChange={(event) => updateField("LGA", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="House address" className="sm:col-span-2">
          <input
            type="text"
            value={form.houseAddress}
            onChange={(event) => updateField("houseAddress", event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Allergies (comma separated)">
          <input
            type="text"
            value={allergiesInput}
            onChange={(event) => setAllergiesInput(event.target.value)}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Dislikes (comma separated)">
          <input
            type="text"
            value={dislikesInput}
            onChange={(event) => setDislikesInput(event.target.value)}
            className={inputClassName}
          />
        </FormField>
      </div>
      <DialogFooter
        onCancel={onCancel}
        submitLabel="Save changes"
        className="px-5 pb-5 sm:px-6"
      />
    </form>
  );
}

function FormField({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`block text-xs font-semibold text-[#526056] ${className}`}
    >
      {label}
      {children}
    </label>
  );
}

function ProfileDetail({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-[#f7f9f7] p-3 ${className}`}>
      <p className="text-[11px] font-medium text-[#89948d]">{label}</p>
      <p className="mt-1 break-words text-sm font-medium capitalize text-[#344239]">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function TagList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="rounded-xl bg-[#f7f9f7] p-3">
      <p className="text-[11px] font-medium text-[#89948d]">{label}</p>
      {values.length ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((value) => (
            <span
              key={value}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[#526056]"
            >
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-1 text-sm font-medium text-[#344239]">None listed</p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive ? "bg-[#eaf6ee] text-[#27804a]" : "bg-[#fff0eb] text-[#cf6245]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-[#31a15b]" : "bg-[#e37958]"
        }`}
      />
      {status}
    </span>
  );
}

function DialogFooter({
  onCancel,
  submitLabel,
  className = "",
}: {
  onCancel: () => void;
  submitLabel?: string;
  className?: string;
}) {
  return (
    <footer
      className={`flex flex-col-reverse gap-2 border-t border-[#edf0ed] pt-4 sm:flex-row sm:justify-end ${className}`}
    >
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5]"
      >
        Close
      </button>
      {submitLabel && (
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white transition hover:bg-[#185a31]"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          {submitLabel}
        </button>
      )}
    </footer>
  );
}

function parseList(value: string) {
  return [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))];
}

function formatDate(value: string) {
  if (!value) return "Not provided";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}
