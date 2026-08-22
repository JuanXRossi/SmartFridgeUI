"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { UrgencyResponse } from "@/app/types/urgencies/object";

const DROPDOWN_ANIMATION_MS = 180;

const styles = {
  wrapper: "relative",

  trigger: [
    "w-full flex items-center justify-between",
    "px-4 py-2.5 rounded-xl text-sm text-left text-[#334E5E]",
    "border bg-[#F7FCFE]",
    "focus:outline-none focus:ring-2 focus:ring-[#8EC9E8]",
    "transition-all duration-150 cursor-pointer",
  ].join(" "),

  triggerNormal: "border-[#C8E8F5]",
  triggerError: "border-rose-500",

  chevron: "text-[#8AABB8] transition-transform duration-200",
  chevronOpen: "rotate-180",

  overlay: "fixed inset-0 z-40",

  panel: [
    "absolute left-0 right-0 top-[calc(100%+6px)] z-50",
    "bg-white rounded-xl shadow-xl border border-[#C8E8F5]",
    "overflow-hidden origin-top",
  ].join(" "),

  panelEnter: "animate-dropdown-enter",
  panelLeave: "animate-dropdown-leave",

  option: [
    "flex items-center gap-2 px-4 py-2.5 text-sm text-[#334E5E]",
    "hover:bg-[#EAF4FB] transition-colors cursor-pointer w-full text-left",
  ].join(" "),

  optionActive: "bg-[#EAF4FB]",
  dot: "w-2 h-2 rounded-full bg-[#8AABB8]",
};

interface UrgencyDropdownProps {
  id?: string;
  name: string;
  value: number;
  options: UrgencyResponse[];
  onChange: (value: number) => void;
  onBlur?: () => void;
  hasError?: boolean;
}

export default function UrgencyDropdown({
  id,
  name,
  value,
  options,
  onChange,
  onBlur,
  hasError,
}: UrgencyDropdownProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selected = options.find((o) => o.id === value);  
  
  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsVisible(true);
    requestAnimationFrame(() => setMenuOpen(true));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    closeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      onBlur?.();
    }, DROPDOWN_ANIMATION_MS);
  };

  const toggleMenu = () => (isVisible ? closeMenu() : openMenu());

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isVisible]);

  const handleSelect = (option: UrgencyResponse) => {
    onChange(option.id);
    closeMenu();
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        id={id}
        name={name}
        className={`${styles.trigger} ${hasError ? styles.triggerError : styles.triggerNormal}`}
        onClick={toggleMenu}
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
      >
        <span className="flex items-center gap-2">
          <span className={styles.dot} />
          {selected?.name ?? "Seleccionar urgencia"}
        </span>
        <ChevronDown size={14} className={`${styles.chevron} ${menuOpen ? styles.chevronOpen : ""}`} />
      </button>

      {isVisible && (
        <>
          <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />
          <div
            role="listbox"
            className={`${styles.panel} ${menuOpen ? styles.panelEnter : styles.panelLeave}`}
          >
            {options.map((option) => (
              <button
                type="button"
                key={option.id}
                role="option"
                aria-selected={option.id === value}
                className={`${styles.option} ${option.id === value ? styles.optionActive : ""}`}
                onClick={() => handleSelect(option)}
              >
                <span className={styles.dot} />
                {option.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
