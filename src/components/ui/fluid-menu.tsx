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
      className={`relative w-full h-full flex items-center justify-center rounded-full group cursor-pointer transition-all duration-200 outline-none
        ${disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "text-slate-700 hover:text-insurance-darkblue"}
        ${isActive ? "bg-blue-50 text-insurance-darkblue font-bold shadow-inner" : ""}
        ${className}`}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      title={displayLabel}
      aria-label={displayLabel}
    >
      <span className="flex items-center justify-center w-full h-full">
        {icon && (
          <span className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            {icon}
          </span>
        )}
        {children && !icon && (
          <span className="text-[12px] font-semibold text-center leading-tight">
            {children}
          </span>
        )}
      </span>

      {/* Floating high-contrast label badge for both mobile and desktop readability */}
      {displayLabel && (
        <span 
          onClick={(e) => {
            e.stopPropagation();
            if (onClick && !disabled) onClick(e);
          }}
          className="absolute right-[calc(100%+10px)] sm:right-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 sm:px-3.5 py-1.5 bg-slate-900/95 backdrop-blur-md text-white text-[12px] sm:text-[13px] font-bold rounded-xl shadow-2xl whitespace-nowrap opacity-95 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-2 sm:group-hover:translate-x-0 transition-all duration-200 z-50 border border-slate-700/60 font-sans tracking-wide pointer-events-auto hover:bg-slate-800"
        >
          {displayLabel}
          {/* Tooltip arrow pointing to icon */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900/95" />
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
    // Only auto-expand on hover on larger screens (desktop)
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
        className="relative w-12 h-12 sm:w-14 sm:h-14 select-none z-50" 
        data-expanded={isExpanded}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover area bridge down across the dropdown */}
        {isExpanded && (
          <div 
            className="absolute -left-4 -right-4 top-0 z-30 pointer-events-auto" 
            style={{ height: `${childrenArray.length * 58 + 20}px` }} 
          />
        )}

        {/* Container for trigger & items */}
        <div className="relative">
          {/* First item - Trigger button */}
          <div 
            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-md sm:shadow-lg dark:bg-gray-800 cursor-pointer rounded-full group will-change-transform z-50 flex items-center justify-center text-insurance-darkblue border border-slate-200/90 hover:border-insurance-darkblue/40 transition-all duration-300 hover:shadow-xl active:scale-95"
            onClick={handleToggle}
            role="button"
            aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isExpanded}
          >
            {childrenArray[0]}
          </div>

          {/* Cascading dropdown items */}
          <div className="absolute top-0 left-0 w-12 sm:w-14 pointer-events-none">
            {childrenArray.slice(1).map((child, index) => {
              const childElement = child as React.ReactElement<MenuItemProps>
              
              return (
                <div 
                  key={index} 
                  className={`absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg dark:bg-gray-800 rounded-full flex items-center justify-center border border-slate-200/90 hover:border-insurance-darkblue/40 hover:shadow-2xl transition-all duration-300 ${
                    isExpanded ? 'pointer-events-auto opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-75'
                  }`}
                  style={{
                    transform: `translateY(${isExpanded ? (index + 1) * 56 : 0}px)`,
                    zIndex: 40 - index,
                    transition: `transform ${isExpanded ? '340ms' : '240ms'} cubic-bezier(0.34, 1.56, 0.64, 1) ${isExpanded ? index * 25 : 0}ms, opacity ${isExpanded ? '280ms' : '180ms'} ease-out ${isExpanded ? index * 25 : 0}ms, scale ${isExpanded ? '340ms' : '200ms'} cubic-bezier(0.34, 1.56, 0.64, 1) ${isExpanded ? index * 25 : 0}ms`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {React.isValidElement(childElement)
                    ? React.cloneElement(childElement, {
                        onClick: (e?: React.MouseEvent) => {
                          closeMenu()
                          if (childElement.props.onClick) {
                            childElement.props.onClick(e)
                          }
                        }
                      })
                    : child}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
