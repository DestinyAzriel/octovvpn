# OctoVVPN — Hostinger Deployment Guide

This project is built with **Next.js 15 (App Router)** using **standalone output** mode, which packages only the files needed to run the server — perfect for Hostinger Business Node.js hosting.

---

## Prerequisites

- Hostinger **Business** web hosting plan (yours is active ✅)
- Domain `octovvpn.net` already added to hPanel ✅
- Node.js **18 or higher** selected in hPanel
- Supabase project set up with `supabase/schema.sql` applied

---

## Step 1: Build the Project Locally

On your machine, run:

```bash
npm install
npm run build
```

This generates a `.next/standalone/` folder that contains the self-contained server.

---

## Step 2: Prepare Files for Upload

After `npm run build`, you need to upload these **3 items** from your project:

| Source (local) | Destination (on Hostinger) |
|---|---|
| `.next/standalone/` | Upload entire folder contents to your site root |
| `.next/static/` | Upload to `public_html/.next/static/` |
| `public/` | Upload to `public_html/public/` |

> **Important:** Do NOT upload `node_modules/` — standalone mode includes only what's needed inside `.next/standalone/node_modules/`.

---

## Step 3: Set Up Node.js App in hPanel

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. Go to **Websites** → click **Manage** next to `octovvpn.net`
3. In the left sidebar click **Web Apps** → select your site
4. Under the **Node.js** section:
   - **Node.js version**: `20.x` (LTS recommended)
   - **Entry point / Startup file**: `server.js`
   - **Application root**: `/home/<your_user>/public_html` (or wherever your site root is)
5. Click **Save** / **Restart**

---

## Step 4: Set Environment Variables

In hPanel → **Web Apps** → **Environment Variables** (or via the `.env` file in your site root), add:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_PLAY_URL=https://play.google.com/store/apps/details?id=net.octovvpn.app
NEXT_PUBLIC_WINDOWS_URL=/downloads/OctoVVPN-Windows-v1.7.exe
NODE_ENV=production
PORT=3000
```

> ⚠️ Never commit `.env` to Git. Use hPanel's environment variable panel or create `.env` directly on the server via SSH/File Manager.

---

## Step 5: Upload Files via File Manager or FTP

### Option A — hPanel File Manager (easiest)
1. In hPanel → **Files** → **File Manager**
2. Navigate to `public_html/` (your site root for `octovvpn.net`)
3. Delete any existing placeholder files (e.g. `index.html`)
4. Upload the contents of `.next/standalone/` directly into `public_html/`
5. Inside `public_html/`, create folder `.next/static/` and upload your local `.next/static/` into it
6. Create/upload `public/` folder with your local `public/` contents

### Option B — FTP (FileZilla)
1. In hPanel → **Files** → **FTP Accounts**, create an FTP account
2. Connect with FileZilla using the credentials
3. Mirror the same folder structure as Option A

---

## Step 6: Restart the Node.js App

1. In hPanel → **Web Apps** → click **Restart** on your Node.js app
2. Wait ~30 seconds for startup
3. Visit `https://octovvpn.net` — your site should be live!

---

## Step 7: Supabase Database Setup

If you haven't already:

1. Open your Supabase project dashboard → **SQL Editor**
2. Paste and run the full contents of `supabase/schema.sql`
3. This seeds your pricing plans, server nodes, and FAQ data

To update content (pricing, servers, FAQs), use the Supabase **Table Editor** — the site auto-revalidates within 60 seconds.

---

## Step 8: SSL Certificate

Hostinger Business hosting provides **free automatic SSL** for all domains:

1. In hPanel → **Security** → **SSL**
2. Check that `octovvpn.net` has SSL active (green padlock)
3. If not, click **Install SSL** — it's free via Let's Encrypt

---

## Updating the Site (After Changes)

Whenever you push new code:

1. Run `npm run build` locally
2. Re-upload `.next/standalone/`, `.next/static/`, and `public/` (overwrite existing)
3. In hPanel → **Web Apps** → **Restart**

### Git-Based Auto-Deploy (Optional)
If Hostinger enables Git deployment for your plan:
1. hPanel → **Git** → connect your GitHub repo (`DestinyAzriel/octovvpn`)
2. Set branch to `main`, root to `public_html/`
3. Add a post-receive hook: `npm install && npm run build`

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Blank page / 500 error | Check Node.js version is 18+; confirm `server.js` exists in root |
| Missing styles | Confirm `.next/static/` was uploaded to `public_html/.next/static/` |
| Missing images | Confirm `public/` was uploaded to `public_html/public/` |
| Env vars not loading | Add `.env` file to `public_html/` OR use hPanel env variable panel |
| App not starting | In hPanel → Web Apps → check the error log |
