"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import CharRollText from "../Animations/CharRollText";

export interface MenuItem {
  label: string;
  href: string;
}

interface HeaderMenuNavItemsProps {
  items: MenuItem[];
}

function HeaderMenuNavItems({ items }: HeaderMenuNavItemsProps) {
  const pathname = usePathname();

  return (
    <ul className="flex-row items-center justify-center grow hidden gap-3 sm:gap-8 rtl:flex-row-reverse md:flex ">
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link text-white hover:text-[#00A4CE] cursor-pointer w-fit overflow-hidden  whitespace-nowrap text-base ${
                isActive ? " font-bold" : " font-medium"
              }`}
            >
              <CharRollText text={item.label} className="" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderMenuNavItems;
