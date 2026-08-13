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
  const [isMobile, setIsMobile] = useState(false)

  const activeTab = controlledActive || internalActive

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "z-50",
        className,
      )}
    >
      <LayoutGroup>
        <div className="flex items-center gap-4 bg-white/80 border border-slate-200/80 backdrop-blur-lg py-1.5 px-1.5 rounded-full shadow-premium">
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
                  "relative cursor-pointer text-[16px] font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2",
                  "w-[135px] xl:w-[150px]",
                  "text-slate-600 hover:text-insurance-darkblue",
                  isActive && "text-insurance-darkblue",
                )}
              >
                <Icon size={20} strokeWidth={2.3} className="relative z-10" />
                <span className="relative z-10 hidden md:inline">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="tubelight-lamp"
                    className="absolute inset-0 w-full bg-slate-100 rounded-full z-0"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-insurance-darkblue rounded-t-full z-10">
                      <div className="absolute w-12 h-6 bg-insurance-darkblue/10 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-insurance-darkblue/5 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-insurance-darkblue/5 rounded-full blur-sm top-0 left-2" />
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
