"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUp,
  FiChevronRight,
  FiMessageCircle,
  FiPlus,
  FiShield,
} from "react-icons/fi";
import HeaderActions from "@/components/dashboard/HeaderActions";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  time: string;
}

const SUGGESTED_PROMPTS = [
  "Help me plan meals on a budget",
  "How do I update my food preferences?",
  "How can I track a meal?",
];

function assistantReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("budget") || text.includes("plan") || text.includes("generate")) {
    return "To build a plan, open Generate Meal from your dashboard, enter your budget or choose a quick amount, then select Generate Meal. You can open any suggestion to review its estimated price and nutrition before adding it to your plan.";
  }
  if (text.includes("allerg") || text.includes("dislike") || text.includes("preference")) {
    return "You can manage that in Settings → Dietary Preferences. Choose the foods you need to avoid or dislike, add any custom items, and save your changes. Future suggestions can then take those preferences into account.";
  }
  if (text.includes("track") || text.includes("eaten")) {
    return "Open Track from your dashboard to see today’s planned meals. Use the status control beside a meal to mark it as eaten and update your daily progress.";
  }
  if (text.includes("account") || text.includes("password") || text.includes("login") || text.includes("sign in")) {
    return "For profile settings, open Settings → Personal Details. For sign-in or password help, email support@chopbeta.com and include the email address on your ChopBeta account.";
  }
  if (text.includes("contact") || text.includes("human") || text.includes("support")) {
    return "You can reach the support team at support@chopbeta.com or call +234 (0) 707 435 7521. Include a short description of what you need help with.";
  }

  return "I can help you find your way around meal planning, budgets, dietary preferences, tracking, and account settings. Tell me a little more about what you’re trying to do, or choose one of the suggestions below.";
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function KiraChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi, I’m KIRA, your ChopBeta assistant. What can I help you figure out today?",
      time: formatTime(new Date()),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isReplying]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isReplying) return;

    const sentAt = new Date();
    setMessages((previous) => [
      ...previous,
      { id: sentAt.getTime(), role: "user", text: trimmed, time: formatTime(sentAt) },
    ]);
    setDraft("");
    setIsReplying(true);

    window.setTimeout(() => {
      const repliedAt = new Date();
      setMessages((previous) => [
        ...previous,
        {
          id: repliedAt.getTime(),
          role: "assistant",
          text: assistantReply(trimmed),
          time: formatTime(repliedAt),
        },
      ]);
      setIsReplying(false);
    }, 700);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-13rem)] max-w-5xl flex-col pb-2 lg:min-h-[calc(100dvh-8rem)]">
      <header className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-emerald-200 hover:text-[#1E6B3C]"
          >
            <FiArrowLeft />
          </Link>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1E6B3C]">ChopBeta assistant</p>
            <h1 className="truncate text-xl font-black text-[#1A2E35] sm:text-2xl">Chat with KIRA</h1>
          </div>
        </div>
        <HeaderActions />
      </header>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_36px_rgba(26,46,53,0.07)]">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#EAF6EE]">
              <Image src="/chopbeta-favicon.png" alt="KIRA assistant" width={28} height={28} className="object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-[#1A2E35]">KIRA</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ChopBeta AI Assistant
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-[10px] font-semibold text-gray-500 sm:inline-flex">
            <FiShield className="text-[#1E6B3C]" /> Personal, helpful guidance
          </span>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto bg-[#FCFDFC] px-4 py-5 sm:px-6 sm:py-7">
          <div className="mx-auto flex max-w-md items-center justify-center gap-2 text-[10px] font-semibold text-gray-400">
            <span className="h-px flex-1 bg-gray-100" />
            TODAY
            <span className="h-px flex-1 bg-gray-100" />
          </div>

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[88%] items-end gap-2.5 sm:max-w-[76%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  {message.role === "assistant" ? (
                    <div className="mb-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF6EE]">
                      <Image src="/chopbeta-favicon.png" alt="" width={17} height={17} className="object-contain" />
                    </div>
                  ) : null}
                  <div>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "rounded-br-md bg-[#1E6B3C] text-white" : "rounded-bl-md border border-gray-100 bg-white text-[#34433B] shadow-sm"}`}>
                      {message.text}
                    </div>
                    <p className={`mt-1.5 text-[10px] text-gray-400 ${message.role === "user" ? "text-right" : ""}`}>{message.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isReplying && (
            <div className="flex items-end gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF6EE]">
                <Image src="/chopbeta-favicon.png" alt="" width={17} height={17} className="object-contain" />
              </div>
              <div className="flex h-10 items-center gap-1 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 shadow-sm" aria-label="KIRA is replying">
                {[0, 1, 2].map((dot) => (
                  <motion.span key={dot} animate={{ y: [0, -3, 0] }} transition={{ duration: 0.65, repeat: Infinity, delay: dot * 0.12 }} className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="border-t border-gray-100 px-4 pt-3 sm:px-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">You could ask</p>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-[#1E6B3C]"
                >
                  {prompt} <FiChevronRight size={13} />
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-gray-100 bg-white p-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-[#FAFCFA] p-1.5 transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100">
            <button
              type="button"
              aria-label="Focus message input"
              onClick={() => inputRef.current?.focus()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white hover:text-[#1E6B3C]"
            >
              <FiPlus />
            </button>
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Message KIRA..."
              aria-label="Message KIRA"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-[#1A2E35] outline-none placeholder:text-gray-400"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.92 }}
              disabled={!draft.trim() || isReplying}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E6B3C] text-white transition hover:bg-[#185A31] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              <FiArrowUp size={18} />
            </motion.button>
          </div>
          <p className="mt-2 text-center text-[10px] leading-relaxed text-gray-400">
            KIRA can guide you through ChopBeta. For account-specific help, contact support@chopbeta.com.
          </p>
        </form>
      </section>
    </div>
  );
}
