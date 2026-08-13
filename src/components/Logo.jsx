import React from 'react';
import logoImg from '../assets/logo.jpg';

export default function Logo({ className = "h-14", dark = false, id, ...props }) {
  return (
    <div id={id} className={`flex items-center select-none ${className}`} {...props}>
      <img 
        src={logoImg} 
        alt="The Insurance Hub" 
        className="h-full w-auto object-contain rounded-lg"
      />
    </div>
  );
}

