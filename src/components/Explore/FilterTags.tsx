import React from "react";

const TAGS = ["All", "Rice", "Soup", "Swallow", "Snacks", "Protein", "Vegetarian"];

export default function FilterTags() {
  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {TAGS.map((tag, idx) => (
        <button key={tag} className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors ${idx === 0 ? "bg-[#1E5E3A] border-[#1E5E3A] text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          {tag}
        </button>
      ))}
    </div>
  );
}
