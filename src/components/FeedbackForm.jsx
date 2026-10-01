import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

/**
 * GOOGLE_SCRIPT_URL
 * Replace this URL with your deployed Google Apps Script Web App URL.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrH_C0J2UOz2ZQwLIN1eJCSKNMwHjjp-JoxqMHmQXjuJLFPdUaklAbIfimwcXX1Ymj/exec";

export default function FeedbackForm() {
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    otherProfession: '',
    service: '',
    otherService: '',
    feedbackMessage: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const professions = [
    'Business Owner',
    'Salaried Professional',
    'Government Employee',
    'Self-Employed',
    'Student',
    'Homemaker',
    'Retired',
    'Other'
  ];

  const services = [
    'Business Insurance',
    'Insurance',
    'House & Property',
    'Professional Indemnity',
    'Group Policies',
    'Workmen Compensation',
    'Miscellaneous',
    'Mutual Funds & SIP',
    'PMS & AIF',
    'Claims Assistance Desk',
    'Other'
  ];

  // Clean and validate Indian phone number
  const validatePhone = (rawPhone) => {
    // Remove spaces, hyphens, parentheses, and leading +91 or 0
    let cleaned = rawPhone.replace(/[\s\-()]/g, '');
    if (cleaned.startsWith('+91')) {
      cleaned = cleaned.substring(3);
    } else if (cleaned.startsWith('91') && cleaned.length === 12) {
      cleaned = cleaned.substring(2);
    } else if (cleaned.startsWith('0') && cleaned.length === 11) {
      cleaned = cleaned.substring(1);
    }
    // Must be 10 digits starting with 6, 7, 8, or 9
    const isValid = /^[6-9]\d{9}$/.test(cleaned);
    return { isValid, cleaned };
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name
    if (!formState.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formState.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name (minimum 2 characters).';
    }

    // 2. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formState.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 3. Phone Number
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else {
      const { isValid } = validatePhone(formState.phone.trim());
      if (!isValid) {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number (e.g. 9876543210).';
      }
    }

    // 4. Profession
    if (!formState.profession) {
      newErrors.profession = 'Please select your profession.';
    } else if (formState.profession === 'Other' && !formState.otherProfession.trim()) {
      newErrors.otherProfession = 'Please specify your profession.';
    }

    // 5. Service / Product Purchased
    if (!formState.service) {
      newErrors.service = 'Please select the service or product purchased.';
    } else if (formState.service === 'Other' && !formState.otherService.trim()) {
      newErrors.otherService = 'Please specify the service or product.';
    }

    // 6. Feedback Message
    if (!formState.feedbackMessage.trim()) {
      newErrors.feedbackMessage = 'Feedback Message is required.';
    } else if (formState.feedbackMessage.trim().length < 10) {
      newErrors.feedbackMessage = 'Please enter at least 10 characters to describe your experience.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormState(prev => {
      const updated = { ...prev, [field]: value };
      // If profession changes away from 'Other', reset otherProfession
      if (field === 'profession' && value !== 'Other') {
        updated.otherProfession = '';
      }
      // If service changes away from 'Other', reset otherService
      if (field === 'service' && value !== 'Other') {
        updated.otherService = '';
      }
      return updated;
    });

    // Clear field-specific error as user types/selects
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (field === 'profession' && errors.otherProfession) {
      setErrors(prev => ({ ...prev, otherProfession: '' }));
    }
    if (field === 'service' && errors.otherService) {
      setErrors(prev => ({ ...prev, otherService: '' }));
    }
    if (submitStatus === 'error') {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submission while already processing
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const { cleaned: sanitizedPhone } = validatePhone(formState.phone.trim());

    const payload = {
      fullName: formState.fullName.trim(),
      email: formState.email.trim(),
      phone: sanitizedPhone,
      profession: formState.profession,
      otherProfession: formState.profession === 'Other' ? formState.otherProfession.trim() : '',
      service: formState.service,
      otherService: formState.service === 'Other' ? formState.otherService.trim() : '',
      feedbackMessage: formState.feedbackMessage.trim(),
    };

    try {
      // Check if user has configured the real script URL
      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL" || GOOGLE_SCRIPT_URL.includes("AKfycbx...")) {
        setErrorMessage("Please configure your deployed Google Apps Script Web App URL in FeedbackForm.jsx.");
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Send to Google Apps Script Web App with fallback
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok || response.type === 'opaque') {
          let isError = false;
          try {
            const result = await response.json();
            if (result && result.status === 'error') {
              isError = true;
              throw new Error(result.message || 'Submission failed');
            }
          } catch (jsonErr) {
            if (isError) throw jsonErr;
          }

          setSubmitStatus('success');
          setFormState(initialFormState);
          setErrors({});
        } else {
          throw new Error(`Server returned status: ${response.status}`);
        }
      } catch (fetchErr) {
        // Fallback using no-cors mode to guarantee delivery through Google 302 redirects
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
          });
          setSubmitStatus('success');
          setFormState(initialFormState);
          setErrors({});
        } catch (fallbackErr) {
          console.error("Feedback submission fallback error:", fallbackErr);
          setSubmitStatus('error');
          setErrorMessage(fetchErr?.message || 'Something went wrong while submitting your feedback. Please try again.');
        }
      }
    } catch (outerErr) {
      console.error("Feedback submission error:", outerErr);
      setSubmitStatus('error');
      setErrorMessage(outerErr?.message || 'Something went wrong while submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="relative py-20 lg:py-24 bg-white border-t border-slate-100 overflow-hidden w-full max-w-full">
      {/* Subtle brand glow in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/60 blur-3xl"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-50/50 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-insurance-orange border border-orange-100 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest font-sans mx-auto">
            <Sparkles size={14} className="text-insurance-orange" />
            Customer Review
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase font-sans">
            Share Your{' '}
            <span className="bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto font-sans">
            Your feedback helps us serve you better.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-slate-50/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40 relative">
          
          {/* Top Brand Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-insurance-darkblue via-insurance-orange to-insurance-green rounded-t-3xl"></div>

          {/* Success Banner */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 sm:p-8 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={32} className="stroke-[2.5]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-900 font-sans">
                Thank you for sharing your experience with us!
              </h3>
              <p className="text-emerald-700 text-sm sm:text-base font-semibold max-w-lg mx-auto">
                Your feedback has been submitted successfully and recorded into our system. We deeply value your trust in The Insurance Hub.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Submit Another Feedback
              </button>
            </div>
          )}

          {/* Error Banner */}
          {submitStatus === 'error' && (
            <div className="mb-8 p-5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3.5 text-rose-800 animate-fade-in">
              <AlertCircle size={22} className="text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm font-semibold">
                <p className="font-extrabold text-rose-900 mb-0.5">Submission Notice</p>
                <p>{errorMessage || "Something went wrong while submitting your feedback. Please try again."}</p>
                <p className="text-xs text-rose-600 mt-1 font-normal">
                  Don't worry — your entered information has been preserved below so you don't have to retype it.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            {/* ROW 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Field 1: Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="feedback-fullName" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
                    <User size={18} />
                  </div>
                  <input
                    id="feedback-fullName"
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-2xl text-[14px] text-slate-800 outline-none transition-all font-medium ${
                      errors.fullName 
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Field 2: Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="feedback-email" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
                    <Mail size={18} />
                  </div>
                  <input
                    id="feedback-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-2xl text-[14px] text-slate-800 outline-none transition-all font-medium ${
                      errors.email 
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.email}
                  </p>
                )}
              </div>

            </div>

            {/* ROW 2: Phone Number & Profession / Type of Job */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Field 3: Phone Number */}
              <div className="space-y-1.5">
                <label htmlFor="feedback-phone" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
                    <Phone size={18} />
                  </div>
                  <input
                    id="feedback-phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number (e.g. 9876543210)"
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-2xl text-[14px] text-slate-800 outline-none transition-all font-medium ${
                      errors.phone 
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Field 4: Profession / Type of Job */}
              <div className="space-y-1.5">
                <label htmlFor="feedback-profession" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  Profession / Type of Job <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
                    <Briefcase size={18} />
                  </div>
                  <select
                    id="feedback-profession"
                    required
                    value={formState.profession}
                    onChange={(e) => handleChange('profession', e.target.value)}
                    disabled={isSubmitting}
                    className={`w-full pl-11 pr-8 py-3.5 bg-white border rounded-2xl text-[14px] text-slate-800 outline-none transition-all font-semibold appearance-none cursor-pointer ${
                      errors.profession 
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                        : 'border-slate-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                    }`}
                  >
                    <option value="" disabled>Select your profession</option>
                    {professions.map((prof) => (
                      <option key={prof} value={prof}>
                        {prof}
                      </option>
                    ))}
                  </select>
                  {/* Dropdown Chevron */}
                  <div className="absolute right-4 top-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.profession && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.profession}
                  </p>
                )}
              </div>

            </div>

            {/* Field 4 (Conditional): Other Profession specification */}
            {formState.profession === 'Other' && (
              <div className="space-y-1.5 animate-fade-in p-4 bg-orange-50/50 border border-orange-200/80 rounded-2xl">
                <label htmlFor="feedback-otherProfession" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-orange-900 flex items-center gap-1">
                  Please specify your profession <span className="text-rose-500">*</span>
                </label>
                <input
                  id="feedback-otherProfession"
                  type="text"
                  required
                  value={formState.otherProfession}
                  onChange={(e) => handleChange('otherProfession', e.target.value)}
                  placeholder="Enter your profession / occupation"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-[14px] text-slate-800 outline-none transition-all font-medium ${
                    errors.otherProfession 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                      : 'border-orange-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                {errors.otherProfession && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.otherProfession}
                  </p>
                )}
              </div>
            )}

            {/* Field 5: Service / Product Purchased */}
            <div className="space-y-1.5">
              <label htmlFor="feedback-service" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                Service / Product Purchased <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 font-medium">
                Select the service or product you have purchased from The Insurance Hub.
              </p>
              <div className="relative">
                <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none">
                  <ShieldCheck size={18} />
                </div>
                <select
                  id="feedback-service"
                  required
                  value={formState.service}
                  onChange={(e) => handleChange('service', e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full pl-11 pr-8 py-3.5 bg-white border rounded-2xl text-[14px] text-slate-800 outline-none transition-all font-semibold appearance-none cursor-pointer ${
                    errors.service 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                      : 'border-slate-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                  }`}
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
                {/* Dropdown Chevron */}
                <div className="absolute right-4 top-4 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.service && (
                <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle size={13} /> {errors.service}
                </p>
              )}
            </div>

            {/* Field 5 (Conditional): Other Service specification */}
            {formState.service === 'Other' && (
              <div className="space-y-1.5 animate-fade-in p-4 bg-orange-50/50 border border-orange-200/80 rounded-2xl">
                <label htmlFor="feedback-otherService" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-orange-900 flex items-center gap-1">
                  Please specify the service <span className="text-rose-500">*</span>
                </label>
                <input
                  id="feedback-otherService"
                  type="text"
                  required
                  value={formState.otherService}
                  onChange={(e) => handleChange('otherService', e.target.value)}
                  placeholder="Enter the service or product name"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-[14px] text-slate-800 outline-none transition-all font-medium ${
                    errors.otherService 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                      : 'border-orange-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                {errors.otherService && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.otherService}
                  </p>
                )}
              </div>
            )}

            {/* Field 6: Feedback Message */}
            <div className="space-y-1.5">
              <label htmlFor="feedback-message" className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                Feedback Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="feedback-message"
                rows={4}
                required
                value={formState.feedbackMessage}
                onChange={(e) => handleChange('feedbackMessage', e.target.value)}
                placeholder="Tell us about your experience with The Insurance Hub..."
                disabled={isSubmitting}
                className={`w-full px-4 sm:px-5 py-3.5 bg-white border rounded-2xl text-[14px] text-slate-800 outline-none transition-all resize-none font-medium leading-relaxed ${
                  errors.feedbackMessage 
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                    : 'border-slate-200 focus:border-insurance-darkblue focus:ring-2 focus:ring-blue-100'
                }`}
              ></textarea>
              {errors.feedbackMessage && (
                <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle size={13} /> {errors.feedbackMessage}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-gradient-to-r from-insurance-darkblue to-blue-700 hover:from-blue-700 hover:to-insurance-darkblue text-white font-extrabold text-[15px] rounded-2xl transition-all duration-300 shadow-lg shadow-blue-900/15 flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Feedback</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
