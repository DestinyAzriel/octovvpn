"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpeqjzj";

export default function AffiliateForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    platformUrl: "",
    channelType: "YouTube / Video Creator",
    audienceReach: "5,000 – 25,000",
    payoutMethod: "Cryptocurrency (USDT / BTC)",
    contactHandle: "",
    promotionPlan: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New OctoVVPN Affiliate Application: ${formData.fullName} (${formData.channelType})`,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(", "));
        } else {
          setErrorMessage("Something went wrong while submitting. Please try again.");
        }
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error occurred. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      platformUrl: "",
      channelType: "YouTube / Video Creator",
      audienceReach: "5,000 – 25,000",
      payoutMethod: "Cryptocurrency (USDT / BTC)",
      contactHandle: "",
      promotionPlan: "",
    });
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald/40 bg-card/90 p-8 md:p-12 text-center backdrop-blur-xl shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/20 text-emerald shadow-lg shadow-emerald/10">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="mt-6 inline-block rounded-full border border-emerald/30 bg-emerald/10 px-3.5 py-1 text-xs font-semibold text-emerald">
          Application Received
        </span>
        <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
          Thank you, {formData.fullName.split(" ")[0] || "Partner"}!
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-mute leading-relaxed">
          Your affiliate partnership application has been sent directly to our team. We review submissions manually and will reply to <span className="font-semibold text-white">{formData.email}</span> with your bespoke tracking assets within 24–48 hours.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleReset}
            className="btn-secondary rounded-xl px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-mute hover:text-white transition-all cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300 flex items-start gap-3">
          <svg className="h-5 w-5 shrink-0 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold">Unable to submit application</p>
            <p className="mt-1 text-xs text-red-300/90">{errorMessage || "Please check your information and try again."}</p>
          </div>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
            Full Name / Contact Person <span className="text-blue">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Alex Morgan"
            className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white placeholder-mute/50 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
            Business / Work Email <span className="text-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@example.com"
            className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white placeholder-mute/50 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Platform URL & Channel Type */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="platformUrl" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
            Primary Channel / Website URL <span className="text-blue">*</span>
          </label>
          <input
            id="platformUrl"
            name="platformUrl"
            type="url"
            required
            value={formData.platformUrl}
            onChange={handleChange}
            placeholder="https://youtube.com/@yourchannel or website"
            className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white placeholder-mute/50 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="channelType" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
            Platform / Audience Type
          </label>
          <select
            id="channelType"
            name="channelType"
            value={formData.channelType}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors cursor-pointer"
          >
            <option value="YouTube / Video Creator" className="bg-[#0d1533] text-white">YouTube / Video Creator</option>
            <option value="Tech / Privacy Blogger" className="bg-[#0d1533] text-white">Tech / Privacy Blogger</option>
            <option value="Telegram / Community Admin" className="bg-[#0d1533] text-white">Telegram / Community Admin</option>
            <option value="Review / Comparison Site" className="bg-[#0d1533] text-white">Review / Comparison Site</option>
            <option value="Social Media / Influencer (X, IG, TikTok)" className="bg-[#0d1533] text-white">Social Media / Influencer (X, IG, TikTok)</option>
            <option value="Podcast / Media Network" className="bg-[#0d1533] text-white">Podcast / Media Network</option>
            <option value="Other Media / Publisher" className="bg-[#0d1533] text-white">Other Media / Publisher</option>
          </select>
        </div>
      </div>

      {/* Row 3: Audience Reach & Preferred Payout */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="audienceReach" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
            Monthly Audience / Reach
          </label>
          <select
            id="audienceReach"
            name="audienceReach"
            value={formData.audienceReach}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors cursor-pointer"
          >
            <option value="Under 5,000" className="bg-[#0d1533] text-white">Under 5,000</option>
            <option value="5,000 – 25,000" className="bg-[#0d1533] text-white">5,000 – 25,000</option>
            <option value="25,000 – 100,000" className="bg-[#0d1533] text-white">25,000 – 100,000</option>
            <option value="100,000 – 500,000" className="bg-[#0d1533] text-white">100,000 – 500,000</option>
            <option value="500,000+" className="bg-[#0d1533] text-white">500,000+</option>
          </select>
        </div>

        <div>
          <label htmlFor="payoutMethod" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
            Preferred Payout Method
          </label>
          <select
            id="payoutMethod"
            name="payoutMethod"
            value={formData.payoutMethod}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors cursor-pointer"
          >
            <option value="Cryptocurrency (USDT / BTC)" className="bg-[#0d1533] text-white">Cryptocurrency (USDT / BTC)</option>
            <option value="Direct Bank Transfer / Wire" className="bg-[#0d1533] text-white">Direct Bank Transfer / Wire</option>
            <option value="PayPal" className="bg-[#0d1533] text-white">PayPal</option>
          </select>
        </div>
      </div>

      {/* Row 4: Instant Messenger handle */}
      <div>
        <label htmlFor="contactHandle" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
          Telegram / Discord Handle <span className="text-mute text-[10px] font-normal lowercase">(optional, for fast direct communication)</span>
        </label>
        <input
          id="contactHandle"
          name="contactHandle"
          type="text"
          value={formData.contactHandle}
          onChange={handleChange}
          placeholder="@yourusername on Telegram or Discord"
          className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white placeholder-mute/50 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors"
        />
      </div>

      {/* Row 5: Promotion Plan / Notes */}
      <div>
        <label htmlFor="promotionPlan" className="block text-xs font-semibold uppercase tracking-wider text-mute-light">
          Promotional Strategy &amp; Notes
        </label>
        <textarea
          id="promotionPlan"
          name="promotionPlan"
          rows={3}
          value={formData.promotionPlan}
          onChange={handleChange}
          placeholder="Briefly describe how you plan to feature OctoVVPN (e.g. dedicated review video, newsletter banner, article guide, Telegram pin, etc.)"
          className="mt-2 w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-white placeholder-mute/50 focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "submitting" ? (
            <>
              <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <span>Submit Partner Application</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
        <p className="mt-3 text-center text-[11px] text-mute">
          By applying, you agree to OctoVVPN partner terms. We typically respond within 24–48 business hours.
        </p>
      </div>
    </form>
  );
}
