import React, { useState, useEffect } from 'react';
import { Briefcase, Trophy, Users, Building } from 'lucide-react';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);
  
  const options = [
    {
      title: "Executive Cabin",
      description: "Modern professional setup",
      image: "/hub_real_desk.jpg",
      icon: <Briefcase size={24} className="text-white" />
    },
    {
      title: "Wall of Fame",
      description: "Celebrating milestones and trust",
      image: "/hub_real_wall.jpg",
      icon: <Trophy size={24} className="text-white" />
    },
    {
      title: "Client Desk",
      description: "Comfortable discussion area",
      image: "/hub_real_meeting.jpg",
      icon: <Users size={24} className="text-white" />
    },
    {
      title: "Grand Entrance",
      description: "Welcoming clients with warmth",
      image: "/hub_real_entrance.jpg",
      icon: <Building size={24} className="text-white" />
    }
  ];

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full font-sans"> 
      
      {/* Options Container */}
      <div className="flex w-full max-w-[1000px] min-w-[300px] sm:min-w-[600px] h-[350px] sm:h-[450px] mx-auto px-4 items-stretch overflow-hidden relative rounded-2xl">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '60px',
              minHeight: '100px',
              margin: '0 4px',
              borderRadius: '24px',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? '#f28b24' : '#e2e8f0', // Using insurance-orange
              cursor: 'pointer',
              backgroundColor: '#18181b',
              boxShadow: activeIndex === index 
                ? '0 20px 40px rgba(0,0,0,0.2)' 
                : '0 4px 10px rgba(0,0,0,0.05)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div 
              className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '140px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                opacity: activeIndex === index ? 1 : 0.5
              }}
            ></div>
            
            {/* Label with icon and info */}
            <div className="absolute left-0 right-0 bottom-5 flex items-center justify-start h-14 z-2 pointer-events-none px-4 gap-3 w-full">
              <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-insurance-darkblue/90 backdrop-blur-md shadow-lg border-2 border-white/20 flex-shrink-0 flex-grow-0 transition-all duration-200">
                {option.icon}
              </div>
              <div className="text-white whitespace-pre relative overflow-hidden">
                <div 
                  className="font-bold text-lg sm:text-xl transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="text-sm sm:text-base text-gray-200 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                    transitionDelay: '0.1s'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom animations block instead of styled-jsx */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </div>
  );
};

export default InteractiveSelector;
