"use client";

import React, { Fragment, useMemo, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronIcon, CheckIcon } from "@/public/icons";

type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;

  showSearch?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;

  maxMenuHeight?: number;

  error?: boolean;
  errorMessage?: string;
}

const Dropdown = ({
  options,
  value,
  placeholder = "Select option",
  onChange,
  label,
  required,
  showSearch = false,
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  maxMenuHeight = 260,

  error = false,
  errorMessage = "",
}: DropdownProps) => {
  const selectedOption = options.find((opt) => opt.value === value);

  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!showSearch) return options;
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query, showSearch]);

  const handleSelect = (val: string) => {
    onChange(val);
    setQuery(""); // ✅ reset search after selection
  };

  const resetQuery = () => setQuery("");

  return (
    <div className="w-full">
      {label && (
        <span className="block mb-1 text-sm text-slate-700 font-normal text-start">
          {label} {required && <span className="text-red-500"> *</span>}
        </span>
      )}

      <Menu as="div" className="relative w-full flex">
        <MenuButton
          className={`w-full text-sm sm:text-base p-3 border focus:rin-0  justify-between flex gap-2 items-center rounded-lg outline-none text-slate-900 placeholder:text-slate-400 placeholder:font-normal 
              ${
                error
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:ring-gray-200"
              }
            `}
        >
          <span className={selectedOption ? "text-gray-700" : "text-gray-400"}>
            {selectedOption?.label || placeholder}
          </span>
          <span className="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 13.9995C9.41668 13.9995 8.83335 13.7745 8.39168 13.3329L2.95835 7.89954C2.71668 7.65788 2.71668 7.25788 2.95835 7.01621C3.20002 6.77454 3.60002 6.77454 3.84168 7.01621L9.27502 12.4495C9.67502 12.8495 10.325 12.8495 10.725 12.4495L16.1583 7.01621C16.4 6.77454 16.8 6.77454 17.0417 7.01621C17.2833 7.25788 17.2833 7.65788 17.0417 7.89954L11.6083 13.3329C11.1667 13.7745 10.5833 13.9995 10 13.9995Z"
                fill="black"
              />
            </svg>
          </span>
        </MenuButton>

        <MenuItems
          transition
          className="z-50 absolute mt-10 sm:mt-14 w-full bg-white border border-slate-200 rounded-lg shadow-[0px_14px_34px_rgba(0,0,0,0.1)] p-1 text-sm transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
          // ✅ when menu loses focus (closes), clear search
          onBlur={resetQuery}
          // ✅ Escape clears query too
          onKeyDown={(e) => {
            if (e.key === "Escape") resetQuery();
          }}
        >
          {/* Sticky search */}
          {showSearch && (
            <div className="sticky top-0 bg-white p-1 z-10">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                autoComplete="off"
                className="w-full h-10 rounded-md border border-slate-200 px-3 placeholder:text-slate-400 text-slate-800 text-sm outline-none focus:ring-0 focus:border-slate-300"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Scrollable list */}
          <div
            className="space-y-1 overflow-auto"
            style={{ maxHeight: maxMenuHeight }}
            onWheel={(e) => e.stopPropagation()}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-2.5 py-2 text-xs md:text-sm text-slate-500">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;

                return (
                  <MenuItem key={option.value} as={Fragment}>
                    {({ focus }) => (
                      <button
                        onClick={() => handleSelect(option.value)}
                        className={[
                          "flex w-full items-center font-medium cursor-pointer justify-between gap-2 rounded-md py-1.5 sm:py-3.5 px-4 text-xs md:text-sm text-neutral-800",
                          focus ? "bg-gray-100" : "",
                          isSelected ? "bg-slate-100" : "",
                        ].join(" ")}
                      >
                        <span>{option.label}</span>
                        {isSelected && <CheckIcon />}
                      </button>
                    )}
                  </MenuItem>
                );
              })
            )}
          </div>
        </MenuItems>
      </Menu>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Dropdown;
