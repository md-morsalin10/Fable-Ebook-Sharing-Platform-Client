<div align="center">

# 📚 Fable — Ebook Sharing Platform

**A premium full-stack digital platform connecting readers with talented writers.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-E5BA73?style=for-the-badge)](https://fable-ebook-sharing-client.vercel.app)
[![Client Repo](https://img.shields.io/badge/GitHub-Client_Repo-181717?style=for-the-badge&logo=github)](https://github.com/md-morsalin10/Fable-Ebook-Sharing-Platform-Client)
[![Server Repo](https://img.shields.io/badge/GitHub-Server_Repo-181717?style=for-the-badge&logo=github)](https://github.com/md-morsalin10/Fable-Ebook-Sharing-Platform-Server)

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

</div>

---

## 🗂️ Table of Contents

- [Overview](#-overview)
- [Live Links](#-live-links)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [Role-Based Access](#-role-based-access)
- [Payment System](#-payment-system)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [NPM Packages](#-npm-packages)
- [Developer](#-developer)

---

## 🌟 Overview

**Fable** is a full-stack ebook sharing platform built as a course capstone project (A10). It democratizes access to literature by giving emerging writers a global publishing platform and giving readers a curated, immersive reading experience.

The platform features **three distinct user roles**, a **Stripe payment integration**, **Google OAuth**, **real-time role management**, and a **fully animated premium dark UI** — all deployed on Vercel (client) and Render (server).

---

## 🔗 Live Links

| Resource | URL |
|----------|-----|
| 🌐 Live Site | [fable-ebook.vercel.app](https://fable-ebook-sharing-client.vercel.app) |
| 🖥️ Client Repo | [github.com/md-morsalin10/fable-client](https://github.com/md-morsalin10/Fable-Ebook-Sharing-Platform-Client) |
| ⚙️ Server Repo | [github.com/md-morsalin10/fable-server](https://github.com/md-morsalin10/Fable-Ebook-Sharing-Platform-Server) |
| 🔑 Admin Login | `admin@gmail.com` / `Admin@123` |

---

## ✨ Key Features

### 🎨 UI & Experience
- Premium **dark-themed UI** with amber/gold accent colors (`#E5BA73`)
- **Framer Motion** animations — hero fade-in, staggered card reveals, scroll-triggered animations, 3D book cover hover effects
- **Fully responsive** — mobile card layout, tablet/desktop table layout
- Animated **hero slider/carousel** with 3 slides, auto-play, dot navigation & arrow controls
- Skeleton loaders on all data-fetching pages
- Custom **404 error page** with illustration
- Global loading spinner with brand colors

### 🔐 Authentication
- Email/Password login with **JWT** (7-day expiry)
- **Google OAuth** via BetterAuth
- Role selection after registration (Reader or Writer)
- Private route protection — logged-in users stay logged in on reload
- Secure logout clears token and client state

### 👥 Three-Role System
| Role | Dashboard Route |
|------|----------------|
| Reader (User) | `/dashboard/reader` |
| Writer | `/dashboard/writer` |
| Admin | `/dashboard/admin` |

### 📖 Browse & Discovery
- Public browse page — no login required to explore
- **Search** by title or writer name
- **Filter** by genre, price range (min-max slider), availability
- **Sort** by newest, price low→high, price high→low
- **Pagination** — 8 items per page with prev/next/page controls
- Responsive grid — 2 cols mobile, 3 tablet, 4 desktop
- "Sold Out" badge with grayscale effect on sold ebooks
- **Bookmark** any ebook for later reading

### 💳 Payment (Stripe)
- **Ebook Purchase** — Stripe Checkout session → success → purchase record saved → button becomes "Already Purchased"
- **Writer Verification Fee** — one-time $19.99 publishing fee → verified status unlocked
- All transactions logged with type, amount, date

### 📊 Admin Dashboard
- Analytics overview cards — total users, writers, ebooks sold, revenue
- Monthly sales **bar chart**
- Ebooks by genre **pie chart**
- Manage all users — **role change dropdown** (reader/writer/admin), delete
- Manage all ebooks — publish/unpublish, delete
- View all transactions — purchase fees + publishing fees

### ✍️ Writer Dashboard
- Add, edit, delete ebooks
- **imgBB API** image upload for cover images
- Publish / unpublish toggle
- Sales history table — buyer name, date, amount

### 📚 Reader Dashboard
- Purchase history table
- Purchased ebooks gallery — "Read Now" access after purchase
- Bookmarked ebooks gallery
- Profile view

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 15** (App Router) | Full-stack React framework, SSR & SSG |
| **React 19** | UI component library |
| **Tailwind CSS** | Utility-first styling |
| **HeroUI v3** | Premium component library (Table, Dropdown, Avatar, Select) |
| **Gravity UI** | Icons & Label components |
| **Framer Motion** | Page & scroll animations |
| **BetterAuth** | Google OAuth + session management |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API server |
| **MongoDB** | NoSQL database |
| **Stripe** | Payment processing |
| **JWT** | Token-based authentication |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |

### Services
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend deployment |
| **Render** | Backend deployment |
| **MongoDB Atlas** | Cloud database |
| **Stripe** | Payment gateway |
| **imgBB** | Image hosting |

---

## 📁 Project Structure

```
fable-client/
├── app/
│   ├── (root)/
│   │   ├── page.jsx              # Home page
│   │   ├── browse-ebooks/
│   │   │   ├── page.jsx          # Browse page
│   │   │   └── [id]/page.jsx     # Ebook details
│   │   └── dashboard/
│   │       ├── user/             # Reader dashboard
│   │       ├── writer/           # Writer dashboard
│   │       └── admin/            # Admin dashboard
│   ├── login/page.jsx
│   ├── register/page.jsx
│   └── not-found.jsx             # Custom 404
├── components/
│   ├── Banner/                   # Hero slider
│   ├── FeaturedBooks/            # Home featured section
│   ├── Books/BooksCard.jsx       # Reusable book card
│   ├── Dashboard/
│   │   └── Admin/UsersTableClient.jsx
│   ├── Navbar/NavbarProfileDropdown.jsx
│   └── MotionWrapper/FadeIn.jsx  # Animation wrapper
├── lib/
│   ├── auth-client.js            # BetterAuth client
│   └── api/books.js              # API helpers
└── public/

fable-server/
├── index.js                      # Express app + all routes
└── .env                          # MongoDB URI, Stripe keys
```

---

## 🔐 Authentication Flow

```
Register → Choose Role (Reader / Writer)
         → JWT issued → Redirect to Home

Login (Email/Password) → Validate → JWT (7 days) → Redirect
Login (Google)         → BetterAuth OAuth → JWT issued → Redirect

Private Route Reload → JWT verified → Stay logged in ✅
Logout               → Token cleared → Redirect to Home
```

---

## 👥 Role-Based Access

```
Guest       → Home, Browse, Ebook Details (read-only)
Reader      → + Purchase ebooks, Bookmark, Purchase history
Writer      → + Add/Edit/Delete own ebooks, Sales history, Verification payment
Admin       → + Manage all users/ebooks/transactions, Analytics
```

---

## 💳 Payment System

```
Ebook Purchase:
User → "Buy Now" → POST /api/payment/create-checkout-session
     → Stripe Checkout → Success
     → POST /api/payment (save record)
     → Book status = "sold"
     → Button → "Already Purchased"

Writer Verification:
Writer → "Complete Setup" → POST /api/payment/create-checkout-session
       → type: "publishing_fee"
       → Stripe Checkout → Success
       → POST /api/subscription (save record)
       → User.plan = "pro"
```

---

## 📡 API Endpoints

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/books` | Get all books (filter by writerId) |
| `GET` | `/api/books/:id` | Get single book (content gated) |
| `POST` | `/api/books` | Add new book |
| `PATCH` | `/api/books/update/:id` | Edit book |
| `PATCH` | `/api/books/toggle-publish/:id` | Publish/unpublish |
| `DELETE` | `/api/books/delete/:id` | Delete book |

### Users & Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users |
| `PATCH` | `/api/admin/users/role/:id` | Change user role |
| `DELETE` | `/api/admin/users/:id` | Delete user |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/payment` | Get payments (filter by userId/writerId) |
| `POST` | `/api/payment` | Save purchase record |
| `POST` | `/api/subscription` | Save writer subscription |

### Bookmarks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bookmarks` | Get user bookmarks |
| `POST` | `/api/bookmarks/toggle` | Add/remove bookmark |


---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- imgBB API key



---

## 📦 NPM Packages

### Client
```json
{
  "next": "^15.x",
  "react": "^19.x",
  "framer-motion": "^11.x",
  "@heroui/react": "^3.x",
  "@gravity-ui/icons": "^2.x",
  "@gravity-ui/uikit": "^6.x",
  "better-auth": "^1.x",
  "react-hot-toast": "^2.x",
  "stripe": "^16.x"
}
```

### Server
```json
{
  "express": "^4.x",
  "mongodb": "^6.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "stripe": "^16.x"
}
```

---

## 👨‍💻 Developer

<div align="center">

**Md. Morsalin**
*Frontend / MERN Stack Developer*

Diploma in Computer Technology — Dinajpur Polytechnic Institute (2025)
Web Development Training — Programming Hero

[![GitHub](https://img.shields.io/badge/GitHub-md--morsalin10-181717?style=flat-square&logo=github)](https://github.com/md-morsalin10)
[![Portfolio](https://img.shields.io/badge/Portfolio-morsalin--portfolio.vercel.app-E5BA73?style=flat-square)](https://morsalin-portfolio.vercel.app/)

</div>

---

<div align="center">

**Built with ❤️ by Md. Morsalin**

*Next.js · Node.js · MongoDB · Stripe · Framer Motion*

</div>