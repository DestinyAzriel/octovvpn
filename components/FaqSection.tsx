"use client";

import { useState } from "react";
import type { Faq } from "@/lib/data";

const DEFAULT_FAQS: Faq[] = [
  {
    q: "Does OctoVVPN work in restrictive networks and firewalls?",
    a: "Yes. OctoVVPN was specifically designed for restrictive regions and deep-packet inspection (DPI) environments. It employs Shadowsocks and Obfs4 obfuscation protocols with dynamic port-hopping and MTU tuning to make VPN traffic look like normal HTTPS browsing.",
  },
  {
    q: "How do I get started?",
    a: "Download the Windows or Android app, create a free account, and immediately start browsing with our Stealth plan. No payment information or personal details required.",
  },
  {
    q: "What devices and platforms are currently supported?",
    a: "We officially support Windows (10 and 11, 64-bit) and Android devices through Google Play. Native macOS, iOS, and Linux applications are in active development.",
  },
  {
    q: "Is there a completely free tier?",
    a: "Yes! Our Stealth plan is free to use with 10 GB of high-speed data every month across 3 server regions, including full encryption protection.",
  },
  {
    q: "What is your refund policy?",
    a: "All paid plans come with a hassle-free 30-day money-back guarantee. If you are not satisfied for any reason, email support@octovvpn.com within 30 days for a full refund.",
  },
  {
    q: "Do you keep logs of my browsing activity?",
    a: "Absolutely not. We operate a strict zero-logs architecture. We do not track, collect, or store your browsing history, DNS queries, IP addresses, or destination traffic.",
  },
];

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mt-8 space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-blue/60 bg-card/90 shadow-lg shadow-blue/5"
                : "border-line bg-card/50 hover:border-line-bright hover:bg-card/75"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="flex w-full cursor-pointer items-center justify-between p-6 text-left transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-white md:text-lg">
                {item.q}
              </span>
              <span
                className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-ink text-mute transition-transform duration-200 ${
                  isOpen ? "rotate-180 border-blue text-blue" : ""
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-line/40 px-6 pb-6 pt-4 text-sm leading-relaxed text-mute-light">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
