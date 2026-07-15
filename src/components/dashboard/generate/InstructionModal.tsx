"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHelpCircle, FiX } from "react-icons/fi";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionModal({
  isOpen,
  onClose,
}: InstructionModalProps) {
  const stepItems = [
    {
      num: "1",
      title: "Tell us your budget",
      desc: "Enter an amount or choose a quick shortcut asset value.",
    },
    {
      num: "2",
      title: "We find the best meals",
      desc: "ChopBeta suggest affordable and filling meals for you.",
    },
    {
      num: "3",
      title: "Review your meal plans",
      desc: "Inspect specific calculated profiles, micro-calories, and savings matrices.",
    },
    {
      num: "4",
      title: "Eat smart & save more",
      desc: "Stick directly to your designated targets and lower your feeding expenses.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A2E35]/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 space-y-6"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-black text-base text-[#1A2E35] flex items-center gap-1.5">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1473 17.7982C15.9557 16.9693 17.8274 15.8274 18.1705 12.9697C18.3076 12.0946 18.2618 11.2006 18.0362 10.3441C17.8106 9.48762 17.41 8.68714 16.8597 7.99313C16.3093 7.29913 15.6212 6.72666 14.8386 6.31181C14.056 5.89696 13.196 5.64873 12.3128 5.58276C11.4295 5.51678 10.5421 5.6345 9.70662 5.92849C8.8711 6.22249 8.10556 6.68638 7.45823 7.29092C6.81089 7.89547 6.29582 8.62756 5.94547 9.44105C5.59512 10.2545 5.41709 11.1318 5.42261 12.0175C5.42261 15.5833 7.58311 16.8798 8.50144 17.7982C9.22161 18.5401 9.11044 18.818 9.11044 20.0143C9.10207 20.165 9.12451 20.3159 9.17639 20.4578C9.22826 20.5996 9.30849 20.7294 9.41218 20.8391C9.51587 20.9489 9.64084 21.0365 9.77947 21.0964C9.91809 21.1563 10.0675 21.1873 10.2185 21.1875H13.4302C13.5814 21.1878 13.7309 21.1571 13.8697 21.0974C14.0085 21.0377 14.1337 20.9501 14.2374 20.8402C14.3411 20.7303 14.4211 20.6003 14.4727 20.4583C14.5242 20.3162 14.5461 20.1651 14.5371 20.0143C14.4827 18.795 14.3377 18.6295 15.1473 17.7982Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.96354 21.1213V22.9483C9.96354 23.4473 10.2415 23.857 10.5834 23.857H13.0641C13.4085 23.857 13.6852 23.4461 13.6852 22.9483V21.1213M10.8819 8.38546C10.1684 8.38578 9.48425 8.66943 8.97986 9.17405C8.47547 9.67867 8.19213 10.3629 8.19213 11.0764M20.6839 12.2618H22.9M18.4533 4.99729L20.0253 3.42525M19.6616 18.4195L21.2337 19.9903M11.8244 0.75V2.54196M3.65604 3.42404L5.21721 4.99729M2.44771 19.9903L4.00888 18.4195M2.96488 12.2618H0.75"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                How{" "}
                <span className="text-green-700 capitalize">
                  Chop<span className="text-[#E85D26] capitalize">Beta</span>
                </span>{" "}
                Works
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-50 text-gray-400"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {stepItems.map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <span className="w-6 h-6 rounded-full bg-green-700 text-green-50 flex items-center justify-center text-xs font-black flex-shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-[#1A2E35]">
                      {step.title}
                    </h5>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
