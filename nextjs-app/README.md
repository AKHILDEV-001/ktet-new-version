# KTET Quiz Website - Next.js Migration

## Phase 1: Project Infrastructure ✅

This is a Next.js 15 project with App Router, migrated from a legacy HTML/JS quiz website.

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (with custom animations from legacy)
- **Backend:** Firebase (Auth, Firestore, Storage)
- **AI Integration:** OpenRouter API
- **Payments:** Razorpay
- **Language:** JavaScript

### Getting Started

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Environment Variables

Copy the template and fill in your credentials:

```bash
cp .env.local .env.local.backup
```

Then edit `.env.local` with your actual Firebase, OpenRouter, and Razorpay credentials.

**Required Environment Variables:**

- `NEXT_PUBLIC_FIREBASE_*` - Firebase client config
- `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` - Firebase Admin SDK
- `OPENROUTER_API_KEY` - For AI question generation and explanations
- `RAZORPAY_KEY_*` - Payment processing

#### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure

```
nextjs-app/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles + legacy animations
├── lib/                   # Utility libraries
│ ├── firebase.js          # Firebase client config
│   └── firebase-admin.js  # Firebase Admin SDK
├── public/                # Static assets
└── .env.local             # Environment variables (not in git)
```

### Design System

The Tailwind configuration has been customized to match the legacy design system:

**Primary Colors:**
- Purple theme: `#8b5cf6`, `#7c3aed`, `#9333ea`, `#7e22ce`
- Custom gradient animations
- Modal and quiz interface animations preserved

**Animations:**
- All legacy animations from `animations.css` imported
- Modal transitions
- Quiz option effects
- Confetti celebrations
- Gradient text effects

### Migration Status

#### Phase 1: Project Initialization & Infrastructure ✅
- [x] Next.js project initialized with App Router
- [x] Tailwind CSS configured with legacy design system
- [x] Firebase dependencies installed
- [x] Firebase client configuration created
- [x] Firebase admin configuration created
- [x] Environment variables structure defined
- [x] Custom animations imported from legacy
- [x] Development server ready

#### Upcoming Phases
- Phase 2: Authentication & User Context
- Phase 3: Static Content & SEO Migration
- Phase 4: Quiz Engine Implementation
- Phase 5: Backend API Migration
- Phase 6: Dashboard & Analytics
- Phase 7: Payment Gateway Integration
- Phase 8: Admin & Feedback System

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Notes

- Legacy CSS animations have been preserved and imported into `globals.css`
- Firebase configuration supports both service account JSON and individual credentials
- Purple theme (#8b5cf6) is the primary brand color
- Custom animations for modals, quiz options, and celebrations are ready to use

### Legacy Assets Location

The original legacy files are located in the parent directory:
- `/css/` - Original stylesheets
- `/css/animations.css` - Animation definitions (now in globals.css)
- `/data/questions.json` - Question bank
- `website context .jsom` - Migration plan and feature analysis
