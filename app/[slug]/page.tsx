import { notFound } from "next/navigation";
import Link from "next/link";
import { db, getServers } from "@/lib/data";
import { PAGES } from "@/lib/pages";

export const revalidate = 60;

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  const { slug } = await params;
  const p = PAGES[slug];
  return {
    title: p ? `${p.title} — OctoVVPN` : "OctoVVPN",
    description: p ? `Read official OctoVVPN ${p.title.toLowerCase()}.` : undefined,
  };
}

function formatParagraph(text: string) {
  // Turn email addresses and URLs into clickable links
  const tokenRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="font-semibold text-blue underline decoration-blue/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          {part}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue underline decoration-blue/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white inline-flex items-center gap-1"
        >
          {part}
          <svg className="inline-block h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    return part;
  });
}

export default async function InfoPage({ params }: P) {
  const { slug } = await params;
  let p: { title: string; body: string } | undefined = PAGES[slug];
  if (!p) notFound();

  const { data } =
    (await db()?.from("pages").select("title,body").eq("slug", slug).eq("published", true).maybeSingle()) ?? {};
  if (data) p = data;

  const servers = slug === "status" ? await getServers() : null;

  return (
    <main className="relative mx-auto max-w-4xl px-6 pt-2 pb-16 md:pt-4 md:pb-24">
      <div className="rounded-3xl border border-line-bright/50 bg-card/80 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue">
              OctoVVPN Official
            </span>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {p.title}
            </h1>
          </div>

          {slug === "status" && (
            <span className="flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-3.5 py-1.5 text-xs font-semibold text-emerald">
              <span className="h-2 w-2 rounded-full bg-emerald animate-ping" />
              Live Telemetry
            </span>
          )}

          {slug === "contact" && (
            <span className="flex items-center gap-2 rounded-full border border-blue/40 bg-blue/10 px-3.5 py-1.5 text-xs font-semibold text-blue">
              <span className="h-2 w-2 rounded-full bg-blue" />
              24/7 Support Desk
            </span>
          )}
        </div>

        {/* Special Quick Action Box for Contact Support */}
        {slug === "contact" && (
          <div className="mt-8 rounded-2xl border border-blue/40 bg-blue/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                  Primary Customer &amp; Billing Support
                </p>
                <a
                  href="mailto:support@octovvpn.com"
                  className="mt-1 block text-2xl md:text-3xl font-extrabold text-white hover:text-blue transition-colors"
                >
                  support@octovvpn.com
                </a>
                <p className="mt-2 text-sm text-mute">
                  Average response time: &lt; 12 hours. Monitored 24/7 across all time zones.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:support@octovvpn.com"
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue/20"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61594801065744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line-bright bg-ink/80 px-5 py-3 text-sm font-semibold text-white hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 transition-colors"
                >
                  <svg className="h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Official Facebook
                </a>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="mt-6 grid gap-4 border-t border-blue/20 pt-6 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-ink/60 p-4">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Technical Help</p>
                <p className="mt-1 text-xs text-mute">Connection troubleshooting, firewall bypass, and app setup.</p>
              </div>
              <div className="rounded-xl border border-line bg-ink/60 p-4">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Billing &amp; Refunds</p>
                <p className="mt-1 text-xs text-mute">Subscription upgrades, invoice copies, and 30-day guarantees.</p>
              </div>
              <div className="rounded-xl border border-line bg-ink/60 p-4">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Partnerships</p>
                <p className="mt-1 text-xs text-mute">
                  Creator inquiries and rev-share. Or see our{" "}
                  <Link href="/affiliates" className="text-cyan underline">
                    Affiliates
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Special Quick Action Box for Delete Account */}
        {slug === "delete-account" && (
          <div className="mt-8 rounded-2xl border border-line bg-ink/70 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Data Erasure Request Desk
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  Send your request directly to support@octovvpn.com
                </p>
                <p className="mt-1 text-xs text-mute">
                  Please email from the exact address registered to your account to confirm ownership.
                </p>
              </div>
              <a
                href="mailto:support@octovvpn.com?subject=Delete%20Account%20Request&body=Please%20permanently%20delete%20my%20OctoVVPN%20account%20associated%20with%20this%20email%20address."
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
              >
                Draft Deletion Email
              </a>
            </div>
          </div>
        )}

        {/* Content paragraphs */}
        <div className="mt-8 space-y-5 text-base leading-relaxed text-mute-light">
          {p.body.split("\n\n").map((text, i) => (
            <p key={i} className="whitespace-pre-line">
              {formatParagraph(text)}
            </p>
          ))}
        </div>

        {/* Status table if server status page */}
        {servers && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-ink/70">
            <div className="border-b border-line/60 bg-ink/90 px-6 py-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Global Gateway Nodes
              </h2>
            </div>
            <ul className="divide-y divide-line/60">
              {servers.map((s) => (
                <li key={s.city} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-card/50">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
                    <div>
                      <p className="font-semibold text-white">{s.city}</p>
                      <p className="text-xs text-mute">{s.country_code} • {s.nodes} {s.nodes === 1 ? "Node" : "Nodes"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-md bg-emerald/10 px-2.5 py-1 text-xs font-mono font-semibold text-emerald">
                      {s.status.toUpperCase()}
                    </span>
                    <p className="mt-1 text-xs font-mono text-mute">{s.mbps >= 1000 ? `${(s.mbps / 1000).toFixed(0)} Gbps` : `${s.mbps} Mbps`}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
