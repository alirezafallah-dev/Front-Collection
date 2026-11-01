"use client";

import { Check } from "lucide-react";

interface Option {
  id: string;
  label: string;
  count?: number;
}

interface Props {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CheckboxGroupFilter({ options, selected, onChange }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-1.5">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-300 ${
              selected.includes(option.id)
                ? "bg-primary border-primary"
                : "border-border group-hover:border-primary-light"
            }`}
          >
            {selected.includes(option.id) && (
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            )}
          </div>
          <span className="text-xs md:text-[13px] text-text group-hover:text-text-strong transition flex-1">
            {option.label}
          </span>
          {option.count !== undefined && (
            <span className="text-[10px] text-text-muted tabular-nums">
              ({option.count})
            </span>
          )}
        </label>
      ))}
    </div>
  );
}