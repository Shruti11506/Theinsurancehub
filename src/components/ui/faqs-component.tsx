'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What types of insurance policies do you offer?',
            answer: 'We offer a comprehensive range of insurance policies, including Health Insurance, Term Life Insurance, Motor & Car Insurance, Business Insurance, and Travel Protection, as well as Mutual Funds & SIP planning.',
        },
        {
            id: 'item-2',
            question: 'How can I file a claim?',
            answer: 'You can file a claim by contacting our Claims Assistance Desk. Our dedicated team provides end-to-end support to ensure your claims are processed smoothly and transparently.',
        },
        {
            id: 'item-3',
            question: 'Why should I choose The Insurance Hub?',
            answer: 'With over 25 years of experience, we provide unbiased advice by comparing plans from all leading insurance companies. We ensure 100% transparency and assist you from policy selection to claim settlement.',
        },
        {
            id: 'item-4',
            question: 'Can I customize my insurance coverage?',
            answer: 'Yes, our experts work closely with you to understand your specific needs and tailor insurance coverage that fits your budget and lifestyle.',
        },
        {
            id: 'item-5',
            question: 'What is the process for health insurance cashless claims?',
            answer: 'For cashless claims, you must visit a network hospital, present your health card, and fill out a pre-authorization form. We assist you in coordinating with the hospital and insurance company for quick approval.',
        },
    ]

    return (
        <section id="faqs" className="bg-white py-16 md:py-24 relative overflow-hidden border-t border-slate-100">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl pointer-events-none"></div>
            <div className="mx-auto max-w-5xl px-6 relative z-10">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-insurance-orange bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full w-fit mx-auto">
                        FAQS
                    </h2>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                        Frequently Asked <br />
                        <span className="bg-gradient-to-r from-insurance-darkblue to-insurance-orange bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Discover quick and comprehensive answers to common questions about our platform and services.
                    </p>
                </div>

                <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/50 border border-slate-100 relative">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-b border-slate-100 last:border-0">
                                <AccordionTrigger className="text-[16px] font-bold text-slate-800 hover:text-insurance-darkblue py-5 hover:no-underline text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-[15px] text-slate-600 font-medium leading-relaxed pb-4 pr-6">
                                        {item.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-slate-500 font-medium mt-8 pt-6 border-t border-slate-100 text-center">
                        Can't find what you're looking for? Contact our{' '}
                        <a
                            href="#contact"
                            className="text-insurance-orange font-bold hover:text-insurance-darkblue transition-colors">
                            support team
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
