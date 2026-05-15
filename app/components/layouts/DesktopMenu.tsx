"use client";
import { menuItems } from "@/app/constants/constants";
import { DownArrow } from "@/public/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import CharRollText from "../Animations/CharRollText";

const DesktopMenu = () => {
  const pathname = usePathname();
  const [visibleItemCount, setVisibleItemCount] = useState(menuItems.length);

  useEffect(() => {
    const updateVisibleItemCount = () => {
      const width = window.innerWidth;

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
              <div className="absolute left-0 top-full hidden rounded-lg  px-1 py-2 min-w-48 flex-col bg-white shadow-lg group-hover:flex">
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
          className={`relative group px-4 py-3 rounded-full ${
            isMoreActive ? "bg-black/20" : "hover:bg-black/20"
          }`}
        >
          <div
            className={`text-lg flex flex-row items-center gap-2 cursor-pointer ${
              isMoreActive
                ? "text-white"
                : "text-white/70 group-hover:text-white"
            }`}
          >
            <CharRollText text="More" />
            <DownArrow />
          </div>

          <div className="absolute left-0 top-full hidden rounded-lg px-1 py-2 min-w-48 flex-col bg-white shadow-lg group-hover:flex">
            {overflowItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
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
