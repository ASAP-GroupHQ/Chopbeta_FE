"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiClipboard,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { useToast } from "@/context/ToastContext";

type ServiceSection = "support" | "referral" | "contact" | "faq";

const SUPPORT_TOPICS = [
  {
    title: "Account & profile assistance",
    description:
      "Help with your profile, sign-in, password, or account settings.",
    icon: FiShield,
  },
  {
    title: "Meal planning guidance",
    description:
      "Questions about budgets, generated plans, or understanding meal suggestions.",
    icon: FiHelpCircle,
  },
  {
    title: "Dietary preferences",
    description:
      "Need help updating allergies or foods you would rather avoid? We can help.",
    icon: FiMessageCircle,
  },
  {
    title: "App feedback & technical issues",
    description:
      "Tell us about a bug or share an idea that could make ChopBeta better.",
    icon: FiClipboard,
  },
];

const FAQ_ITEMS = [
  {
    question: "How does ChopBeta create a meal plan?",
    answer:
      "Enter your budget in Generate Meal Plan and ChopBeta suggests meal options that fit. You can review the estimated price and nutrition details before adding a meal to your plan.",
  },
  {
    question: "How do I update my allergies or food dislikes?",
    answer:
      "Open Settings, choose Dietary Preferences, update the foods in either list, and save your changes. Those preferences help personalize future meal suggestions.",
  },
  {
    question: "Are nutrition values exact?",
    answer:
      "Nutrition values are estimates and can vary with ingredients, portion sizes, and preparation. Use them as a guide rather than medical or dietary advice.",
  },
  {
    question: "How do I track a planned meal?",
    answer:
      "Open Track from the dashboard, find the meal in your plan, and mark it as eaten when you have had it. Your daily progress updates from there.",
  },
  {
    question: "How can I get help with my account?",
    answer:
      "Contact support by phone or email from the Contact Us section. Include the email address on your account and a short description of the issue so we can assist you.",
  },
];

function ServiceHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-7 border-b border-gray-100 pb-5"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1E6B3C]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-black leading-tight text-[#1A2E35] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
        {description}
      </p>
    </motion.header>
  );
}

