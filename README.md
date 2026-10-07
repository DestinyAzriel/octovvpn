# OctoVVPN site (Next.js + Supabase)
The site is for information and downloads. Accounts, subscriptions and payments happen inside the apps. Affiliate enquiries go to the email on /affiliates.
1. Create a free Supabase project and run `supabase/schema.sql` in its SQL Editor.
2. Copy `.env.example` to `.env.local` and fill in SUPABASE_URL and SUPABASE_SERVICE_KEY (Project Settings > API, service_role key). Set NEXT_PUBLIC_WINDOWS_URL to your Windows installer link.
3. `npm install && npm run dev`
4. Push to GitHub, import in Vercel, add the same env vars, then point octovvpn.net DNS (at Hostinger) to Vercel.
Edit plans, servers (including status), FAQs, testimonials and info pages in the Supabase Table Editor; the site updates within a minute.
Keep plan names and prices in the `plans` table the same as in the app.
## Before launch
The privacy, terms, refund, cookie and GDPR pages are starter drafts. Have them reviewed and make sure they match what your servers actually log and how you actually bill. Confirm the support email in lib/pages.ts and the `faqs` table. Change the annual discount in lib/data.ts if it is not 20%.
