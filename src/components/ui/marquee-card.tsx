import React, { useState } from "react";
import { Star, MessageSquarePlus, User, Briefcase, MessageSquare } from "lucide-react";
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";

const initialTestimonials = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner",
    content: "The Insurance Hub helped us find the perfect commercial cover for our fleet. Their team handles everything from comparison to claims, making the process incredibly seamless.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Software Engineer",
    content: "Securing term life and health insurance for my family was a breeze. They explained all the fine print clearly and gave unbiased advice. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "Retired Professional",
    content: "When my health insurance claim was delayed by the provider, the Claims Assistance Desk at The Insurance Hub stepped in and got it settled in no time. Truly a lifesaver!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
  },
  {
    name: "Ananya Sen",
    role: "Home Maker",
    content: "The SIP and Mutual Fund advice from Divyesh has helped us plan our daughter's higher education fund. Extremely knowledgeable and trustworthy team.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
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
                  <p className="mb-3 text-[13px] leading-relaxed text-slate-600 font-medium italic">
                    &ldquo;{testimonial.content}&rdquo;
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
