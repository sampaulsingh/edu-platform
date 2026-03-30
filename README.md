# EduPro Starter

A production-oriented educational website starter built with Next.js and Firebase.

## Included
- Student login (email/password + Google)
- Student dashboard
- Course listing and course detail pages
- Lesson completion tracking
- Quiz flow with pass/fail logic
- PDF certificate generation
- YouTube lesson embedding
- Custom-domain-ready deployment notes

## Best deployment choice
Use **Vercel + Firebase** for this version.
- Vercel hosts the Next.js app.
- Firebase handles Authentication and Firestore.
- Connect your personal domain in Vercel.

## Why not GitHub Pages for this version?
GitHub Pages is static hosting only, so it is suitable for brochure-style sites or simple course pages, but not the full login/dashboard architecture in this starter.

## Setup
1. Create a Firebase project.
2. Enable Authentication:
   - Email/Password
   - Google
3. Create a Firestore database.
4. Add a `courses` collection with documents like:

```json
{
  "title": "Physics Basics",
  "description": "Introduction to core physics concepts.",
  "lessons": [
    {
      "id": "l1",
      "title": "Motion and speed",
      "durationMinutes": 12,
      "videoUrl": "https://www.youtube.com/embed/VIDEO_ID"
    }
  ],
  "quiz": {
    "passMark": 1,
    "questions": [
      {
        "id": "q1",
        "question": "Speed is distance divided by?",
        "options": ["Force", "Time", "Mass", "Energy"],
        "correctIndex": 1
      }
    ]
  }
}
```

5. Copy `.env.example` to `.env.local` and fill in your Firebase values.
6. Install dependencies:

```bash
npm install
```

7. Run locally:

```bash
npm run dev
```

## Production hardening you should add next
- Move from client-only auth checks to **Firebase Admin session cookies**.
- Add an **admin panel** for creating courses and quizzes.
- Add **rate limiting** and analytics.
- Brand the PDF certificate with your logo/signature.
- Add email notifications and password reset UX.
- Add SEO metadata and sitemap.

## Deploy to Vercel
1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Add your environment variables.
4. Deploy.
5. In Vercel project settings, add your custom domain.

## Alternative deployment
You can also deploy the app on Firebase App Hosting or Firebase Hosting with an appropriate build setup, but Vercel is usually the simplest path for a Next.js app.
