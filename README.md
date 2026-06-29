# 📚 Fable – Premium Ebook Sharing Platform

Fable is a premium digital literature ecosystem built on the MERN stack using **Next.js 14+ (App Router)** and **Express.js**. The platform seamlessly bridges the gap between avid readers, literary collectors, and independent authors. It offers immersive book browsing, interactive role-based dashboards, instant stripe payment verification, and real-time analytical insights.

---

## 🚀 Live Links & Credentials

* **Live Deployment:** [👉 Click Here to Visit Fable](https://your-vercel-live-link.vercel.app)
* **Client Repository:** [GitHub Frontend Link](https://github.com/your-username/fable-client)
* **Server Repository:** [GitHub Backend Link](https://github.com/your-username/fable-server)

### 🔑 Demo Admin Credentials:
* **Email:** `admin@gamil.com`
* **Password:** `Admin@123`

---

## ✨ Key Features

### 🔐 1. Next-Gen Authentication & Hybrid RBAC
* **Secure Auth:** Integrated modern credential and Google OAuth flow utilizing **BetterAuth** and JWT architecture with 7-day token persistence.
* **Role Selection:** Dynamic post-registration onboarding where users can switch between **Reader (User)** and **Writer** roles.

### 🎨 2. Premium Cinematic UI/UX (No Gobindo Design)
* **Dynamic Hero Carousel:** Seamless slider using pure **Framer Motion (`AnimatePresence`)** for elegant context-aware accent highlights.
* **Scroll & Hover Physics:** Fluid staggered animations, image scaling tricks, and glassmorphic micro-interactions to please modern tech recruiters.

### 💳 3. Multi-Tier Stripe Monitization Flow
* **Writers Pro Subscriptions:** Automated publishing monetization module. Upgrades writers from `free` to `pro` instantly inside MongoDB.
* **Ebook Purchase Architecture:** Secure checkout sessions via Stripe. Converts items to 'Sold' seamlessly with access locks dynamically detached for specific buyers.

### 🔍 4. Advance Exploration Engine
* **Multifaceted Search:** Deep real-time text matching by *Book Title* or *Writer Name*.
* **Granular Filtering:** Instant categorization by genre grid, structured price boundaries, and stock availability statuses.
* **Smart Sorting & Pagination:** Configured layout sorting rules (Price Low-to-High, High-to-Low, Newest Release) accompanied by clean navigation breaks.

### 📊 5. Specialized Multi-Role Dashboards
* **Admin Desk:** Complete analytical reporting charts (Ebooks by Genre, Monthly Revenues), structural user management panels, and uniform transaction ledger lookups.
* **Writer Suite:** Full CRUD functionalities on personal listings (Create with **imgBB** API, Edit, Delete, Toggle Publish/Unpublish status), plus detailed customer payout lines.
* **Reader Hub:** Custom transaction tabular records, immediate entry points into digital purchases, and dedicated bookmark shelves.

---

## 🛠️ Tech Stack & Packages Used

### Frontend (Client-Side)
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **State & Core Utilities:** BetterAuth, `jose-cjs` (JWT handling), `next-themes` (Dark Mode Persist), `lucide-react` (Premium Icons)

### Backend (Server-Side)
* **Runtime:** Node.js with Express.js
* **Database:** MongoDB Atlas (Native Driver Architecture)
* **Payments:** Stripe Node API
* **Security & Utility:** `cors`, `dotenv`, `jose-cjs` (Remote JWKS Verification Middleware)

---