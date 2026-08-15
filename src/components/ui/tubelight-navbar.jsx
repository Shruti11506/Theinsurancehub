"use client"

import React, { useEffect, useState } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Tubelight Navbar - Adapted from shadcn/ui component for Vite + React (non-Next.js).
 * 
 * Props:
 *   items: Array of { name: string, url: string, icon: LucideIcon, onClick?: () => void }
 *   className?: string
 *   activeTab?: string  (controlled active tab from parent)
 *   onTabChange?: (name: string) => void
 */
export function NavBar({ items, className, activeTab: controlledActive, onTabChange }) {
  const [internalActive, setInternalActive] = useState(items[0]?.name)

  const activeTab = controlledActive || internalActive

  return (
    <div
      className={cn(
        "z-50 select-none",
        className,
      )}
    >
      <LayoutGroup>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 bg-white/95 border border-slate-200/90 backdrop-blur-xl py-1 px-1 sm:py-1.5 sm:px-2 rounded-full shadow-xs">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  setInternalActive(item.name)
                  if (onTabChange) onTabChange(item.name)
                  if (item.onClick) item.onClick()
                }}
                className={cn(
                  "relative cursor-pointer text-xs sm:text-sm md:text-[15px] font-bold py-1.5 px-2.5 sm:py-2 sm:px-4 lg:px-6 rounded-full transition-colors flex items-center justify-center gap-1.5 sm:gap-2",
                  "text-slate-600 hover:text-insurance-darkblue",
                  isActive && "text-insurance-darkblue font-extrabold",
                )}
              >
                <Icon size={15} strokeWidth={2.3} className="relative z-10 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                <span className="relative z-10 inline whitespace-nowrap">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="tubelight-lamp"
                    className="absolute inset-0 w-full bg-slate-100/90 rounded-full z-0 shadow-inner"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 32,
                    }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 bg-insurance-darkblue rounded-t-full z-10">
                      <div className="absolute w-8 sm:w-12 h-4 sm:h-6 bg-insurance-darkblue/20 rounded-full blur-md -top-2 -left-1 sm:-left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </div>
      </LayoutGroup>
    </div>
  )
}
