import Image from "next/image";
import PricingGrid from "@/components/PricingGrid";
import FaqSection from "@/components/FaqSection";
import { getPlans, getServers, getFaqs, getQuotes } from "@/lib/data";

const PLAY = process.env.NEXT_PUBLIC_PLAY_URL || "https://play.google.com/store/apps/details?id=net.octovvpn.app";
const WIN = process.env.NEXT_PUBLIC_WINDOWS_URL || "/downloads/OCTOVVPN-Setup-v1.9.exe";

export const revalidate = 60;

const speed = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(0)} Gbps` : `${m} Mbps`);

const countryFlags: Record<string, string> = {
  SG: "🇸🇬",
  US: "🇺🇸",
  DE: "🇩🇪",
  AU: "🇦🇺",
};

export default async function Home() {
  const [plans, servers, faqs, quotes] = await Promise.all([
    getPlans(),
    getServers(),
    getFaqs(),
    getQuotes(),
  ]);

  const online = servers.filter((s) => s.status === "online").length;
  const totalNodes = servers.reduce((acc, s) => acc + s.nodes, 0);
  const peakSpeed = Math.max(...servers.map((s) => s.mbps));

  return (
    <main className="relative overflow-hidden">
      {/* Background Ambience */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left Column: Headlines & CTA */}
          <div className="flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-blue/40 bg-blue/10 px-4 py-1.5 text-xs font-semibold text-blue backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan animate-pulse" />
              <span>OctoVVPN 2.0 with Stealth Anti-DPI Obfuscation</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.12]">
              Experience the Internet{" "}
              <span className="text-gradient-cyan block sm:inline">Without Borders.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-mute-light sm:text-lg">
              Encrypted end-to-end with <strong>AES-256-GCM</strong> and armed with advanced 
              <strong> Shadowsocks &amp; Obfs4</strong> obfuscation. Engineered to defeat deep packet inspection, bypass censorship, and maintain high-speed connectivity anywhere.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href={WIN}
                className="btn-primary flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-xl shadow-blue/20"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.551L24 0v11.551H10.949V1.898zM0 12.451h9.75V21.9L0 20.551v-8.1zM10.949 12.451H24V24l-13.051-1.898V12.451z" />
                </svg>
                <span>Download for Windows</span>
                <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[11px] font-mono">v1.9</span>
              </a>

              <a
                href={PLAY}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold text-white backdrop-blur-md"
              >
                <svg className="h-5 w-5 fill-current text-emerald" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.023 2.023 0 01-.61-1.464V3.278c0-.564.223-1.09.609-1.464zm11.314 11.314l2.127 2.127-10.979 6.34 8.852-8.467zm2.127-2.128L14.923 8.87l-8.852-8.467 10.979 6.34 2.127 2.127zm.92 1.055l3.208 1.853c.895.517.895 1.362 0 1.879l-3.208 1.853-2.316-2.316 2.316-2.316z" />
                </svg>
                <span>Google Play Store</span>
              </a>
            </div>

            {/* Micro Guarantees */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-mute">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Free Stealth plan included
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                30-day money-back guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Zero traffic logs
              </span>
            </div>
          </div>

          {/* Right Column: Live App Status & Interactive Gateway Mockup */}
          <div className="relative">
            {/* Halo background */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue/30 via-violet/30 to-cyan/20 blur-xl opacity-70" />

            <div className="relative rounded-3xl border border-line-bright/60 bg-card/90 p-6 shadow-2xl backdrop-blur-xl">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-blue/15 p-1 ring-1 ring-blue/30">
                    <Image src="/primary_logo.png" alt="OctoVVPN" width={32} height={32} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Live Connection State</p>
                    <p className="text-xs text-mute">Autonomous Routing</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
                  <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
                  <span>PROTECTED</span>
                </div>
              </div>

              {/* Active Node Highlight */}
              <div className="mt-5 rounded-2xl border border-line bg-ink/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-mute">Active Tunnel</span>
                  <span className="text-xs font-mono text-cyan">Ping: 18 ms</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🇩🇪</span>
                    <div>
                      <p className="text-base font-bold text-white">Frankfurt, Germany</p>
                      <p className="text-xs text-mute">Node #3 • AES-256-GCM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald">1000 Mbps</p>
                    <p className="text-[10px] text-mute">Port Hopping ON</p>
                  </div>
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-line/60 bg-ink/40 p-3 text-center">
                  <p className="text-[11px] text-mute">Protocol</p>
                  <p className="mt-1 text-xs font-bold text-white">Shadowsocks</p>
                </div>
                <div className="rounded-xl border border-line/60 bg-ink/40 p-3 text-center">
                  <p className="text-[11px] text-mute">Obfuscation</p>
                  <p className="mt-1 text-xs font-bold text-cyan">Obfs4 Active</p>
                </div>
                <div className="rounded-xl border border-line/60 bg-ink/40 p-3 text-center">
                  <p className="text-[11px] text-mute">Kill Switch</p>
                  <p className="mt-1 text-xs font-bold text-emerald">Engaged</p>
                </div>
              </div>

              {/* Server List Preview */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-mute">
                  <span>Available Server Locations</span>
                  <span className="text-cyan">{online} online</span>
                </div>

                <div className="mt-3 space-y-2">
                  {servers.slice(0, 4).map((s) => (
                    <div
                      key={s.city}
                      className="flex items-center justify-between rounded-xl border border-line/40 bg-ink/30 px-3.5 py-2.5 text-xs transition-colors hover:bg-ink/70"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{countryFlags[s.country_code] || "🌐"}</span>
                        <span className="font-medium text-white">{s.city}</span>
                        <span className="text-[11px] text-mute font-mono">({s.country_code})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-mute">{s.nodes} nodes</span>
                        <span className="rounded-md bg-emerald/10 px-2 py-0.5 font-mono text-[11px] text-emerald">
                          {speed(s.mbps)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-y border-line/50 bg-card/40 py-8 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{servers.length}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-mute">Global Regions</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-cyan md:text-4xl">{totalNodes}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-mute">Dedicated Nodes</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-blue md:text-4xl">{speed(peakSpeed)}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-mute">Peak Capacity</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-emerald md:text-4xl">99.98%</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-mute">Uptime SLA</p>
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK SECTION */}
      <section id="network" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1 text-xs font-semibold text-blue">
            High-Performance Backbone
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Optimized Global Server Network
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mute">
            Strategically located bare-metal servers designed for extreme throughput, zero bandwidth throttling, and bulletproof stability.
          </p>
        </div>

        {/* World Map Presentation */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-line bg-card/60 p-8 shadow-2xl backdrop-blur-md">
          <div className="relative flex min-h-[300px] w-full items-center justify-center opacity-85">
            <Image
              src="/world_map.png"
              alt="OctoVVPN Global Coverage Map"
              width={900}
              height={500}
              className="max-h-[420px] w-auto object-contain opacity-75"
            />
          </div>

          {/* Server Cards Horizontal Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servers.map((s) => (
              <div
                key={s.city}
                className="rounded-2xl border border-line bg-ink/70 p-5 backdrop-blur-md transition-all hover:border-blue/60 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{countryFlags[s.country_code] || "🌐"}</span>
                    <h3 className="font-bold text-white">{s.city}</h3>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-emerald">
                    <span className="h-2 w-2 rounded-full bg-emerald" />
                    Online
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-mute">
                  <div className="flex justify-between">
                    <span>Active Nodes</span>
                    <span className="font-semibold text-white">{s.nodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity</span>
                    <span className="font-semibold text-cyan">{speed(s.mbps)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protocol</span>
                    <span className="font-medium text-mute-light">SS + Obfs4</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES BENTO GRID */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full border border-violet/40 bg-violet/10 px-3.5 py-1 text-xs font-semibold text-violet">
            Next-Gen Security
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Engineered For Extreme Privacy &amp; Freedom
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mute">
            Standard VPNs get detected and blocked. OctoVVPN was engineered from the kernel up to defy censorship and surveillance.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/15 text-blue">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">AES-256-GCM Encryption</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Every data byte flowing through your network is secured with authenticating 256-bit Galois/Counter Mode encryption, preventing wiretapping and MITM attacks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/15 text-cyan">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Stealth Obfs4 &amp; Shadowsocks</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Camouflages VPN packets into standard HTTPS web browsing. Defeats Deep Packet Inspection (DPI) and stays connected on networks where WireGuard/OpenVPN are blocked.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-violet">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Strict Zero-Logs Policy</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Your digital footprint remains completely yours. We operate ram-only processing nodes that never record IP addresses, DNS requests, or activity records.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Smart Region Selection</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Dynamic routing algorithms probe latency in real-time to connect you to the fastest server node instantly, with one-click manual region overrides anytime.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Always-On Kill Switch</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Never leak your real IP address. If the VPN connection experiences unexpected disruption, the system instantly halts Internet traffic until the tunnel is re-established.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card rounded-3xl p-8 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/15 text-blue">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">Cross-Platform Sync</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              One account protects all your machines. Native applications designed with synchronized state across Windows PCs and Android devices.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full border border-blue/40 bg-blue/10 px-3.5 py-1 text-xs font-semibold text-blue">
            Simple, Transparent Plans
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Choose Your Protection Level
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mute">
            Get started for free or unlock unlimited bandwidth and priority nodes. All paid subscriptions include our 30-day money-back guarantee.
          </p>
        </div>

        <PricingGrid plans={plans} />
      </section>

      {/* DOWNLOAD SECTION */}
      <section id="download" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-line-bright/60 bg-gradient-to-br from-card via-[#0e163b] to-ink p-8 shadow-2xl md:p-14">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Get Started with OctoVVPN Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-mute">
              Available now on Windows and Android. Create your free account right inside the client application.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Windows Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink/80 p-8">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/20 text-blue">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.551L24 0v11.551H10.949V1.898zM0 12.451h9.75V21.9L0 20.551v-8.1zM10.949 12.451H24V24l-13.051-1.898V12.451z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Windows Application</h3>
                      <p className="text-xs text-mute">Windows 10 / 11 (64-bit)</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-mono font-semibold text-blue border border-blue/20">
                    v1.9
                  </span>
                </div>
                <p className="mt-4 text-sm text-mute-light leading-relaxed">
                  Includes full stealth obfuscation driver, auto-updater, and emergency kill-switch integration.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={WIN}
                  className="btn-primary flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Setup (16.8 MB)</span>
                </a>
              </div>
            </div>

            {/* Android Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink/80 p-8">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/20 text-emerald">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a2.023 2.023 0 01-.61-1.464V3.278c0-.564.223-1.09.609-1.464zm11.314 11.314l2.127 2.127-10.979 6.34 8.852-8.467zm2.127-2.128L14.923 8.87l-8.852-8.467 10.979 6.34 2.127 2.127zm.92 1.055l3.208 1.853c.895.517.895 1.362 0 1.879l-3.208 1.853-2.316-2.316 2.316-2.316z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Android Application</h3>
                      <p className="text-xs text-mute">Android 8.0 and above</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald border border-emerald/20">
                    Google Play
                  </span>
                </div>
                <p className="mt-4 text-sm text-mute-light leading-relaxed">
                  Fast mobile connection with low battery footprint, auto-reconnect, and quick settings tile support.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={PLAY}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white"
                >
                  <span>Open on Google Play</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (IF ANY) */}
      {quotes.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">What Users Say</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q.author} className="rounded-2xl border border-line bg-card p-6 shadow-md">
                <blockquote className="text-sm leading-relaxed text-mute-light">“{q.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-medium text-white">
                  {q.author} <span className="font-normal text-mute">({q.detail})</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <div className="text-center">
          <span className="rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1 text-xs font-semibold text-blue">
            Got Questions?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-mute">
            Everything you need to know about OctoVVPN protocols, privacy, and plans.
          </p>
        </div>

        <FaqSection faqs={faqs} />
      </section>
    </main>
  );
}