function SupportSection() {
  return (
    <div>
      <ServiceHeading
        eyebrow="Support"
        title="How can we help you today?"
        description="We're here to make your ChopBeta experience smooth, useful, and delicious."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {SUPPORT_TOPICS.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.article
              key={topic.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-colors hover:border-emerald-100 hover:bg-emerald-50/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1E6B3C]">
                <Icon size={18} />
              </span>
              <span>
                <h3 className="text-sm font-bold text-[#1A2E35]">
                  {topic.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {topic.description}
                </p>
              </span>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-[#F3F8F4] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#1A2E35]">
            Need a hand right now?
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Our average support response time is under 10 minutes.
          </p>
        </div>
        <a
          href="mailto:asapgrouphq@gmail.com?subject=ChopBeta%20Support"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#185A31] active:scale-[0.98]"
        >
          <FiMail /> Email support <FiArrowUpRight />
        </a>
      </div>
    </div>
  );
}

function ReferralSection() {
  const toast = useToast();
  const referralCode = "CHOP-BETA-2026";

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast.success(
        "Referral code copied",
        "Share it with friends and classmates.",
      );
    } catch {
      toast.error(
        "Could not copy the code",
        "Please select and copy it manually.",
      );
    }
  };

  return (
    <div>
      <ServiceHeading
        eyebrow="Refer & earn"
        title="Invite friends, share good food!"
        description="Share ChopBeta with your network and help more people plan meals around their budget."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            number: "01",
            title: "Share your code",
            description:
              "Send your referral code to friends, family, or coursemates.",
          },
          {
            number: "02",
            title: "They join ChopBeta",
            description:
              "Your friends create an account and explore budget-friendly meal planning.",
          },
          {
            number: "03",
            title: "Rewards are coming",
            description:
              "Referral discounts will appear here when the rewards program is available.",
          },
        ].map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.06 }}
            className="rounded-2xl border border-gray-100 p-4"
          >
            <span className="text-xs font-black text-[#1E6B3C]">
              {step.number}
            </span>
            <h3 className="mt-3 text-sm font-bold text-[#1A2E35]">
              {step.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-100 bg-[#F3F8F4] p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[#1E6B3C]">
          <FiUsers />
          <h3 className="text-sm font-bold text-[#1A2E35]">
            Your referral code
          </h3>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="flex min-h-12 flex-1 items-center rounded-xl border border-dashed border-emerald-200 bg-white px-4 text-base font-black tracking-wide text-[#1E6B3C]">
            {referralCode}
          </code>
          <button
            type="button"
            onClick={copyReferralCode}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white transition hover:bg-[#185A31] active:scale-[0.98]"
          >
            <FiClipboard /> Copy code
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-gray-100 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Earned credits
          </p>
          <p className="mt-1 text-lg font-black text-[#1A2E35]">₦0.00</p>
        </div>
        <div className="rounded-2xl border border-gray-100 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Friends referred
          </p>
          <p className="mt-1 text-lg font-black text-[#1A2E35]">0</p>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div>
      <ServiceHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Have feedback, questions, or business inquiries? We'd love to hear from you."
      />
      <div className="divide-y divide-gray-100">
        <a
          href="tel:+2349077770573"
          className="group flex items-center gap-4 py-4 transition-colors hover:text-[#1E6B3C]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1E6B3C]">
            <FiPhone />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-gray-400">
              Customer care line
            </span>
            <span className="mt-1 block text-sm font-bold text-[#1A2E35]">
              +234 (0) 707 435 7521
            </span>
          </span>
          <FiArrowUpRight className="text-gray-300 transition group-hover:text-[#1E6B3C]" />
        </a>
        <a
          href="mailto:asapgrouphq@gmail.com"
          className="group flex items-center gap-4 py-4 transition-colors hover:text-[#1E6B3C]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1E6B3C]">
            <FiMail />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-gray-400">
              Support email
            </span>
            <span className="mt-1 block break-all text-sm font-bold text-[#1A2E35]">
              asapgrouphq@gmail.com
            </span>
          </span>
          <FiArrowUpRight className="text-gray-300 transition group-hover:text-[#1E6B3C]" />
        </a>
        <div className="flex items-center gap-4 py-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <FiHelpCircle />
          </span>
          <span>
            <span className="block text-xs font-semibold text-gray-400">
              Operating hours
            </span>
            <span className="mt-1 block text-sm font-bold text-[#1A2E35]">
              Monday–Sunday, 8:00 AM–10:00 PM
            </span>
          </span>
        </div>
        <Link
          href="/dashboard/chat"
          className="group flex items-center gap-4 py-4 transition-colors hover:text-[#1E6B3C]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1E6B3C]">
            <FiMessageCircle />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-gray-400">
              KIRA · ChopBeta AI Assistant
            </span>
            <span className="mt-1 block text-sm font-bold text-[#1A2E35]">
              Start a chat for guided help
            </span>
          </span>
          <FiArrowUpRight className="text-gray-300 transition group-hover:text-[#1E6B3C]" />
        </Link>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <ServiceHeading
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Quick answers to help you get more from ChopBeta."
      />
      <div className="divide-y divide-gray-100">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `settings-faq-answer-${index}`;
          return (
            <div key={item.question} className="py-1">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-sm font-bold leading-relaxed text-[#1A2E35]">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-[#1E6B3C]"
                >
                  <FiChevronDown />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-4 pr-8 text-sm leading-relaxed text-gray-500">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ServiceSettings({
  section,
}: {
  section: ServiceSection;
}) {
  return (
    <motion.div
      key={section}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="min-h-80"
    >
      {section === "support" ? <SupportSection /> : null}
      {section === "referral" ? <ReferralSection /> : null}
      {section === "contact" ? <ContactSection /> : null}
      {section === "faq" ? <FaqSection /> : null}
    </motion.div>
  );
}
