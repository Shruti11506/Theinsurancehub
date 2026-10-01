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
export function NavBar({ items, className, activeTab: controlledActive, onTabChange, layoutIdPrefix = "tubelight", isMobile = false }) {
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

  const toggleDropdown = (itemName) => {
    setHoveredItem((prev) => (prev === itemName ? null : itemName))
  }

  return (
    <div
      className={cn(
        "z-50 select-none",
        isMobile ? "w-full max-w-[440px] mx-auto" : "",
        className,
      )}
    >
      <LayoutGroup id={layoutIdPrefix}>
        <div
          className={cn(
            "bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-xs",
            isMobile
              ? "flex items-center justify-between w-full py-0.5 px-0.5 xs:px-1 rounded-full gap-0.5"
              : "flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 py-1.5 px-2 rounded-full"
          )}
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const hasSubItems = Boolean(item.subItems && item.subItems.length > 0)
            const isDropdownOpen = hoveredItem === item.name
            const label = isMobile ? (item.shortName || item.name) : item.name

            return (
              <div
                key={item.name}
                className={cn("relative", isMobile && "flex-1 text-center min-w-0")}
                onMouseEnter={() => !isMobile && hasSubItems && handleMouseEnter(item.name)}
                onMouseLeave={() => !isMobile && hasSubItems && handleMouseLeave()}
              >
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault()
                    setInternalActive(item.name)
                    if (onTabChange) onTabChange(item.name)
                    if (item.onClick) item.onClick()
                    if (isMobile && hasSubItems && isDropdownOpen) {
                      setHoveredItem(null)
                    }
                  }}
                  className={cn(
                    "relative cursor-pointer font-bold rounded-full transition-colors flex items-center justify-center",
                    isMobile
                      ? "text-[10px] xs:text-[11px] py-1 px-1 xs:px-1.5 gap-0.5 xs:gap-1 w-full"
                      : "text-[13px] lg:text-[14.5px] py-1.5 px-3 lg:px-4 gap-1.5",
                    "text-slate-600 hover:text-insurance-darkblue",
                    isActive && "text-insurance-darkblue font-extrabold",
                  )}
                >
                  <Icon
                    size={isMobile ? 12 : 16}
                    strokeWidth={2.3}
                    className="relative z-10 flex-shrink-0"
                  />
                  <span className="relative z-10 inline whitespace-nowrap truncate">{label}</span>
                  {hasSubItems && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleDropdown(item.name)
                      }}
                      className="p-0.5 rounded-full hover:bg-slate-200/50 inline-flex items-center justify-center"
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown
                        size={isMobile ? 10 : 12}
                        className={cn(
                          "relative z-10 transition-transform duration-200 text-slate-400 group-hover:text-insurance-darkblue",
                          isDropdownOpen && "rotate-180 text-insurance-darkblue"
                        )}
                      />
                    </button>
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
                      <div
                        className={cn(
                          "absolute -top-1 left-1/2 -translate-x-1/2 bg-insurance-darkblue rounded-t-full z-10",
                          isMobile ? "w-5 h-0.5" : "w-7 h-1"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute bg-insurance-darkblue/20 rounded-full blur-md -top-2",
                            isMobile ? "w-6 h-3 -left-0.5" : "w-10 h-5 -left-1.5"
                          )}
                        />
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
                      className={cn(
                        "absolute top-[calc(100%+8px)] bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-xl py-2 px-1.5 z-50 flex flex-col gap-1",
                        isMobile ? "left-1/2 -translate-x-1/2 min-w-[170px]" : "left-1/2 -translate-x-1/2 min-w-[200px]"
                      )}
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
                          className="px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold text-slate-700 hover:text-insurance-darkblue hover:bg-slate-100/90 transition-all flex items-center justify-between group cursor-pointer text-left"
                        >
                          <span className="font-sans">{sub.name}</span>
                          <ChevronRight size={12} className="text-slate-400 group-hover:text-insurance-darkblue group-hover:translate-x-0.5 transition-transform" />
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
