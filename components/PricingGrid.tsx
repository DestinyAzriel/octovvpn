"use client";

import { useState } from "react";
import { ANNUAL_DISCOUNT, type Plan } from "@/lib/data";


export default function PricingGrid({ plans }: { plans: Plan[] }) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="w-full">
      {/* Billing Switcher */}
      <div className="mt-8 flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="relative flex items-center rounded-2xl border border-line bg-card/80 p-1.5 shadow-inner"
        >
          <button
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
            className={`cursor-pointer rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              !yearly
                ? "bg-blue text-white shadow-md shadow-blue/25"
                : "text-mute hover:text-white"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
            className={`cursor-pointer flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
              yearly
                ? "bg-blue text-white shadow-md shadow-blue/25"
                : "text-mute hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-emerald/20 px-2.5 py-0.5 text-xs font-bold text-emerald border border-emerald/30">
              Save {Math.round(ANNUAL_DISCOUNT * 100)}%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => {
          const isFeatured = p.badge === "Most popular";
          const isBestValue = p.badge === "Best value";
          const price = yearly ? p.price * (1 - ANNUAL_DISCOUNT) : p.price;

          return (
            <div
              key={p.name}
              className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${
                isFeatured
                  ? "border-2 border-violet bg-gradient-to-b from-[#18133d] to-card shadow-2xl shadow-violet/20 scale-[1.02] z-10"
                  : isBestValue
                  ? "border border-gold/40 bg-gradient-to-b from-[#221c10] to-card shadow-lg hover:border-gold/70"
                  : "border border-line bg-card/70 hover:border-line-bright hover:bg-card"
              }`}
            >
              {/* Badge */}
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${
                      isFeatured
                        ? "bg-gradient-to-r from-violet to-purple-600 text-white"
                        : "bg-gradient-to-r from-gold to-amber-500 text-ink font-extrabold"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-white">{p.name}</h3>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-mute">/month</span>
                </div>

                <div className="mt-1 h-5 text-xs text-mute">
                  {yearly && p.price > 0 ? (
                    <span className="text-emerald">Billed ${ (price * 12).toFixed(2) } annually</span>
                  ) : p.price === 0 ? (
                    <span>Free forever</span>
                  ) : (
                    <span>Standard monthly cycle</span>
                  )}
                </div>

                <div className="my-6 h-px w-full bg-line/60" />

                <ul className="space-y-3.5 text-sm text-mute">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-mute-light">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#download"
                  className={`block w-full cursor-pointer rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    isFeatured
                      ? "btn-primary text-white shadow-lg shadow-blue/20"
                      : p.price === 0
                      ? "border border-line bg-ink text-white hover:border-blue hover:bg-card"
                      : "btn-secondary text-white hover:text-white"
                  }`}
                >
                  {p.price === 0 ? "Start Free Now" : "Choose " + p.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Methods Guarantee */}
      <div className="mt-12 rounded-2xl border border-line/60 bg-card/40 p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">30-Day Money-Back Guarantee</p>
              <p className="text-xs text-mute">Test all premium features risk-free. Cancel anytime with a single click.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2.5 sm:items-end">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-medium text-mute">Payments secured by</span>
              {/* Stripe wordmark SVG */}
              <div className="flex h-8 items-center rounded-lg bg-[#635BFF] px-3 shadow-md shadow-[#635BFF]/30 transition-transform hover:scale-105">
                <svg className="h-4" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.46 10.22c0-.78.64-1.08 1.7-1.08 1.52 0 3.44.46 4.96 1.28V6.16C10.6 5.48 9.02 5.2 7.18 5.2 3.18 5.2.86 7.26.86 10.4c0 4.96 6.84 4.18 6.84 6.32 0 .92-.8 1.22-1.92 1.22-1.66 0-3.78-.68-5.46-1.6v4.3c1.86.8 3.74 1.14 5.46 1.14 4.12 0 6.54-2.04 6.54-5.22-.02-5.36-6.86-4.4-6.86-6.34zM18.4 2.08l-4.26.9v2.34l-2.1.44V9.4l2.1-.44v8.18c0 3 1.68 4.14 4.08 4.14 1.28 0 2.22-.22 2.76-.48v-3.8c-.5.2-2.58.8-2.58-1.2V8.96h2.58V5.32h-2.58V2.08zM25.4 7.04l-.26 1.34V5.32h-4.26v15.96h4.26v-8.58c1-1.3 2.7-1.06 3.22-.9V5.32c-.54-.18-2.5-.5-2.96 1.72zM29.68 5.32h4.26v15.96h-4.26V5.32zm0-5.32h4.26v3.4h-4.26V0zm12.4 5.08c-1.64 0-2.7.78-3.38 1.32V5.32H34.4v15.96h4.3v-8.94c.66-.9 1.58-1.44 2.66-1.44 1.54 0 2.44.96 2.44 2.44v7.94h4.28V12.4c0-4.02-2.28-7.32-6-7.32zM57.14 12.7c0-4.5-2.18-7.62-6.38-7.62-4.22 0-6.78 3.12-6.78 8.18 0 5.4 3.04 8.02 7.34 8.02 2.12 0 3.72-.46 4.96-1.24v-3.6c-1.24.72-2.66 1.14-4.44 1.14-1.76 0-3.3-.62-3.52-2.76h8.76c.02-.26.06-1.3.06-2.12zm-8.82-1.5c0-2.04 1.26-2.88 2.4-2.88 1.1 0 2.28.84 2.28 2.88h-4.68z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-mute">Accepted via Stripe:</span>
              {[
                { label: "Visa", bg: "bg-[#1A1F71]", text: "text-white font-extrabold italic text-xs tracking-wider" },
                { label: "Mastercard", bg: "bg-[#EB001B]", text: "text-white font-bold text-[10px]" },
                { label: "AMEX", bg: "bg-[#2E77BC]", text: "text-white font-bold text-[10px]" },
                { label: "Apple Pay", bg: "bg-black border border-white/20", text: "text-white font-medium text-[10px]" },
                { label: "Google Pay", bg: "bg-white text-gray-900", text: "text-gray-900 font-semibold text-[10px]" },
              ].map(({ label, bg, text }) => (
                <div key={label} className={`flex h-6 items-center rounded px-2 ${bg}`}>
                  <span className={text}>{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
