"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Ellipsis, Eye, Pencil, Power, UserRoundCheck } from "lucide-react";

interface UserActionsMenuProps {
  userName: string;
  status: string;
  onView: () => void;
  onEdit: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function UserActionsMenu({
  userName,
  status,
  onView,
  onEdit,
  onActivate,
  onDeactivate,
}: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger || !menu) return;

      const triggerRect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const margin = 8;
      const left = Math.min(
        Math.max(margin, triggerRect.right - menuRect.width),
        window.innerWidth - menuRect.width - margin,
      );
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const top =
        spaceBelow >= menuRect.height + margin
          ? triggerRect.bottom + margin
          : Math.max(margin, triggerRect.top - menuRect.height - margin);

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const dismissOnOutsideClick = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", dismissOnOutsideClick);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOnOutsideClick);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [isOpen]);

  const selectAction = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`More actions for ${userName}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-lg p-2 text-[#77837b] transition hover:bg-[#f2f6f3] hover:text-[#2a7544] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348]"
      >
        <Ellipsis className="h-5 w-5" aria-hidden="true" />
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                role="menu"
                aria-label={`${userName} actions`}
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -3 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: position.top,
                  left: position.left,
                  transformOrigin: "top right",
                  zIndex: 100,
                }}
                className="w-44 overflow-hidden rounded-lg border border-[#e9ecea] bg-white py-1 shadow-[0_8px_24px_rgba(27,56,38,0.16)]"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => selectAction(onView)}
                  className="flex h-12 w-full items-center gap-3 px-3 text-left text-sm font-medium tracking-wide text-[#26342b] transition-colors hover:bg-[#f6f8f6] focus-visible:bg-[#f6f8f6] focus-visible:outline-none"
                >
                  <Eye className="h-[18px] w-[18px]" aria-hidden="true" />
                  View Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => selectAction(onEdit)}
                  className="flex h-12 w-full items-center gap-3 px-3 text-left text-sm font-medium tracking-wide text-[#26342b] transition-colors hover:bg-[#f6f8f6] focus-visible:bg-[#f6f8f6] focus-visible:outline-none"
                >
                  <Pencil className="h-[18px] w-[18px]" aria-hidden="true" />
                  Edit User
                </button>
                <div className="my-1 border-t border-[#edf0ed]" />
                {status === "Active" ? (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => selectAction(onDeactivate)}
                    className="flex h-12 w-full items-center gap-3 px-3 text-left text-sm font-medium tracking-wide text-[#bd5147] transition-colors hover:bg-rose-50 focus-visible:bg-rose-50 focus-visible:outline-none"
                  >
                    <Power className="h-[18px] w-[18px]" aria-hidden="true" />
                    Deactivate user
                  </button>
                ) : (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => selectAction(onActivate)}
                    className="flex h-12 w-full items-center gap-3 px-3 text-left text-sm font-medium tracking-wide text-[#27804a] transition-colors hover:bg-[#f0f8f2] focus-visible:bg-[#f0f8f2] focus-visible:outline-none"
                  >
                    <UserRoundCheck
                      className="h-[18px] w-[18px]"
                      aria-hidden="true"
                    />
                    Activate user
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
