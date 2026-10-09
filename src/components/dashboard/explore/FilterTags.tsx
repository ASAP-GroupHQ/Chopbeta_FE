"use client";

import React from "react";
import type { ExploreQuickFilter, ExploreMealType } from "@/types/explore";

interface FilterTagsProps {
  tags: ExploreQuickFilter[];
  activeTag: ExploreMealType | null;
  onSelectTag: (tag: ExploreMealType | null) => void;
}

export default function FilterTags({
  tags,
  activeTag,
  onSelectTag,
}: FilterTagsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = (tag.type ?? null) === activeTag;

        return (
          <button
            key={tag.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectTag(tag.type ?? null)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
              isActive
                ? "border-[#1E5E3A] bg-[#1E5E3A] text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
