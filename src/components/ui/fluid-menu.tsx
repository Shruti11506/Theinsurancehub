"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface MenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  showChevron?: boolean
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  className?: string
  label?: string
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, className = "", label }: MenuItemProps) {
  const displayLabel = label || (typeof children === "string" ? children : undefined)

  return (
    <button
      type="button"
      className={`relative w-full flex flex-col items-center justify-center p-1.5 rounded-xl group cursor-pointer transition-all duration-200 outline-none select-none text-center
        ${disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "text-slate-700 hover:text-insurance-darkblue hover:bg-slate-100/90 active:bg-slate-200/90"}
        ${isActive ? "bg-blue-50 text-insurance-darkblue font-bold shadow-inner" : ""}
        ${className}`}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      title={displayLabel}
      aria-label={displayLabel}
    >
      {icon && (
        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0 shadow-xs">
          {icon}
        </span>
      )}
      {displayLabel && (
        <span className="text-[9.5px] sm:text-[10px] font-extrabold leading-none tracking-tight text-slate-700 group-hover:text-insurance-darkblue mt-1 max-w-[56px] truncate">
          {displayLabel}
        </span>
      )}
      {children && !icon && !displayLabel && (
        <span className="text-[11px] font-semibold leading-tight truncate">
          {children}
        </span>
      )}
    </button>
  )
}

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const childrenArray = React.Children.toArray(children)

  const handleMouseEnter = () => {
    // Auto-expand on hover on desktop
    if (window.innerWidth >= 1024) {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current)
        leaveTimerRef.current = null
      }
      setIsExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current)
      }
      leaveTimerRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 250)
    }
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded((prev) => !prev)
  }

  const closeMenu = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setIsExpanded(false)
  }

  // Auto-close / retract menu upwards when user scrolls the page
  useEffect(() => {
    if (!isExpanded) return

    const handleScroll = () => {
      closeMenu()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isExpanded])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
      }
    }
    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isExpanded])

  return (
    <>
      {/* Transparent overlay to dismiss menu on tap-outside without any background blur or darkening */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div 
        ref={menuRef}
        className="relative select-none z-50" 
        data-expanded={isExpanded}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Trigger button */}
        <div 
          className="relative w-11 h-11 sm:w-14 sm:h-14 bg-white shadow-md sm:shadow-lg dark:bg-gray-800 cursor-pointer rounded-full group will-change-transform z-50 flex items-center justify-center text-insurance-darkblue border border-slate-200/90 hover:border-insurance-darkblue/40 transition-all duration-300 hover:shadow-xl active:scale-95"
          onClick={handleToggle}
          role="button"
          aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isExpanded}
        >
          {childrenArray[0]}
        </div>

        {/* Ultra-compact 3-Column Dropdown Card: Names below each icon, zero obstruction of central content */}
        <div 
          className={`absolute right-0 top-[calc(100%+8px)] w-[195px] sm:w-[215px] bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-2xl p-1.5 z-50 origin-top-right transition-all duration-200 ease-out ${
            isExpanded 
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 scale-90 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="grid grid-cols-3 gap-1">
            {childrenArray.slice(1).map((child, index) => {
              const childElement = child as React.ReactElement<MenuItemProps>
              
              return React.isValidElement(childElement)
                ? React.cloneElement(childElement, {
                    key: index,
                    onClick: (e?: React.MouseEvent) => {
                      closeMenu()
                      if (childElement.props.onClick) {
                        childElement.props.onClick(e)
                      }
                    }
                  })
                : child
            })}
          </div>
        </div>
      </div>
    </>
  )
}
