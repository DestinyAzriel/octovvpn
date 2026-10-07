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
    icon: "/favicon.png",
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
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-blue/20 p-1 ring-1 ring-blue/30">
                    <Image
                      src="/octovvpn_logo.png"
                      alt="OctoVVPN"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white">
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
              </div>

              {/* Links Groups */}
              {GROUPS.map(([header, links]) => (
                <div key={header}>
                  <p className="text-sm font-semibold tracking-wider text-white uppercase">
                    {header}
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm text-mute">
                    {links.map(([title, url]) => (
                      <li key={url}>
                        <a
                          href={url}
                          className="transition-colors duration-150 hover:text-white"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/40 pt-8 text-xs text-mute sm:flex-row">
              <p>© {new Date().getFullYear()} Octo Tech Ltd. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="hover:text-white">Privacy</Link>
                <Link href="/terms" className="hover:text-white">Terms</Link>
                <Link href="/status" className="flex items-center gap-1.5 hover:text-white">
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
