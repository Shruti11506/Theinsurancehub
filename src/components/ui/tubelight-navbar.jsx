"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, LayoutGroup, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

/**
 * Tubelight Navbar - Adapted from shadcn/ui component for Vite + React (non-Next.js).
 * 
 * Props:
 *   items: Array of { name: string, url: string, icon: LucideIcon, onClick?: () => void, subItems?: Array<{ name: string, url: string, onClick?: () => void }> }
 *   className?: string
 *   activeTab?: string  (controlled active tab from parent)
 *   onTabChange?: (name: string) => void
 */
export function NavBar({ items, className, activeTab: controlledActive, onTabChange, layoutIdPrefix = "tubelight" }) {
  const [internalActive, setInternalActive] = useState(items[0]?.name)
  const [hoveredItem, setHoveredItem] = useState(null)
  const hoverTimeoutRef = useRef(null)

  const activeTab = controlledActive || internalActive

  const handleMouseEnter = (itemName) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredItem(itemName)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 180)
  }

  return (
    <div
      className={cn(
        "z-50 select-none",
        className,
      )}
    >
      <LayoutGroup id={layoutIdPrefix}>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 bg-white/95 border border-slate-200/90 backdrop-blur-xl py-1 px-1 sm:py-1.5 sm:px-2 rounded-full shadow-xs">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const hasSubItems = Boolean(item.subItems && item.subItems.length > 0)
            const isDropdownOpen = hoveredItem === item.name

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => hasSubItems && handleMouseEnter(item.name)}
                onMouseLeave={() => hasSubItems && handleMouseLeave()}
              >
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault()
                    setInternalActive(item.name)
                    if (onTabChange) onTabChange(item.name)
                    if (item.onClick) item.onClick()
                  }}
                  className={cn(
                    "relative cursor-pointer text-[11px] sm:text-sm md:text-[14.5px] font-bold py-1 px-2 sm:py-2 sm:px-3.5 lg:px-5 rounded-full transition-colors flex items-center justify-center gap-1 sm:gap-1.5",
                    "text-slate-600 hover:text-insurance-darkblue",
                    isActive && "text-insurance-darkblue font-extrabold",
                  )}
                >
                  <Icon size={14} strokeWidth={2.3} className="relative z-10 sm:w-[17px] sm:h-[17px] flex-shrink-0" />
                  <span className="relative z-10 inline whitespace-nowrap">{item.name}</span>
                  {hasSubItems && (
                    <ChevronDown size={12} className={cn("relative z-10 transition-transform duration-200 text-slate-400 group-hover:text-insurance-darkblue", isDropdownOpen && "rotate-180 text-insurance-darkblue")} />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId={`${layoutIdPrefix}-lamp`}
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

                {/* Dropdown Menu for Sub-Items */}
                <AnimatePresence>
                  {hasSubItems && isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl py-2 px-1.5 min-w-[200px] z-50 flex flex-col gap-1"
                    >
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.url}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setHoveredItem(null)
                            if (sub.onClick) sub.onClick()
                          }}
                          className="px-3.5 py-2 rounded-xl text-[13px] font-bold text-slate-700 hover:text-insurance-darkblue hover:bg-slate-100/90 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <span className="font-sans">{sub.name}</span>
                          <ChevronRight size={13} className="text-slate-400 group-hover:text-insurance-darkblue group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </LayoutGroup>
    </div>
  )
}
