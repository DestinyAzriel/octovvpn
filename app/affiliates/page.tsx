import Link from "next/link";

export const metadata = {
  title: "Affiliate & Partner Program — OctoVVPN",
  description: "Monetize your audience by partnering with OctoVVPN. Competitive rev-share commissions, marketing collateral, and dedicated manager.",
};

const EMAIL = "Zorse@phonekiss.onmicrosoft.com";

export default function Affiliates() {
  return (
    <main className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mute hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="text-center md:text-left">
        <span className="rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1 text-xs font-semibold text-blue">
          Growth Partnership
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Partner with OctoVVPN
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-mute leading-relaxed">
          Help your community safeguard their digital freedom. Earn recurring commission on every subscriber you refer with zero caps.
        </p>
      </div>

      {/* Perk Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/20 text-blue font-bold">
            %
          </div>
          <h3 className="mt-4 text-base font-bold text-white">Generous Rev-Share</h3>
          <p className="mt-2 text-sm text-mute leading-relaxed">
            Competitive recurring commissions on all initial orders and plan renewals.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/20 text-cyan">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-bold text-white">High Conversion</h3>
          <p className="mt-2 text-sm text-mute leading-relaxed">
            Frictionless onboarding with free tier and instant cross-device apps converts leads faster.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/20 text-emerald">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-bold text-white">Prompt Payouts</h3>
          <p className="mt-2 text-sm text-mute leading-relaxed">
            Reliable monthly payouts directly to your preferred bank account, crypto, or PayPal.
          </p>
        </div>
      </div>

      {/* Application CTA Card */}
      <div className="mt-12 rounded-3xl border border-line-bright/60 bg-card p-8 md:p-10 shadow-xl">
        <h2 className="text-2xl font-bold text-white">Submit Your Partnership Request</h2>
        <p className="mt-3 text-sm text-mute leading-relaxed">
          Tell us about your audience, publication, YouTube channel, blog, or community size. Our team will review your enquiry and provide customized trackable links within 24–48 hours.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${EMAIL}?subject=OctoVVPN%20Affiliate%20Partnership%20Application`}
            className="btn-primary flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email Partnership Team ({EMAIL})</span>
          </a>
        </div>

        <div className="mt-8 border-t border-line/50 pt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-mute">Partnership Principles &amp; Guidelines</h4>
          <ul className="mt-3 space-y-2 text-xs text-mute-light list-disc pl-5">
            <li>Accurate representations only: No claims of guaranteed bypass without disclaimers, and no fake-review claims.</li>
            <li>Zero tolerance for spam, unconsented email blasts, or brand bidding on OctoVVPN search keywords.</li>
            <li>Transparent cookie attribution window (30-day tracking cookie).</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
