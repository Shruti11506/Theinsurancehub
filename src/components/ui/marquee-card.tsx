import React, { useState } from "react";
import { Star, MessageSquarePlus, User, Briefcase, MessageSquare } from "lucide-react";
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";

const initialTestimonials = [
  // CUSTOMER 1: Real Customer Testimonial (Has quotation marks)
  {
    name: "Ritesh Ramesh Patil",
    role: "Businessman • Dharmabad",
    content: "Hi, my name is Kirti Patil. When my dad, Ramesh Patil, needed hospitalization in Hyderabad, Adarsh Bafna from Star Health Nanded explained everything in detail on how to proceed. From documentation to cashless processing, he helped us smoothly. If you ever need to buy a policy, you can contact Adarsh Bafna.",
    avatar: "https://ui-avatars.com/api/?name=Ritesh+Patil&background=0f172a&color=ffffff&bold=true",
    rating: 5,
    isQuote: true,
  },
  // CUSTOMER 2: DRAFT — CUSTOMER APPROVAL REQUIRED (First-person, no quotation marks)
  {
    name: "Ishwar Dhoka",
    role: "Anand Travels • General Service",
    content: "At Anand Travels, I have received professional and dependable general service from The Insurance Hub.",
    avatar: "https://ui-avatars.com/api/?name=Ishwar+Dhoka&background=f28b24&color=ffffff&bold=true",
    rating: 5,
    isQuote: false,
  },
  // CUSTOMER 3: DRAFT — CUSTOMER APPROVAL REQUIRED (First-person, no quotation marks)
  {
    name: "Sunil Bhandari",
    role: "Businessman • General Service",
    content: "As a businessman, I receive dependable general service and prompt guidance from The Insurance Hub.",
    avatar: "https://ui-avatars.com/api/?name=Sunil+Bhandari&background=2563eb&color=ffffff&bold=true",
    rating: 5,
    isQuote: false,
  },
  // CUSTOMER 4: DRAFT — CUSTOMER APPROVAL REQUIRED (First-person, no quotation marks)
  {
    name: "Keshav Gaddam",
    role: "Chairman, NPS",
    content: "As Chairman of NPS, I receive dependable consultation and professional service coordination from The Insurance Hub.",
    avatar: "https://ui-avatars.com/api/?name=Keshav+Gaddam&background=16a34a&color=ffffff&bold=true",
    rating: 5,
    isQuote: false,
  },
  // CUSTOMER 5: DRAFT — CUSTOMER APPROVAL REQUIRED (First-person, no quotation marks)
  {
    name: "Sachin Toshniwal",
    role: "Sachin Seeds Company",
    content: "At Sachin Seeds Company, I receive prompt consultation and dependable service from The Insurance Hub.",
    avatar: "https://ui-avatars.com/api/?name=Sachin+Toshniwal&background=7c3aed&color=ffffff&bold=true",
    rating: 5,
    isQuote: false,
  },
];

export const Component = () => {
  const [testimonials] = useState(initialTestimonials);

  return (
    <div className="space-y-8 w-full max-w-full overflow-hidden">
      {/* Testimonials Marquee wrapper */}
      <div className="relative py-4 overflow-hidden w-full max-w-full">
        {/* Fading side edges for premium touch */}
        <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />
        
        <Marquee pauseOnHover speed="normal">
          {testimonials.map((testimonial, index) => (
            <LiquidCard key={index} className="mx-1.5 sm:mx-2 rounded-3xl w-[280px] sm:w-80 h-full border border-slate-200/80 bg-white/40 shadow-premium hover:shadow-premium-hover transition-all duration-300">
              <CardContent className="p-6 py-0 flex flex-col justify-between h-full min-h-[180px]">
                <div>
                  <div className="mb-4 flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-10 w-10 object-cover rounded-full border border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800 font-sans">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-insurance-darkblue font-semibold">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={`mb-3 text-[13px] leading-relaxed text-slate-600 font-medium ${testimonial.isQuote ? 'italic' : ''}`}>
                    {testimonial.isQuote ? (
                      <>&ldquo;{testimonial.content}&rdquo;</>
                    ) : (
                      testimonial.content
                    )}
                  </p>
                </div>
                <div className="flex space-x-1 mt-auto pt-2 border-t border-slate-100">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-[#f28b24] text-[#f28b24]"
                          : "text-slate-200 fill-slate-100"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </LiquidCard>
          ))}
        </Marquee>
      </div>

      {/* Button linking to the Feedback Form */}
      <div className="max-w-xl mx-auto px-4 text-center">
        <a
          href="#feedback"
          className="rounded-2xl border-dashed border-2 border-insurance-darkblue/40 text-insurance-darkblue font-bold px-7 py-3.5 hover:bg-insurance-darkblue/5 hover:text-insurance-darkblue transition-all inline-flex items-center gap-2.5 text-sm sm:text-[15px] shadow-xs cursor-pointer group"
        >
          <MessageSquarePlus size={19} className="text-insurance-orange group-hover:scale-110 transition-transform" /> 
          Write a Review / Share Your Experience
        </a>
      </div>
    </div>
  );
};
