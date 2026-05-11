import { menuItems } from '@/app/constants/constants';
import { DownArrow } from '@/public/icons';
import Link from 'next/link';
import React from 'react'

const DesktopMenu = () => {
  return (
    <nav className="flex flex-row items-center gap-6">
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-lg text-white flex flex-row items-center gap-2"
                >
                  {item.label}
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
        </nav>
  )
}

export default DesktopMenu
