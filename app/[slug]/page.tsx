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
    description: p ? `Read the official OctoVVPN ${p.title.toLowerCase()}.` : undefined,
  };
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
    <main className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mute hover:text-white transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="rounded-3xl border border-line-bright/50 bg-card/80 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-line/60 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {p.title}
          </h1>
          {slug === "status" && (
            <span className="flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
              <span className="h-2 w-2 rounded-full bg-emerald animate-ping" />
              Live Telemetry
            </span>
          )}
        </div>

        {/* Content paragraphs */}
        <div className="mt-8 space-y-5 text-base leading-relaxed text-mute-light">
          {p.body.split("\n\n").map((text, i) => (
            <p key={i} className="whitespace-pre-line">
              {text}
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
