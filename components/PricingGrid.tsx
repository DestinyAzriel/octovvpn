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
                    {p.price === 0 ? "$1" : `$${price.toFixed(2)}`}
                  </span>
                  <span className="text-sm font-medium text-mute">
                    {p.price === 0 ? "card fee" : "/month"}
                  </span>
                </div>

                <div className="mt-1 h-5 text-xs text-mute">
                  {yearly && p.price > 0 ? (
                    <span className="text-emerald">Billed ${ (price * 12).toFixed(2) } annually</span>
                  ) : p.price === 0 ? (
                    <span className="font-medium text-cyan">Valid for 7 days</span>
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
                  {p.price === 0 ? "Start 7-Day Trial" : "Choose " + p.name}
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
                <svg className="h-4 w-auto" viewBox="240 390 550 260" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M781.67 515.75c0-38.35-18.58-68.62-54.08-68.62s-57.23 30.26-57.23 68.32c0 45.09 25.47 67.87 62 67.87 17.83 0 31.31-4 41.5-9.74v-30c-10.19 5.09-21.87 8.24-36.7 8.24-14.53 0-27.42-5.09-29.06-22.77h73.26c.01-1.92.31-9.71.31-13.3zm-74-14.23c0-16.93 10.34-24 19.78-24 9.14 0 18.88 7 18.88 24zm-95.14-54.39a42.32 42.32 0 0 0-29.36 11.69l-1.95-9.29h-33v174.68l37.45-7.94.15-42.4c5.39 3.9 13.33 9.44 26.52 9.44 26.82 0 51.24-21.57 51.24-69.06-.12-43.45-24.84-67.12-51.05-67.12zm-9 103.22c-8.84 0-14.08-3.15-17.68-7l-.15-55.58c3.9-4.34 9.29-7.34 17.83-7.34 13.63 0 23.07 15.28 23.07 34.91.01 20.03-9.28 35.01-23.06 35.01zM496.72 438.29l37.6-8.09v-30.41l-37.6 7.94v30.56zm0 11.39h37.6v131.09h-37.6zm-40.3 11.08L454 449.68h-32.34v131.08h37.45v-88.84c8.84-11.54 23.82-9.44 28.46-7.79v-34.45c-4.78-1.8-22.31-5.1-31.15 11.08zm-74.91-43.59L345 425l-.15 120c0 22.17 16.63 38.5 38.8 38.5 12.28 0 21.27-2.25 26.22-4.94v-30.45c-4.79 1.95-28.46 8.84-28.46-13.33v-53.19h28.46v-31.91h-28.51zm-101.27 70.56c0-5.84 4.79-8.09 12.73-8.09a83.56 83.56 0 0 1 37.15 9.59V454a98.8 98.8 0 0 0-37.12-6.87c-30.41 0-50.64 15.88-50.64 42.4 0 41.35 56.93 34.76 56.93 52.58 0 6.89-6 9.14-14.38 9.14-12.43 0-28.32-5.09-40.9-12v35.66a103.85 103.85 0 0 0 40.9 8.54c31.16 0 52.58-15.43 52.58-42.25-.17-44.63-57.25-36.69-57.25-53.47z"/>
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
