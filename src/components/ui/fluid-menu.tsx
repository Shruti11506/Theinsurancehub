"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronRight, X, Phone, Menu as MenuIcon } from "lucide-react"

// WhatsApp SVG icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  className?: string
  label?: string
  isDesktopView?: boolean
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, className = "", label, isDesktopView = false }: MenuItemProps) {
  const displayLabel = label || (typeof children === "string" ? children : undefined)

  if (isDesktopView) {
    // Solid desktop/laptop vertical dropdown item
    return (
      <button
        type="button"
        className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl group cursor-pointer transition-all duration-150 outline-none select-none text-left hover:bg-slate-100 active:scale-[0.98]
          ${disabled ? "text-gray-400 cursor-not-allowed" : "text-slate-700 hover:text-insurance-darkblue"}
          ${isActive ? "bg-blue-50 text-insurance-darkblue font-bold shadow-xs" : ""}
          ${className}`}
        role="menuitem"
        onClick={onClick}
        disabled={disabled}
        title={displayLabel}
        aria-label={displayLabel}
      >
        {icon && (
          <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-150 flex-shrink-0">
            {icon}
          </span>
        )}
        {displayLabel && (
          <span className="text-[13.5px] font-bold leading-tight tracking-tight text-slate-800 group-hover:text-insurance-darkblue flex-1 truncate font-sans">
            {displayLabel}
          </span>
        )}
        {children && !icon && !displayLabel && (
          <span className="text-[13.5px] font-bold leading-tight truncate flex-1">
            {children}
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-insurance-darkblue ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
      </button>
    )
  }

  // Mobile bottom action sheet tile
  return (
    <button
      type="button"
      className={`relative w-full flex flex-col items-center justify-center p-3 rounded-2xl group cursor-pointer transition-all duration-150 outline-none select-none text-center bg-slate-50 hover:bg-blue-50/80 active:scale-95 border border-slate-100
        ${disabled ? "text-gray-400 cursor-not-allowed" : "text-slate-700 hover:text-insurance-darkblue"}
        ${isActive ? "bg-blue-50 text-insurance-darkblue font-bold shadow-inner" : ""}
        ${className}`}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      title={displayLabel}
      aria-label={displayLabel}
    >
      {icon && (
        <span className="w-10 h-10 rounded-xl bg-white group-hover:bg-blue-100 flex items-center justify-center transition-transform duration-150 group-hover:scale-105 flex-shrink-0 shadow-xs mb-1.5 border border-slate-100/60">
          {icon}
        </span>
      )}
      {displayLabel && (
        <span className="text-[12.5px] font-bold leading-tight tracking-tight text-slate-800 group-hover:text-insurance-darkblue truncate font-sans">
          {displayLabel}
        </span>
      )}
      {children && !icon && !displayLabel && (
        <span className="text-[12px] font-semibold leading-tight truncate">
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
    // Auto-expand on hover on desktop only
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

  // Auto-close menu when user scrolls the page
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
      {/* ── 1. Mobile Bottom Action Sheet ── */}
      {isExpanded && (
        <div 
          className="md:hidden fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-[1px] transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Bottom Sheet Drawer */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[110] bg-white rounded-t-[32px] border-t border-slate-200 shadow-2xl p-5 pb-8 transition-transform duration-300 ease-out max-w-lg mx-auto ${
          isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

        {/* Company Title Only & Close Button */}
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-[18px] font-black tracking-tight text-insurance-darkblue font-sans">
            The Insurance Hub
          </p>
          <button 
            onClick={closeMenu}
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors active:scale-95"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* 6 Grid items for Mobile */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {childrenArray.map((child, index) => {
            const childElement = child as React.ReactElement<MenuItemProps>
            
            return React.isValidElement(childElement)
              ? React.cloneElement(childElement, {
                  key: index,
                  isDesktopView: false,
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

        {/* Direct Connect Quick Action Bar */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
          <a
            href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-[13px] border border-emerald-100 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Us
          </a>
          <a
            href="tel:+919423924568"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 text-insurance-darkblue font-bold text-[13px] border border-blue-100 active:scale-95"
          >
            <Phone className="h-4 w-4" />
            Call Directly
          </a>
        </div>
      </div>


      {/* ── 2. Desktop Dropdown Menu ── */}
      <div 
        ref={menuRef}
        className="relative select-none z-50" 
        data-expanded={isExpanded}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Crisp Razor-Sharp Circular Trigger Button */}
        <button 
          type="button"
          className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-blue-50/80 hover:bg-blue-100/80 cursor-pointer rounded-full z-50 flex items-center justify-center text-insurance-darkblue border border-blue-100 transition-all duration-150 hover:shadow-sm active:scale-95 flex-shrink-0 outline-none"
          onClick={handleToggle}
          aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" strokeWidth={2.4} />
          ) : (
            <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-insurance-darkblue" strokeWidth={2.4} />
          )}
        </button>

        {/* 100% Solid White Desktop Dropdown Menu */}
        <div 
          className={`hidden md:block absolute right-0 top-[calc(100%+10px)] w-56 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-200 rounded-2xl p-2 z-50 origin-top-right transition-all duration-150 ease-out space-y-1 ${
            isExpanded 
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
        >
          {childrenArray.map((child, index) => {
            const childElement = child as React.ReactElement<MenuItemProps>
            
            return React.isValidElement(childElement)
              ? React.cloneElement(childElement, {
                  key: index,
                  isDesktopView: true,
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
    </>
  )
}
