# CineVerse

An AI-powered movie discovery and tracking platform with cinematic UI, curated collections, and personalized recommendations. Built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-3-ff7300?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square)

## Live Demo

**[cineverse-beige-phi.vercel.app](https://cineverse-beige-phi.vercel.app)**

## Features

- **Cinematic Landing Page** — Full-screen hero with film grain texture overlay, vignette lighting effects, and typewriter AI summaries
- **Trending Carousel** — Horizontal scroll-snap carousel with glassmorphism navigation arrows and curtain-lift hover reveals
- **AI Recommendations** — Personalized "Your Next Watch" cards with animated match percentages and taste-based reasoning
- **Genre Explorer** — Interactive genre filter pills with animated grid layout transitions powered by Framer Motion
- **Curated Collections** — Themed film collections (Mind-Bending Sci-Fi, Feel-Good Comfort, Edge-of-Seat Thrillers, Cinematic Masterpieces)
- **My Library** — Personal watchlist with filter/sort/search, animated stat counters, and three Recharts visualizations (genre pie, monthly bar, rating distribution)
- **Film Detail Pages** — Dynamic routes with cinematic hero backdrops, interactive 5-star rating with bounce animations, AI analysis with typewriter effect, and cast carousel
- **AI Picks** — Mood-based film picker, "Because You Watched" recommendations, and radar chart taste profile
- **Responsive Design** — Mobile-first with slide-in navigation drawer and touch-friendly carousels
- **Cinematic Noir Theme** — Deep black/charcoal base with violet and electric blue accents, gold ratings, editorial serif/sans typography contrast
- **Page Transitions** — AnimatePresence route transitions with Framer Motion
- **Custom Scrollbar** — Thin violet scrollbar on dark track across the app

## Screenshots

![Discover](/screenshots/discover.png)
![Library](/screenshots/library.png)
![Film Detail](/screenshots/film-detail.png)
![AI Picks](/screenshots/ai-picks.png)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/donnywin85/cineverse.git
cd cineverse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
cineverse/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts, navbar, page transitions
│   │   ├── page.tsx            # Discover page (cinematic landing)
│   │   ├── library/page.tsx    # My Library with stats and charts
│   │   ├── film/[id]/page.tsx  # Film detail (dynamic route)
│   │   └── ai-picks/page.tsx   # AI recommendations and mood picker
│   ├── components/
│   │   ├── navigation/         # Navbar with mobile drawer
│   │   └── ui/                 # StarRating, TypewriterText, FilmCard,
│   │                           # Carousel, SectionHeader, LoadingSkeleton
│   └── lib/
│       ├── types.ts            # TypeScript type definitions
│       ├── data.ts             # 20 mock films, collections, user data
│       └── utils.ts            # Utility functions
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with custom theme (CSS `@theme` blocks)
- **Charts**: Recharts 3 (pie, bar, radar)
- **Animations**: Framer Motion 12 (scroll-triggered, layout, page transitions)
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings) + Manrope (body) via next/font
- **Deployment**: Vercel
