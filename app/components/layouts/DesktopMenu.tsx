"use client";
import { menuItems } from "@/app/constants/constants";
import { DownArrow } from "@/public/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CharRollText from "../Animations/CharRollText";

const DesktopMenu = () => {
  const pathname = usePathname();
  const [visibleItemCount, setVisibleItemCount] = useState(menuItems.length);
  const [isMoreMenuHovered, setIsMoreMenuHovered] = useState(false);
  const [isMoreMenuPinned, setIsMoreMenuPinned] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateVisibleItemCount = () => {
      const width = window.innerWidth;

      if (width < 780) {
        setVisibleItemCount(2);
        return;
      }

      if (width < 1280) {
        setVisibleItemCount(3);
        return;
      }

      if (width < 1320) {
        setVisibleItemCount(4);
        return;
      }

      if (width < 1520) {
        setVisibleItemCount(4);
        return;
      }

      setVisibleItemCount(menuItems.length);
    };

    updateVisibleItemCount();
    window.addEventListener("resize", updateVisibleItemCount);

    return () => {
      window.removeEventListener("resize", updateVisibleItemCount);
    };
  }, []);

  const manualMoreItem = useMemo(
    () => menuItems.find((item) => item.label === "More"),
    [],
  );

  const baseItems = useMemo(
    () => menuItems.filter((item) => item.label !== "More"),
    [],
  );

  const visibleItems = useMemo(
    () => baseItems.slice(0, visibleItemCount),
    [baseItems, visibleItemCount],
  );

  const overflowItems = useMemo(() => {
    const hiddenBaseItems = baseItems.slice(visibleItemCount);
    const manualMoreChildren = manualMoreItem?.children ?? [];

    return [...hiddenBaseItems, ...manualMoreChildren].filter(
      (item, index, items) =>
        items.findIndex(
          (candidate) =>
            candidate.href === item.href && candidate.label === item.label,
        ) === index,
    );
  }, [baseItems, manualMoreItem, visibleItemCount]);

  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const isMoreActive = overflowItems.some((item) => isItemActive(item.href));
  const isMoreMenuOpen = isMoreMenuHovered || isMoreMenuPinned;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!moreMenuRef.current?.contains(event.target as Node)) {
        setIsMoreMenuPinned(false);
        setIsMoreMenuHovered(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMoreMenuPinned(false);
        setIsMoreMenuHovered(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMoreMenuPinned(false);
    setIsMoreMenuHovered(false);
  }, [pathname]);

  return (
    <nav className="flex flex-row items-center gap-6">
      {visibleItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive =
          isItemActive(item.href) ||
          item.children?.some((child) => isItemActive(child.href));
        return (
          <div
            key={item.label}
            className={`relative group px-4 py-3 rounded-full ${
              isActive ? "bg-black/20" : "hover:bg-black/20"
            }`}
          >
            <Link
              href={item.href}
              className={`text-lg flex flex-row items-center gap-2 ${
                isActive ? "text-white" : "text-white/70 group-hover:text-white"
              }`}
            >
              <CharRollText text={item.label} />
              {/* {item.label} */}
              {hasChildren && <DownArrow />}
            </Link>

            {hasChildren && (
              <div className="absolute left-0 top-full hidden rounded-lg  px-1 py-2 md:min-w-48 flex-col bg-white shadow-lg group-hover:flex">
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="px-4 py-2 text-base rounded-lg text-black hover:bg-gray-100"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {overflowItems.length > 0 && (
        <div
          ref={moreMenuRef}
          onMouseEnter={() => setIsMoreMenuHovered(true)}
          onMouseLeave={() => setIsMoreMenuHovered(false)}
          className={`relative px-4 py-3 rounded-full ${
            isMoreActive || isMoreMenuOpen ? "bg-black/20" : "hover:bg-black/20"
          }`}
        >
          <div
            aria-haspopup="menu"
            aria-expanded={isMoreMenuOpen}
            onClick={() => setIsMoreMenuPinned((prev) => !prev)}
            className={`text-lg flex flex-row items-center gap-2 cursor-pointer ${
              isMoreActive || isMoreMenuOpen
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            <CharRollText text="More" />
            <DownArrow />
          </div>

          <div
            className={`absolute right-0 top-full rounded-lg px-1  lg:py-2 min-w-40 lg:min-w-48 flex-col bg-white shadow-lg ${
              isMoreMenuOpen ? "flex" : "hidden"
            }`}
          >
            {overflowItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={() => {
                  setIsMoreMenuPinned(false);
                  setIsMoreMenuHovered(false);
                }}
                className="px-4 py-2 text-base rounded-lg text-black hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default DesktopMenu;
