# OctoVVPN Deployment & Hostinger DNS Guide

This project is built with **Next.js 15 (App Router)** and connects directly to **Supabase** with automatic 60-second caching revalidation.

---

## Step 1: Deploy to Vercel

### Method A: Deploy via GitHub (Recommended)
1. Create a repository on GitHub (e.g. `octovvpn-site`).
2. Link your local project and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/octovvpn-site.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new) and click **Import** next to `octovvpn-site`.
4. Under **Environment Variables**, add:
   - `SUPABASE_URL`: Your Supabase Project URL (`https://xyz.supabase.co`)
   - `SUPABASE_SERVICE_KEY`: Your Supabase Service Role Key
   - `NEXT_PUBLIC_PLAY_URL`: `https://play.google.com/store/apps/details?id=net.octovvpn.app`
   - `NEXT_PUBLIC_WINDOWS_URL`: `/downloads/OCTOVVPN-Setup-v1.9.exe` *(or your external CDN installer link)*
5. Click **Deploy**. Vercel will build and assign you a URL (e.g., `octovvpn-site.vercel.app`).

---

## Step 2: Connect Hostinger Domain to Vercel

If your domain `octovvpn.net` is registered with or hosted on **Hostinger**:

### 1. In Vercel Project Dashboard:
1. Navigate to **Project Settings > Domains**.
2. Enter your domain: `octovvpn.net` (and check the box to automatically redirect `www.octovvpn.net` to `octovvpn.net`).
3. Vercel will show the recommended DNS records:
   - **Type A** record for `@`
   - **Type CNAME** record for `www`

### 2. In Hostinger hPanel:
1. Log into your [Hostinger Dashboard (hPanel)](https://hpanel.hostinger.com).
2. Go to **Domains** > select **octovvpn.net** > click **DNS / Nameservers**.
3. Under the **Manage DNS records** section:
   - **Add/Edit A Record**:
     - **Type**: `A`
     - **Name / Host**: `@`
     - **Points to**: `76.76.21.21` *(Vercel Anycast IP)*
     - **TTL**: `3600` (or default)
   - **Add/Edit CNAME Record**:
     - **Type**: `CNAME`
     - **Name / Host**: `www`
     - **Points to**: `cname.vercel-dns.com`
     - **TTL**: `3600`
4. Save the DNS records.
5. In Vercel, click **Refresh** or **Verify**. Within a few minutes (DNS propagation), Vercel will automatically provision a free global SSL certificate (HTTPS) and your site will be live at `https://octovvpn.net`!

---

## Step 3: Supabase Database Setup
1. In your Supabase project dashboard, open the **SQL Editor**.
2. Run the script located in `supabase/schema.sql`.
3. To update pricing plans, add new server nodes, change status (online / degraded / offline), or edit FAQs, simply use the Supabase **Table Editor**. The site revalidates and reflects changes automatically within 60 seconds!
