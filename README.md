# DreamPix 🎨

<div align="center">

![DreamPix Banner](https://via.placeholder.com/1200x400/0a0b14/6366f1?text=DreamPix+%E2%80%94+AI-Powered+Image+Transformation)

**Transform your images with the power of AI**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-AI-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

[Live Demo](#) · [Report Bug](https://github.com/yourusername/dreampix/issues) · [Request Feature](https://github.com/yourusername/dreampix/issues)

</div>

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Architecture](#-architecture)
5. [Getting Started](#-getting-started)
6. [Environment Variables](#-environment-variables)
7. [Project Structure](#-project-structure)
8. [Core Modules](#-core-modules)
9. [AI Transformations](#-ai-transformations)
10. [Credits System](#-credits-system)
11. [Deployment](#-deployment)
12. [Contributing](#-contributing)
13. [License](#-license)

---

## 🌟 Overview

**DreamPix** is a full-stack AI SaaS platform that enables users to perform advanced image transformations using Cloudinary's generative AI capabilities. Built with Next.js 14, it combines a modern glassmorphic UI with powerful backend services to deliver a seamless image editing experience.

Whether you're restoring damaged photos, removing unwanted objects, or generating creative fills — DreamPix handles it all with just a few clicks.

> **Built for placement demos and production use.** DreamPix showcases real-world patterns including authentication, webhooks, payment integration, cloud storage, and AI APIs.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure sign-up and sign-in via **Clerk**
- Social login support (Google, GitHub)
- Protected routes and session management
- Automatic user creation via Clerk webhooks

### 🖼️ AI Image Transformations
| Feature | Description |
|---|---|
| **Image Restore** | Revive old or damaged photos by removing noise and imperfections |
| **Generative Fill** | Extend image dimensions using AI outpainting with custom aspect ratios |
| **Object Remove** | Precisely remove unwanted objects or people from images |
| **Object Recolor** | Replace the color of any object within an image |
| **Background Remove** | Cleanly extract subjects from their backgrounds |

### 🏠 Community Showcase
- Browse AI-transformed images from all users
- Advanced search by image content and objects
- Paginated collection with smooth navigation

### 💳 Credits System
- Users start with free credits on sign-up
- Credit deduction per transformation
- Purchase additional credits via **Stripe**
- Three tiered plans: Free, Pro, Premium

### 👤 User Profile
- Personal dashboard with transformation history
- Credit balance display
- Image management (view, update, delete)

### 📱 Responsive Design
- Mobile-first glassmorphic UI
- Dark/Light mode toggle with system preference detection
- Collapsible sidebar on desktop
- Mobile navigation drawer

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** — React framework with App Router and Server Components
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling with custom design tokens
- **[Shadcn/UI](https://ui.shadcn.com/)** — Accessible component primitives
- **[next-cloudinary](https://next.cloudinary.dev/)** — Cloudinary integration for Next.js

### Backend
- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** — Type-safe server-side mutations
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** — Cloud-hosted NoSQL database
- **[Mongoose](https://mongoosejs.com/)** — MongoDB object modeling

### Services
- **[Clerk](https://clerk.com/)** — Authentication and user management
- **[Cloudinary](https://cloudinary.com/)** — AI image transformations and cloud storage
- **[Stripe](https://stripe.com/)** — Payment processing for credit purchases

---

## 🏗️ Architecture

```
DreamPix
├── Client (Next.js App Router)
│   ├── Server Components (data fetching, SSR)
│   └── Client Components (interactivity, forms)
│
├── Server Actions (lib/actions/)
│   ├── image.actions.ts    — CRUD + Cloudinary search
│   └── user.actions.ts     — User management + credits
│
├── API Routes (app/api/)
│   ├── webhooks/clerk      — Auto user creation on signup
│   └── webhooks/stripe     — Credit top-up on payment
│
├── Database (MongoDB Atlas)
│   ├── users collection
│   ├── images collection
│   └── transactions collection
│
└── External Services
    ├── Cloudinary (AI transformations + storage)
    ├── Clerk (auth + webhooks)
    └── Stripe (payments + webhooks)
```

### Data Flow
1. User uploads image → stored in Cloudinary under `dreampix/` folder
2. User applies transformation → Cloudinary AI processes it
3. User saves result → metadata stored in MongoDB
4. Credits deducted → user balance updated in real-time
5. User can browse, download, update, or delete their transformations

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v18.17 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/dreampix.git
cd dreampix
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Fill in your credentials (see [Environment Variables](#-environment-variables)).

**4. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# ───────────────────────────────────────────
# NEXT.JS
# ───────────────────────────────────────────
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# ───────────────────────────────────────────
# MONGODB
# Get from: https://cloud.mongodb.com
# ───────────────────────────────────────────
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dreampix

# ───────────────────────────────────────────
# CLERK
# Get from: https://clerk.com → Your App → API Keys
# ───────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ───────────────────────────────────────────
# CLOUDINARY
# Get from: https://cloudinary.com → Dashboard
# ───────────────────────────────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ───────────────────────────────────────────
# STRIPE
# Get from: https://dashboard.stripe.com → Developers → API Keys
# ───────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
```

### Service Setup Guides

<details>
<summary><b>MongoDB Atlas Setup</b></summary>

1. Create a free account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a new cluster (free tier is sufficient)
3. Go to **Database Access** → Add a new user with read/write permissions
4. Go to **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere)
5. Click **Connect** → **Connect your application** → copy the connection string
6. Replace `<password>` with your actual password in the URI

</details>

<details>
<summary><b>Cloudinary Setup</b></summary>

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. From the Dashboard, copy your **Cloud Name**, **API Key**, and **API Secret**
3. Go to **Settings → Upload → Upload Presets**
4. Click **Add upload preset**:
   - Preset name: `jsm_dreampix`
   - Signing mode: `Unsigned`
   - Asset folder: `dreampix`
5. Save the preset

</details>

<details>
<summary><b>Clerk Setup</b></summary>

1. Create an app at [clerk.com](https://clerk.com)
2. Copy the **Publishable Key** and **Secret Key** from API Keys
3. For webhooks (production only):
   - Go to **Webhooks** → **Add Endpoint**
   - URL: `https://yourdomain.com/api/webhooks/clerk`
   - Subscribe to: `user.created`, `user.updated`, `user.deleted`
   - Copy the **Signing Secret** as `WEBHOOK_SECRET`

> **Note:** Webhooks require a public URL. For local development, manually insert users into MongoDB. For production on Vercel, use your deployment URL.

</details>

<details>
<summary><b>Stripe Setup</b></summary>

1. Create an account at [stripe.com](https://stripe.com)
2. Copy **Publishable Key** and **Secret Key** from Developers → API Keys
3. For webhooks (production only):
   - Go to **Webhooks** → **Add Endpoint**
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Subscribe to: `checkout.session.completed`
   - Copy the **Signing Secret** as `STRIPE_WEBHOOK_SECRET`

> **Note:** Use Stripe test mode keys during development.

</details>

---

## 📁 Project Structure

```
dreampix/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/    # Clerk sign-in page
│   │   └── sign-up/[[...sign-up]]/    # Clerk sign-up page
│   ├── (root)/
│   │   ├── credits/                   # Buy credits page
│   │   ├── profile/                   # User profile & history
│   │   ├── transformations/
│   │   │   ├── add/[type]/            # New transformation form
│   │   │   └── [id]/
│   │   │       ├── page.tsx           # Transformation detail view
│   │   │       └── update/            # Edit transformation
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Home / community feed
│   ├── api/
│   │   └── webhooks/
│   │       ├── clerk/route.ts         # Clerk webhook handler
│   │       └── stripe/route.ts        # Stripe webhook handler
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── shared/
│   │   ├── Collection.tsx             # Image grid with pagination
│   │   ├── CustomField.tsx            # React Hook Form field wrapper
│   │   ├── DeleteConfirmation.tsx     # Delete image dialog
│   │   ├── Header.tsx                 # Page header component
│   │   ├── InsufficientCreditsModal.tsx
│   │   ├── MediaUploader.tsx          # Cloudinary upload widget
│   │   ├── MobileNav.tsx              # Mobile header + drawer
│   │   ├── Search.tsx                 # Debounced search input
│   │   ├── Sidebar.tsx                # Desktop navigation sidebar
│   │   ├── ThemeContext.tsx           # Dark/light mode provider
│   │   ├── TransformationForm.tsx     # Main transformation form
│   │   └── TransformedImage.tsx       # Transformed image display
│   └── ui/                            # Shadcn UI components
│
├── constants/
│   └── index.ts                       # Nav links, plans, transformation types
│
├── lib/
│   ├── actions/
│   │   ├── image.actions.ts           # Image CRUD + Cloudinary search
│   │   ├── transaction.action.ts      # Stripe checkout + transaction creation
│   │   └── user.actions.ts            # User CRUD + credit management
│   ├── database/
│   │   ├── models/
│   │   │   ├── image.model.ts         # Image Mongoose schema
│   │   │   ├── transaction.model.ts   # Transaction Mongoose schema
│   │   │   └── user.model.ts          # User Mongoose schema
│   │   └── mongoose.ts                # MongoDB connection with caching
│   └── utils.ts                       # Helpers: cn, debounce, download, etc.
│
├── public/
│   └── assets/
│       ├── icons/                     # SVG icons
│       └── images/                    # Logo and static images
│
├── types/
│   └── index.d.ts                     # Global TypeScript declarations
│
├── middleware.ts                      # Clerk auth middleware
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🧩 Core Modules

### Database Models

**User**
```typescript
{
  clerkId: string        // Clerk user ID (unique)
  email: string          // User email (unique)
  username: string       // Username (unique)
  firstName: string
  lastName: string
  photo: string          // Profile photo URL
  planId: number         // 1 = Free, 2 = Pro, 3 = Premium
  creditBalance: number  // Available credits (default: 10)
}
```

**Image**
```typescript
{
  title: string
  transformationType: string   // restore | fill | remove | recolor | removeBackground
  publicId: string             // Cloudinary public ID
  secureURL: string            // Original image URL
  transformationUrl: string    // Transformed image URL
  width: number
  height: number
  config: object               // Cloudinary transformation config
  aspectRatio?: string
  prompt?: string
  color?: string
  author: ObjectId             // Reference to User
}
```

**Transaction**
```typescript
{
  stripeId: string      // Stripe checkout session ID
  amount: number        // Amount paid in USD
  plan: string          // Plan purchased
  credits: number       // Credits added
  buyer: ObjectId       // Reference to User
  createdAt: Date
}
```

---

## 🤖 AI Transformations

All transformations are powered by **Cloudinary's AI API**. Each transformation costs **1 credit**.

| Transformation | Cloudinary Effect | Use Case |
|---|---|---|
| Image Restore | `e_enhance`, `e_restore` | Fix old/damaged photos |
| Generative Fill | `e_gen_fill` | Extend image canvas with AI-generated content |
| Object Remove | `e_gen_remove` | Remove objects, people, or blemishes |
| Object Recolor | `e_gen_recolor` | Change the color of specific objects |
| Background Remove | `e_background_removal` | Isolate subjects from backgrounds |

### How Transformations Work

```
1. User uploads image
   └── Stored in Cloudinary under dreampix/ folder

2. User configures transformation
   └── Form builds a Cloudinary transformation config object

3. User clicks "Apply Transformation"
   └── CldImage component applies the config as URL parameters
   └── Cloudinary processes image on-the-fly via their AI pipeline

4. User clicks "Save Image"
   └── getCldImageUrl() generates the final transformation URL
   └── Image metadata saved to MongoDB
   └── 1 credit deducted from user balance
```

---

## 💰 Credits System

DreamPix uses a credit-based system to manage API usage costs.

### Plans

| Plan | Price | Credits | Features |
|---|---|---|---|
| **Free** | $0 | 20 | Basic access |
| **Pro** | $40 | 120 | Full access + Priority Support |
| **Premium** | $199 | 2000 | Full access + Priority Support + Priority Updates |

### Credit Flow

```
New User Signs Up
└── 10 free credits granted (via MongoDB default)

User Applies Transformation
└── creditFee = -1 applied via updateCredits()
└── MongoDB: { $inc: { creditBalance: -1 } }

User Purchases Credits
└── Stripe Checkout Session created
└── User redirected to Stripe payment page
└── On success: Stripe webhook fires
└── createTransaction() called
└── creditBalance incremented by purchased amount
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

**1. Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

**2. Import to Vercel**
- Go to [vercel.com](https://vercel.com) → New Project
- Import your GitHub repository
- Add all environment variables from `.env.local`
- Change `NEXT_PUBLIC_SERVER_URL` to your Vercel deployment URL
- Deploy

**3. Set up Webhooks (Production)**

After deployment, update webhook URLs:

- **Clerk**: `https://your-app.vercel.app/api/webhooks/clerk`
- **Stripe**: `https://your-app.vercel.app/api/webhooks/stripe`

Update `WEBHOOK_SECRET` and `STRIPE_WEBHOOK_SECRET` in Vercel environment variables.

**4. Verify MongoDB Network Access**
- Ensure `0.0.0.0/0` is in your MongoDB Atlas Network Access list

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code patterns and naming conventions
- Use TypeScript strictly — no `any` unless absolutely necessary
- Keep components small and focused on a single responsibility
- Server Actions for all data mutations
- Client Components only where interactivity is required

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [JavaScript Mastery](https://www.youtube.com/@javascriptmastery) — Original project inspiration
- [Cloudinary](https://cloudinary.com) — AI image transformation APIs
- [Clerk](https://clerk.com) — Authentication infrastructure
- [Shadcn/UI](https://ui.shadcn.com) — UI component library
- [Vercel](https://vercel.com) — Deployment platform

---

<div align="center">

Made with ❤️ by **Ayush Sharma**

⭐ Star this repo if you found it helpful!

</div>