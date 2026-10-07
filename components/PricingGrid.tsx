"use client";

import { useState } from "react";
import Image from "next/image";
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

          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-mute">Accepted payments:</span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 items-center rounded-md bg-white/10 px-2 text-xs font-bold text-white border border-white/10">
                CARD
              </div>
              <div className="relative h-8 w-10 overflow-hidden rounded-md bg-white p-1">
                <Image src="/ali.png" alt="AliPay" width={32} height={24} className="h-full w-full object-contain" />
              </div>
              <div className="relative h-8 w-10 overflow-hidden rounded-md bg-white p-1">
                <Image src="/wechat.png" alt="WeChat Pay" width={32} height={24} className="h-full w-full object-contain" />
              </div>
              <div className="flex h-8 items-center rounded-md bg-white/10 px-2 text-xs font-medium text-white/80 border border-white/10">
                CRYPTO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
