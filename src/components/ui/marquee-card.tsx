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
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !content.trim()) return;

    const newTestimonial = {
      name: name.trim(),
      role: role.trim(),
      content: content.trim(),
      avatar: `https://images.unsplash.com/photo-${[
        "1534528741775-53994a69daeb",
        "1506794778202-cad84cf45f1d",
        "1517841905240-472988babdf9",
        "1539571696357-5a69c17a67c6",
      ][Math.floor(Math.random() * 4)]}?auto=format&fit=crop&w=150&h=150&q=80`,
      rating,
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setName("");
    setRole("");
    setContent("");
    setRating(5);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-12">
      {/* Testimonials Marquee wrapper */}
      <div className="relative py-4 overflow-hidden">
        {/* Fading side edges for premium touch */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />
        
        <Marquee pauseOnHover speed="normal">
          {testimonials.map((testimonial, index) => (
            <LiquidCard key={index} className="mx-2 rounded-3xl w-80 h-full border border-slate-200/80 bg-white/40 shadow-premium hover:shadow-premium-hover transition-all duration-300">
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

      {/* Feedback Submission Form */}
      <div className="max-w-xl mx-auto px-4">
        {!isSubmitting ? (
          <div className="text-center">
            <Button
              onClick={() => setIsSubmitting(true)}
              variant="outline"
              className="rounded-2xl border-dashed border-2 border-insurance-darkblue/40 text-insurance-darkblue font-bold px-6 py-6 hover:bg-insurance-darkblue/5 hover:text-insurance-darkblue transition-all inline-flex items-center gap-2"
            >
              <MessageSquarePlus size={18} /> Write a Review / Share Your Experience
            </Button>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-sans">
                <MessageSquare className="text-insurance-orange" size={20} /> Share Your Feedback
              </h3>
              <button
                type="button"
                onClick={() => setIsSubmitting(false)}
                className="text-[12px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Role / Occupation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-3 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      required 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Business Owner, Engineer" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Your Rating</label>
                <div className="flex gap-1.5 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "fill-[#f28b24] text-[#f28b24]"
                            : "text-slate-200 fill-slate-100"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 font-bold ml-2">({rating} / 5 Stars)</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">Your Experience</label>
                <textarea 
                  rows={3} 
                  required 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="How was your experience with The Insurance Hub?" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-800 outline-none focus:border-insurance-darkblue transition-all resize-none font-medium"
                ></textarea>
              </div>

              <Button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-insurance-darkblue to-blue-700 text-white font-extrabold text-[13px] rounded-xl hover:shadow-lg transition-all"
              >
                Submit Feedback
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
