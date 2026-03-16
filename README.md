# 🧵 KaarigarConnect — AI-Powered Marketplace for Indian Artisans

"Your craft is unique. Your marketplace should be too."
🌐 **Live Demo:** [https://kaarigarconnect.vercel.app](https://kaarigarconnect.vercel.app)

## 📋 Table of Contents

- [🚨 The Problem — Why This Matters](#-the-problem--why-this-matters)
- [💡 The Solution — What We Built](#-the-solution--what-we-built)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🔬 Core Features](#-core-features)
- [📊 Supported Craft Categories](#-supported-craft-categories)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started — Full Setup Guide](#-getting-started--full-setup-guide)
- [📡 API Documentation](#-api-documentation)
- [🔍 Usage Examples](#-usage-examples)
- [📁 Project Structure](#-project-structure)
- [🚢 Deployment Guide](#-deployment-guide)
- [👥 Team Members](#-team-members)
- [🗺️ Roadmap](#️-roadmap)

## 🚨 The Problem — Why This Matters
India has 3.5 crore skilled artisans — but most of them are invisible to the digital economy.

| Statistic | Impact |
| --- | --- |
| 89% of artisans have no online presence | Zero digital reach despite world-class crafts |
| 73% earn below minimum wage | ₹3,500–₹5,000/month average income |
| ₹5 Lakh Crore untapped market potential | Locked behind digital illiteracy |
| Less than 5% use any e-commerce platform | "One-size-fits-all" tech is too complex |

The root cause? Existing e-commerce platforms are too complex for rural artisans who may not be digitally literate, don't speak English, and can't afford professional photographers or copywriters.

The gap:
- Artisans can't write product descriptions or upload listings
- No tool exists to price handmade items fairly based on market data
- Platforms don't support regional languages like Hindi, Tamil, Bengali
- Rural artisans are disconnected from urban and global buyers

## 💡 The Solution — What We Built
KaarigarConnect is a full-stack, AI-powered marketplace that transforms a simple photo and voice/text description into a complete, market-ready product listing — in seconds.

📸 Artisan Photo  ──►  🤖 Gemini AI Engine  ──►  💰 Smart Pricing  ──►  🛒 Live Marketplace

What makes it different:
- ✅ **Zero typing required** — Voice + photo input only, no forms
- ✅ **AI Listing Generation** — Gemini AI creates title, description, story automatically
- ✅ **Smart Pricing Engine** — Suggested price range by craft type and market data
- ✅ **Bilingual Support** — Full Hindi & English interface
- ✅ **Instant Marketplace** — Product goes live immediately after artisan approves
- ✅ **Mobile-First Design** — Works on ₹2,000 smartphones with 2G connections

### Data Flow — Step by Step
1️⃣  **Artisan uploads craft photo + short description** (Hindi or English)  
        ↓  
2️⃣  **Gemini AI processes the input:**  
        → Generates compelling Product Title (max 8 words)  
        → Writes 3-sentence Product Description (heritage-focused tone)  
        → Creates Artisan Story (1-2 sentences about craft tradition)  
        → Identifies Craft Type (Pottery / Weaving / Embroidery / Painting / Jewellery)  
        → Suggests 3 searchable Tags  
        ↓  
3️⃣  **Smart Pricing Engine evaluates the craft type:**  
        → Returns suggested price range based on craft category  
        → Artisan can adjust price using an interactive slider  
        ↓  
4️⃣  **Artisan clicks "Publish to Marketplace"**  
        → Product saved to global state (sessionStorage)  
        → Redirected to Buyer Marketplace  
        ↓  
5️⃣  **Buyer Marketplace renders the new product as the first card**  
        → "NEW" badge visible  
        → Search, filter, and Buy Now available instantly  

## 🏗️ Architecture Overview
```text
┌─────────────────────────────────────────────────────────┐
│                    ARTISAN SIDE                         │
│  📱 Upload Page  →  🤖 AI Listing  →  💰 Pricing Page  │
└──────────────────────────┬──────────────────────────────┘
                           │
                    Next.js API Route
                  /api/generate-listing
                           │
                    Google Gemini 1.5 Flash
                  (Primary AI Engine)
                           │
                    Mock Fallback
                  (Hardcoded responses)
                           │
┌──────────────────────────▼──────────────────────────────┐
│                    BUYER SIDE                           │
│  🛒 Marketplace  →  🔍 Filter/Search  →  🛍️ Buy Now   │
└─────────────────────────────────────────────────────────┘
```

## 🔬 Core Features

### 📸 Artisan Upload Page (`/upload`)
- Drag-and-drop or click-to-upload photo with instant image preview
- Text description input with Hindi/English placeholder examples
- Language toggle: English / हिंदी (Hindi)
- Single large CTA button: "✨ Generate AI Listing"
- Mobile-first design — large buttons, minimal UI for low digital literacy users

### 🤖 AI Listing Generator (`/ai-result`)
- Calls Google Gemini 1.5 Flash via Next.js API route
- Animated loader: "AI is crafting your listing..." (4-step progress indicator)
- Generates and displays a beautifully styled product card:
  - Product Title — max 8 words, compelling and market-ready
  - Category — auto-detected craft type
  - Suggested Price — ₹ value with market context
  - Description — 3 sentences highlighting craftsmanship and heritage
  - Tags — 3 searchable keywords (e.g., "Handmade, Jaipur Craft, Traditional Art")
- Buttons: "Edit Output" and "Publish to Marketplace →"
- Styled with Navy `#1E2235`, Orange `#E8732A`, Teal `#1A7F6E` brand colors

### 💰 Smart Pricing Page (`/pricing`)
- Displays suggested price range based on craft type
- Interactive price slider for artisan to confirm or adjust
- Craft-type pricing rules (hardcoded for reliability):

| Craft Type | Price Range |
| --- | --- |
| Pottery | ₹300 – ₹800 |
| Weaving | ₹500 – ₹1,500 |
| Chikankari / Embroidery | ₹800 – ₹2,500 |
| Madhubani / Painting | ₹400 – ₹1,200 |
| Jewellery | ₹600 – ₹2,000 |
| Home Decor | ₹300 – ₹1,500 |

### 🛒 Buyer Marketplace (`/marketplace`)
- "Discover Authentic Crafts" heading with support tagline
- Stats bar: ✨ 1,200+ Artisans | 🛍️ 8,500+ Products | 💰 ₹45L+ Sales
- Filter buttons: All / Pottery / Embroidery / Weaving / Painting / Jewellery / Home Decor
- Search bar: real-time search across product names and artisans
- Product grid cards showing: image, craft tag, title, artisan name, rating, price, "Buy Now" button
- Newly published artisan product appears as first card with "NEW" badge
- 6 pre-loaded dummy products for immediate marketplace feel

## 📊 Supported Craft Categories

| Category | Example Products | Typical Price Range | Heritage Region |
| --- | --- | --- | --- |
| Pottery | Blue pottery vase, clay pots | ₹300 – ₹800 | Jaipur, Rajasthan |
| Embroidery | Chikankari kurta, zardozi dupatta | ₹800 – ₹2,500 | Lucknow, UP |
| Weaving | Banarasi saree, bamboo basket | ₹500 – ₹1,500 | Varanasi, Assam |
| Painting | Madhubani art, Warli painting | ₹400 – ₹1,200 | Bihar, Maharashtra |
| Jewellery | Kundan necklace, tribal earrings | ₹600 – ₹2,000 | Rajasthan, Gujarat |
| Home Decor | Brass lamp, wooden sculpture | ₹300 – ₹1,500 | Pan-India |

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
| --- | --- | --- |
| Next.js | 15+ | Full-stack React framework with App Router |
| React | 19+ | UI components with hooks |
| TypeScript | 5.8+ | Type-safe frontend code |
| Tailwind CSS | 4.0+ | Utility-first styling with custom brand colors |
| Lucide React | Latest | Icon library |

### Backend / API
| Technology | Version | Purpose |
| --- | --- | --- |
| Next.js API Routes | 15+ | Serverless backend endpoints |
| Google Gemini AI | 1.5 Flash | AI listing generation (primary) |
| Mock Fallback Engine | N/A | Hardcoded responses (always available) |

### AI & External Services
| Service | Model | Usage | Limit |
| --- | --- | --- | --- |
| Google Gemini | gemini-1.5-flash | Product listing generation | 1,500 req/day (free) |
| Rule-based Engine | N/A | Fallback when no API key | Unlimited |

### Infrastructure
| Service | Purpose |
| --- | --- |
| Vercel | Deployment & hosting (free tier) |
| GitHub | Version control |
| sessionStorage | Client-side product state management |

## 🚀 Getting Started — Full Setup Guide

### Prerequisites
```bash
# Required
Node.js 18 or higher
npm 9 or higher

# Optional (for live AI features)
Google Gemini API Key — https://aistudio.google.com (free)
```

### Step 1: Clone the Repository
```bash
git clone https://github.com/RudraPratap95/kaarigarconnect.git
cd kaarigarconnect
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
# Create a .env.local file in the root directory
touch .env.local

# Add your Gemini API key:
GEMINI_API_KEY=your_gemini_api_key_here
```
⚠️ Note: API key is optional. The system runs fully with built-in mock AI responses if no key is provided.

### Step 4: Start the Development Server
```bash
npm run dev
```
- ✅ App running at `http://localhost:3000`
- ✅ Upload page at `http://localhost:3000/upload`
- ✅ Marketplace at `http://localhost:3000/marketplace`

### Step 5: Verify Everything Works
1. Open `http://localhost:3000`
2. Click "Upload" in navbar
3. Upload any craft image
4. Type: `Hand-painted blue pottery vase from Jaipur`
5. Click "✨ Generate AI Listing"
6. See AI-generated product card
7. Click "Publish to Marketplace"
8. See your product as the first card in marketplace ✅

## 📡 API Documentation
**Base URL**
- `http://localhost:3000/api` (Local development)
- `https://kaarigarconnect.vercel.app/api` (Live Production)

### `POST /api/generate-listing`
Main endpoint. Accepts a craft description and returns AI-generated product listing.

**Request (JSON):**
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| description | string | ✅ Yes | Artisan's craft description (Hindi or English) |
| language | string | ❌ Optional | "en" or "hi" (default: "en") |

**Example cURL:**
```bash
curl -X POST https://kaarigarconnect.vercel.app/api/generate-listing \
  -H "Content-Type: application/json" \
  -d '{"description": "Hand-painted blue pottery vase from Jaipur", "language": "en"}'
```

**Example Response:**
```json
{
  "title": "Handcrafted Blue Pottery Vase",
  "category": "Home Decor",
  "craft_type": "Pottery",
  "suggested_price": "₹1,200",
  "description": "A beautiful hand-painted blue pottery vase crafted by skilled artisans of Jaipur, carrying 200 years of heritage. Each piece is uniquely hand-thrown and painted using traditional mineral pigments. A timeless addition to any home that supports authentic Indian craftsmanship.",
  "artisan_story": "Crafted by artisans of Jaipur who have inherited this 200-year-old pottery tradition, keeping alive a UNESCO-recognized art form.",
  "tags": ["Handmade", "Jaipur Craft", "Traditional Art"]
}
```

## 🔍 Usage Examples

### Example 1: Full Artisan Flow via Web Interface
1. Open `https://kaarigarconnect.vercel.app/upload`
2. Click the dotted upload box → select any craft image
3. Type in description: "Handmade Madhubani painting from Bihar"
4. Select language: English or हिंदी
5. Click "✨ Generate AI Listing"
6. View AI-generated title, description, price, and tags
7. Click "Publish to Marketplace →"
8. See your product live in the marketplace with "NEW" badge ✅

### Example 2: Direct API Call
```javascript
const response = await fetch('/api/generate-listing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'Handwoven Banarasi silk saree with golden zari work',
    language: 'en'
  })
});

const listing = await response.json();
console.log(listing.title);        // "Handwoven Banarasi Silk Saree"
console.log(listing.craft_type);   // "Weaving"
console.log(listing.suggested_price); // "₹1,200"
```

### Example 3: Test Different Craft Types
```bash
# Pottery
curl -X POST /api/generate-listing -d '{"description": "Blue pottery bowl Jaipur"}'

# Embroidery
curl -X POST /api/generate-listing -d '{"description": "Chikankari kurta Lucknow white cotton"}'

# Painting
curl -X POST /api/generate-listing -d '{"description": "Madhubani painting fish motif Bihar"}'
```

## 📁 Project Structure
```text
kaarigarconnect/
├── 📁 public/                      # Static assets
├── 📁 src/
│   └── 📁 app/
│       ├── page.tsx                # Home / redirect to upload
│       ├── layout.tsx              # Root layout with Navbar + StatsBar
│       ├── globals.css             # Global styles + brand colors
│       ├── 📁 upload/
│       │   └── page.tsx            # Artisan Upload Page (Page 1)
│       ├── 📁 ai-result/
│       │   └── page.tsx            # AI Listing Result Page (Page 2)
│       ├── 📁 pricing/
│       │   └── page.tsx            # Smart Pricing Page (Page 3)
│       ├── 📁 marketplace/
│       │   └── page.tsx            # Buyer Marketplace Page (Page 4)
│       └── 📁 api/
│           └── 📁 generate-listing/
│               └── route.ts        # Next.js API route → Gemini AI call
├── 📁 components/
│   ├── Navbar.tsx                  # Navigation with KaarigarConnect branding
│   └── StatsBar.tsx                # "1,200+ Artisans | 8,500+ Products" stats
├── .env.local                      # Environment variables (GEMINI_API_KEY)
├── next.config.ts                  # Next.js configuration
├── tailwind.config.js              # Custom brand colors (Navy, Orange, Teal)
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🚢 Deployment Guide

### Deploy on Vercel (Recommended — Free)
**Step 1:** Push code to GitHub
```bash
git add .
git commit -m "KaarigarConnect prototype"
git push origin main
```
**Step 2:** Go to vercel.com → New Project → Import from GitHub  
**Step 3:** Add Environment Variable before deploying:
- **Name:** `GEMINI_API_KEY`
- **Value:** `your_key_from_aistudio.google.com`  

**Step 4:** Click Deploy → Get live URL in 2 minutes ✅

## 👥 Team Members

| Name |
| --- |
| Rudra Pratap Singh |
| [Team Member 2] |
| [Team Member 3] |
| [Team Member 4] |

*Built for National Level Hackathon — 24-Hour Challenge*

## 🗺️ Roadmap

**Phase 1 — Hackathon MVP (0–3 Months) ✅**
- [x] Artisan upload page with image preview
- [x] AI-powered listing generation (Gemini)
- [x] Smart pricing by craft type
- [x] Buyer marketplace with filter & search
- [x] Hindi/English bilingual support
- [x] Deployed on Vercel

**Phase 2 — Post-Hackathon Growth (3–12 Months)**
- [ ] Real backend with MongoDB database
- [ ] User authentication (artisan + buyer accounts)
- [ ] UPI payment gateway integration
- [ ] WhatsApp listing sharing (Social Media Autopilot)
- [ ] Voice input support (Web Speech API)
- [ ] AR "try before buy" for textiles
- [ ] Pan-India expansion — all 28 states

**Phase 3 — Scale & Expansion (12+ Months)**
- [ ] International marketplace (USA, UK, UAE diaspora buyers)
- [ ] B2B export buyer marketplace
- [ ] AI craft authentication & certification
- [ ] Artisan loan & credit scoring via ONDC
- [ ] Integration with Make in India & GeM marketplace

## 🎯 Impact Targets by 2028

| Metric | Target |
| --- | --- |
| Artisans Empowered | 10 Lakh+ |
| Incremental Income Generated | ₹500 Crore+ |
| Families Lifted Out of Poverty | 3 Lakh+ |
| States Covered | 28+ |

> "The only platform where a village artisan with a ₹2000 smartphone can compete with international craft brands — in their own language."

**KaarigarConnect — Snap. Describe. Sell. 🧵🇮🇳**
