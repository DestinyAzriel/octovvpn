"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-ink/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3.5 sm:gap-4">
          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center overflow-hidden rounded-2xl shadow-xl shadow-blue/20 transition-transform group-hover:scale-105">
            <Image
              src="/octovvpn_logo.png"
              alt="OctoVVPN Logo"
              width={64}
              height={64}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white transition-colors group-hover:text-blue">
              Octo<span className="text-blue">V</span>VPN
            </span>
            <span className="hidden text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-mute md:inline-block">
              Stealth Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-mute md:flex">
          <a href="/#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="/#network" className="transition-colors hover:text-white">
            Servers
          </a>
          <a href="/#pricing" className="transition-colors hover:text-white">
            Pricing
          </a>
          <a href="/#faq" className="transition-colors hover:text-white">
            FAQ
          </a>
          <Link href="/affiliates" className="transition-colors hover:text-white">
            Affiliates
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="/#download"
            className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Download App
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card text-mute hover:text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-b border-line bg-card/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a
              href="/#features"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-mute hover:bg-ink hover:text-white"
            >
              Features
            </a>
            <a
              href="/#network"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-mute hover:bg-ink hover:text-white"
            >
              Servers
            </a>
            <a
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-mute hover:bg-ink hover:text-white"
            >
              Pricing
            </a>
            <a
              href="/#faq"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-mute hover:bg-ink hover:text-white"
            >
              FAQ
            </a>
            <Link
              href="/affiliates"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-mute hover:bg-ink hover:text-white"
            >
              Affiliates
            </Link>
            <div className="mt-4 pt-4 border-t border-line">
              <a
                href="/#download"
                onClick={() => setIsOpen(false)}
                className="btn-primary block w-full rounded-xl py-3 text-center text-sm font-semibold text-white"
              >
                Download App
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
