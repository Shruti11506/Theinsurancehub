import React from 'react';

export const ImageAutoSlider = () => {
  // Client-provided office photos
    const images = [
      "/hub_real_desk.jpg",
      "/hub_real_wall.jpg",
      "/hub_real_meeting.jpg",
      "/hub_real_entrance.jpg",
      "/hub_map_wall.jpg",
      "/hub_office_cabin.jpg",
      "/hub_art_wall.jpg",
      "/hub_cards.jpg"
    ];

  // Duplicate for seamless infinite loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hub-infinite-scroll {
          animation: scroll-right 40s linear infinite;
          will-change: transform;
        }

        .hub-scroll-container {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .hub-image-item {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .hub-image-item:hover {
          transform: scale(1.06) translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.28);
        }
      `}</style>

      <div className="w-full relative overflow-hidden py-4">
        {/* Scrolling strip */}
        <div className="hub-scroll-container w-full overflow-hidden">
          <div className="hub-infinite-scroll flex gap-5 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="hub-image-item flex-shrink-0 w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-xl border-2 border-white/60"
              >
                <img
                  src={image}
                  alt={`Hub gallery image ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageAutoSlider;
