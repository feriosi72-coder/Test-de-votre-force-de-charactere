# ForceVie - Character Strengths Assessment

A modern, interactive web application that helps users discover and assess their personal character strengths using the VIA Character Strengths framework. Respond to 72 carefully crafted questions to identify your top character strengths and unlock insights into your potential.

## Features

- **Interactive Questionnaire**: 72 questions covering 24 character strengths across cognitive, emotional, and social dimensions
- **Smart Scoring**: Advanced scoring algorithm that computes percentile rankings and validates responses
- **Results Dashboard**: Visual presentation of your top strengths with detailed descriptions and insights
- **Data Persistence**: Optional profile saving with name and email
- **Responsive Design**: Beautiful, modern interface that works on desktop and mobile devices
- **Dark Mode Support**: Clean aesthetic with thoughtful visual hierarchy

## Character Strengths Assessed

The assessment evaluates 24 character strengths organized into three dimensions:

**Cognitive Strengths:** Curiosity, Creativity, Judgment, Love of Learning, Perspective

**Emotional Strengths:** Bravery, Perseverance, Honesty, Zest, Appreciation of Beauty

**Social Strengths:** Love, Kindness, Social Intelligence, Teamwork, Fairness, Leadership, Forgiveness, Humility, Prudence, Self-Regulation, Gratitude, Hope, Humor, Spirituality

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- Supabase (database)

## Quick Start

### Installation

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Environment Setup

Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

1. Click "Begin Assessment" to start
2. Answer 72 questions on a 1-5 scale
3. Save your profile (optional)
4. View your top character strengths with detailed insights
5. Restart to take the assessment again

## Project Structure

```
src/
├── components/          # UI components
├── data/               # Questions & strength definitions
├── lib/                # Supabase client
├── utils/              # Scoring algorithm
├── types/              # TypeScript interfaces
└── App.tsx             # Main component

supabase/migrations/    # Database schema
```

## Database

Results are securely stored in Supabase with:
- User name and email
- 72 question responses
- Computed strength scores
- Percentile rankings

## Available Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

## Browser Support

Chrome/Edge 90+, Firefox 88+, Safari 14+, Mobile browsers

## License

MIT
