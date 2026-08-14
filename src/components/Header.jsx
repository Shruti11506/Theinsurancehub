import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Home, Users, HelpCircle, PhoneCall, Briefcase, Phone, Menu as MenuIcon, X, MessageSquare } from 'lucide-react';
import { MenuContainer, MenuItem } from '@/components/ui/fluid-menu';

// WhatsApp SVG icon component
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Instagram official brand logo (filled)
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// Google Maps-style location pin (filled)
const LocationPinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5C3.5 14.88 12 24 12 24S20.5 14.88 20.5 8.5C20.5 3.81 16.69 0 12 0ZM12 11.5C10.34 11.5 9 10.16 9 8.5C9 6.84 10.34 5.5 12 5.5C13.66 5.5 15 6.84 15 8.5C15 10.16 13.66 11.5 12 11.5Z" />
  </svg>
);

export default function Header({ onNavigate, currentPage, activeTab = 'Home', onTabChange, introPhase = 'done', logoOffset = null }) {
  const navItems = [
    { name: 'Home', url: '#', icon: Home, onClick: () => { onTabChange && onTabChange('Home'); onNavigate && onNavigate('home'); } },
    { name: 'Services', url: '#', icon: Briefcase, onClick: () => { onTabChange && onTabChange('Services'); onNavigate && onNavigate('home', 'services'); } },
    { name: 'About Us', url: '#', icon: Users, onClick: () => { onTabChange && onTabChange('About Us'); onNavigate && onNavigate('about'); } },
    { name: 'Contact Us', url: '#', icon: PhoneCall, onClick: () => { onTabChange && onTabChange('Contact Us'); onNavigate && onNavigate('home', 'contact'); } },
  ];

  return (
    <header
      className="sticky top-0 z-[100] w-full backdrop-blur-md border-b shadow-xs"
      style={{
        backgroundColor: introPhase === 'center' ? 'transparent' : 'rgba(255,255,255,0.95)',
        borderColor: introPhase === 'center' ? 'transparent' : 'rgba(226,232,240,0.8)',
        boxShadow: introPhase === 'center' ? 'none' : undefined,
        transition: introPhase === 'move' ? 'background-color 1.35s cubic-bezier(0.22,1,0.36,1), border-color 1.35s cubic-bezier(0.22,1,0.36,1), box-shadow 1.35s cubic-bezier(0.22,1,0.36,1)' : 'none',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-20 sm:h-24 lg:h-28 flex items-center justify-between relative">
        
        {/* Left Side: Logo & Main Navigation */}
        <div className="flex items-center justify-start gap-4 sm:gap-12 xl:gap-40">
          <a 
            id="header-logo-link"
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              if (onTabChange) onTabChange('Home');
              if (onNavigate) onNavigate('home');
            }}
            className="hover:opacity-95 transition-opacity flex-shrink-0 relative z-50"
          >
            <motion.div
              id="header-logo-wrapper"
              initial={false}
              animate={
                introPhase === 'center' && logoOffset
                  ? { x: logoOffset.x, y: logoOffset.y, scale: 1.12, opacity: 1 }
                  : { x: 0, y: 0, scale: 1, opacity: 1 }
              }
              transition={{
                duration: introPhase === 'move' ? 1.35 : 0,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ willChange: 'transform' }}
            >
              <Logo id="header-logo" className="h-12 sm:h-14 lg:h-16" />
            </motion.div>
          </a>
          
          {/* Main Navigation - Tubelight NavBar (Desktop) */}
          <motion.div
            initial={false}
            animate={{ opacity: introPhase === 'center' ? 0 : 1 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block scale-90 origin-left relative z-20"
          >
            <NavBar 
              items={navItems}
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
          </motion.div>
        </div>
          
        {/* Right Side: Social Icons & Dropdown Menu */}
        <motion.div
          initial={false}
          animate={{ opacity: introPhase === 'center' ? 0 : 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-end gap-2.5 sm:gap-6 relative z-20"
        >
          {/* Mobile Quick Call Button */}
          <a 
            href="tel:+919423924568" 
            className="sm:hidden p-2.5 rounded-full bg-blue-50 text-insurance-darkblue hover:bg-blue-100 transition-all shadow-sm border border-blue-100 active:scale-95"
            title="Call Us"
            aria-label="Call Us Directly"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* Mobile Quick WhatsApp Action */}
          <a 
            href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="sm:hidden p-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all shadow-sm border border-emerald-100/60 active:scale-95"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          {/* Social Direct Links (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-3 md:gap-5">
            <a 
              href="https://wa.me/message/WXX5A5BNS2LBL1?src=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-110 transition-all duration-300 shadow-md border border-emerald-100/50"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6 lg:h-7 lg:w-7" />
            </a>
            <a 
              href="https://www.instagram.com/theinsurancehub__?utm_source=qr&igsh=bGJzOGM2M3JmaTF1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 hover:scale-110 transition-all duration-300 shadow-md border border-pink-100/50"
              title="Follow on Instagram"
              aria-label="Follow on Instagram"
            >
              <InstagramIcon className="h-6 w-6 lg:h-7 lg:w-7" />
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=The+Insurance+Hub,+Shop+no.+57,+Sanman+Prestige,+Beside+Zilla+Parishad,+Railway+Station+Road,+Nanded+431601" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-300 shadow-md border border-blue-100/50"
              title="Get Directions on Google Maps"
              aria-label="Get Directions on Google Maps"
            >
              <LocationPinIcon className="h-6 w-6 lg:h-7 lg:w-7" />
            </a>
            <a 
              href="https://www.linkedin.com/company/the-insurance-hub001/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 hover:scale-110 transition-all duration-300 shadow-md border border-sky-100/50"
              title="Follow on LinkedIn"
              aria-label="Follow on LinkedIn"
            >
              <svg className="h-6 w-6 lg:h-7 lg:w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Universal Dropdown & Action Sheet Menu (Mobile & Desktop) */}
          <div className="relative flex items-center">
            <MenuContainer>
              <MenuItem
                className="text-blue-600 hover:text-blue-800"
                icon={<Home size={19} strokeWidth={2.2} />}
                onClick={() => {
                  if (onTabChange) onTabChange('Home');
                  if (onNavigate) onNavigate('home');
                }}
                label="Home"
              />
              <MenuItem
                className="text-emerald-600 hover:text-emerald-800"
                icon={<Briefcase size={19} strokeWidth={2.2} />}
                onClick={() => {
                  if (onTabChange) onTabChange('Services');
                  if (onNavigate) onNavigate('home', 'services');
                }}
                label="Services"
              />
              <MenuItem 
                className="text-amber-500 hover:text-amber-700" 
                icon={<Users size={19} strokeWidth={2.2} />}
                onClick={() => {
                  if (onTabChange) onTabChange('About Us');
                  if (onNavigate) onNavigate('about');
                }}
                label="About Us"
              />
              <MenuItem
                className="text-indigo-600 hover:text-indigo-800"
                icon={<PhoneCall size={19} strokeWidth={2.2} />}
                onClick={() => {
                  if (onTabChange) onTabChange('Contact Us');
                  if (onNavigate) onNavigate('home', 'contact');
                }}
                label="Contact Us"
              />
              <MenuItem 
                className="text-violet-600 hover:text-violet-800" 
                icon={<MessageSquare size={19} strokeWidth={2.2} />}
                onClick={() => {
                  if (onTabChange) onTabChange('Feedbacks');
                  if (onNavigate) onNavigate('home', 'testimonials');
                }}
                label="Feedbacks"
              />
              <MenuItem 
                className="text-sky-600 hover:text-sky-800" 
                icon={<HelpCircle size={19} strokeWidth={2.2} />}
                onClick={() => {
                  if (onTabChange) onTabChange('FAQs');
                  if (onNavigate) onNavigate('home', 'faqs');
                }}
                label="FAQs"
              />
            </MenuContainer>
          </div>

        </motion.div>

      </div>

    </header>
  );
}
