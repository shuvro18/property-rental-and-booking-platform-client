"use client";

import { Check } from "lucide-react";

const ApproveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 rounded-lg transition"
    >
      <Check size={14} />
      Approve
    </button>
  );
};

export default ApproveButton;