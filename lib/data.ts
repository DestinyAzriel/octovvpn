import { createClient } from "@supabase/supabase-js";
export const ANNUAL_DISCOUNT = 0.2; // annual billing saving; change here
export type Plan = { name: string; price: number; badge: string | null; features: string[] };
export type Server = { city: string; country_code: string; nodes: number; mbps: number; status: "online" | "degraded" | "offline" };
export type Faq = { q: string; a: string };
export type Quote = { quote: string; author: string; detail: string };

// Server-only client (service key never reaches the browser). Returns null until env vars are set.
export const db = () =>
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } })
    : null;

async function list<T>(table: string, fallback: T[]): Promise<T[]> {
  const c = db();
  if (!c) return fallback;
  const { data, error } = await c.from(table).select("*").eq("published", true).order("sort");
  return error || !data?.length ? fallback : (data as T[]);
}

const PLANS: Plan[] = [
  { name: "Stealth", price: 0, badge: null, features: ["Valid for 7 days", "$1 card confirmation fee", "1 device connection", "3 server regions", "10 GB data transfer", "Stealth obfuscation"] },
  { name: "Phantom", price: 6.99, badge: null, features: ["3 devices", "All 4 regions", "100 GB per month", "Kill switch", "Ad blocker"] },
  { name: "Specter", price: 12.99, badge: "Most popular", features: ["6 devices", "Priority on all regions", "Unlimited data", "Smart region select", "Full security suite"] },
  { name: "Elite", price: 24.99, badge: "Best value", features: ["Unlimited devices", "Dedicated node option", "Unlimited bandwidth", "24/7 live chat", "Dedicated manager"] },
];
const SERVERS: Server[] = [
  { city: "Singapore", country_code: "SG", nodes: 2, mbps: 274, status: "online" },
  { city: "US West", country_code: "US", nodes: 3, mbps: 210, status: "online" },
  { city: "Frankfurt", country_code: "DE", nodes: 3, mbps: 1000, status: "online" },
  { city: "Sydney", country_code: "AU", nodes: 1, mbps: 150, status: "online" },
];
export const getPlans = () => list<Plan>("plans", PLANS);
export const getServers = () => list<Server>("servers", SERVERS);
export const getFaqs = () => list<Faq>("faqs", []);
export const getQuotes = () => list<Quote>("testimonials", []); // empty until you add real, verifiable reviews
