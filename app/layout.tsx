import "./globals.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "OctoVVPN — Experience the Internet Without Borders",
  description:
    "Military-grade AES-256-GCM encryption, Shadowsocks, Obfs4 stealth obfuscation, and autonomous routing for restrictive networks. Download for Windows and Android.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/octovvpn_logo.png",
  },
  verification: { google: "NDRPlLW37UfgDKTjBZqP2_ZuiKjs32QAY3Pg_rmQkA4" },
  other: {
    "trustpilot-one-time-domain-verification-id": "c38cf01e-6d44-4526-933b-b4f19cfbd194",
  },
};


const GROUPS: [string, [string, string][]][] = [
  [
    "Product",
    [
      ["Features", "/#features"],
      ["Server Network", "/#network"],
      ["Pricing & Plans", "/#pricing"],
      ["Download Center", "/#download"],
      ["Affiliate Program", "/affiliates"],
    ],
  ],
  [
    "Support & Systems",
    [
      ["Contact Support", "/contact"],
      ["Server Live Status", "/status"],
      ["Delete Account", "/delete-account"],
      ["Official Facebook", "https://web.facebook.com/profile.php?id=61594801065744"],
    ],
  ],
  [
    "Legal & Privacy",
    [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Refund Policy", "/refunds"],
      ["Cookie Policy", "/cookies"],
      ["GDPR Compliance", "/gdpr"],
      ["About OctoVVPN", "/about"],
    ],
  ],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans antialiased selection:bg-blue selection:text-white">
        <Navbar />
        {children}

        {/* FOOTER */}
        <footer className="mt-24 border-t border-line/60 bg-card/60 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-10 md:grid-cols-5">
              {/* Brand Col */}
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-3.5">
                  <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-2xl bg-blue/20 p-1.5 ring-1 ring-blue/30 shadow-lg shadow-blue/10">
                    <Image
                      src="/octovvpn_logo.png"
                      alt="OctoVVPN"
                      width={56}
                      height={56}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-white">
                    Octo<span className="text-blue">V</span>VPN
                  </span>
                </Link>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
                  Engineered for resilient privacy and unrestricted access. Defeating censorship through modern cryptographic obfuscation.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-line bg-ink px-2.5 py-1 text-[11px] font-mono text-mute">
                    AES-256-GCM
                  </span>
                  <span className="rounded-lg border border-line bg-ink px-2.5 py-1 text-[11px] font-mono text-cyan">
                    Obfs4 / Shadowsocks
                  </span>
                  <span className="rounded-lg border border-line bg-ink px-2.5 py-1 text-[11px] font-mono text-emerald">
                    Zero Logs
                  </span>
                </div>

                {/* Trust & Social Channels */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://connectamericas.com/company/octotech-limited"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="OCTOTECH LIMITED — Verified on ConnectAmericas"
                  >
                    <img
                      src="https://connectamericas.com/sites/default/files/content-idb/verifiedbadge.png"
                      alt="ConnectAmericas Verified Company — OCTOTECH LIMITED"
                      className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100"
                    />
                  </a>
                  <a
                    href="https://web.facebook.com/profile.php?id=61594801065744"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-line bg-ink/80 px-3.5 py-2 text-xs font-semibold text-mute-light transition-all hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:text-white"
                    title="Follow OctoVVPN on Facebook"
                  >
                    <svg className="h-4 w-4 fill-[#1877F2] transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Follow on Facebook</span>
                  </a>
                </div>
              </div>

              {/* Links Groups */}
              {GROUPS.map(([header, links]) => (
                <div key={header}>
                  <p className="text-sm font-semibold tracking-wider text-white uppercase">
                    {header}
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm text-mute">
                    {links.map(([title, url]) => {
                      const isExternal = url.startsWith("http");
                      if (isExternal) {
                        return (
                          <li key={url}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
                            >
                              {title}
                              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </li>
                        );
                      }
                      return (
                        <li key={url}>
                          <Link
                            href={url}
                            className="transition-colors duration-150 hover:text-white"
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/40 pt-8 text-xs text-mute sm:flex-row">
              <p>© {new Date().getFullYear()} Octo Tech Ltd. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <a
                  href="https://web.facebook.com/profile.php?id=61594801065744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#1877F2] transition-colors"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <Link href="/status" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                  Systems Normal
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
