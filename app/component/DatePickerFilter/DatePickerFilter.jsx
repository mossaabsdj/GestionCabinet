"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, X } from "lucide-react";

// YYYY-MM-DD → DD/MM/YYYY
function formatDateFR(dateStr) {
  if (!dateStr) return "";

  const parts = dateStr.split("-");

  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  return "";
}

// DD/MM/YYYY → YYYY-MM-DD
function parseDateFR(value) {
  const clean = value.replace(/\D/g, "");

  if (clean.length !== 8) return null;

  const day = clean.slice(0, 2);
  const month = clean.slice(2, 4);
  const year = clean.slice(4, 8);

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  // Validate real date
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return `${year}-${month}-${day}`;
}

export default function DatePickerFilter({
  value,
  onChange,
  placeholder = "Filtrer par date",
  className = "",
}) {
  const inputRef = useRef(null);

  const [displayValue, setDisplayValue] = useState(formatDateFR(value));

  // Keep input synchronized with external value
  useEffect(() => {
    setDisplayValue(formatDateFR(value));
  }, [value]);

  const openPicker = () => {
    try {
      if (
        inputRef.current &&
        typeof inputRef.current.showPicker === "function"
      ) {
        inputRef.current.showPicker();
      } else {
        inputRef.current?.focus();
      }
    } catch {
      inputRef.current?.focus();
    }
  };

  const handleInputChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    // Maximum DDMMYYYY
    input = input.slice(0, 8);

    // Add /
    if (input.length > 4) {
      input =
        input.slice(0, 2) + "/" + input.slice(2, 4) + "/" + input.slice(4);
    } else if (input.length > 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }

    setDisplayValue(input);

    // If user cleared the input, reset parent filter
    if (input.length === 0) {
      onChange("");
    }

    // Only update parent when complete + valid
    if (input.length === 10) {
      const parsed = parseDateFR(input);

      if (parsed) {
        onChange(parsed);
      }
    }
  };

  const handleDatePickerChange = (e) => {
    const newValue = e.target.value;

    onChange(newValue);
    setDisplayValue(formatDateFR(newValue));
  };

  const handleClear = (e) => {
    e.stopPropagation();

    setDisplayValue("");
    onChange("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative inline-flex items-center ${className}`}
    >
      <div
        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-200 shadow-sm ${
          value
            ? "bg-white border-[var(--color-500)] text-[var(--color-700)] font-medium shadow-[var(--color-100)]"
            : "bg-white border-[var(--color-300)] text-gray-600 hover:border-[var(--color-400)] hover:text-gray-900"
        }`}
      >
        <input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()}
          placeholder="JJ/MM/AAAA"
          inputMode="numeric"
          maxLength={10}
          className={`w-[100px] bg-white  outline-none border-none text-sm ${
            value ? "text-[var(--color-700)] font-medium" : "text-gray-600"
          }`}
        />
        <button type="button" onClick={openPicker} className="shrink-0">
          <Calendar
            className={`w-4 h-4 transition-colors ${
              value
                ? "text-[var(--color-600)] font-bold"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </button>
        {!displayValue && (
          <span className="absolute left-[43px] pointer-events-none text-sm text-gray-400"></span>
        )}

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="relative z-10 ml-0.5 p-0.5 rounded-full hover:bg-[var(--color-200)]/60 text-gray-400 hover:text-red-500 transition-colors"
            title="Effacer le filtre de date"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Native date picker */}
        <input
          ref={inputRef}
          type="date"
          value={value || ""}
          onChange={handleDatePickerChange}
          className="absolute left-0 top-0 w-0 h-0 opacity-0 pointer-events-none"
          tabIndex={-1}
        />
      </div>
    </motion.div>
  );
}
