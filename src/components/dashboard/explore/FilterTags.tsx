"use client";

import React from "react";

interface FilterTagsProps {
  tags: string[];
  activeTag: string;
  onSelectTag: (tag: string) => void;
}

export default function FilterTags({
  tags,
  activeTag,
  onSelectTag,
}: FilterTagsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = tag === activeTag;

        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "border-[#1E5E3A] bg-[#1E5E3A] text-white"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
