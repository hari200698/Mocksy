# Installation & Setup Guide

## Prerequisites

- Node.js 18+ installed
- Firebase project created
- Google Gemini API key

## Setup

1. **Environment Variables**
   - Copy `.env.example` to `.env.local` and fill in all required values
   - **Windows users**: Keep `FIREBASE_PRIVATE_KEY` as a single line with `\n` (not actual newlines)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   ```
   - Opens at http://localhost:3000

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## Authentication

- The app expects a Firebase session cookie named `__session`
- Sign-in flow sets the cookie; server verifies it with `firebase-admin`
- If session is missing or invalid, users are redirected to `/sign-in`

## Firestore

- **Composite Index**: The first complex query will show a console link to create a composite index
  - Index fields: `userId` ASC, `questionId` ASC, `attemptNo` DESC
  - Click the link in the console to create it automatically

## Security

- Apply Firestore security rules via Firebase Console or CLI
  - See `firebase.rules` file in the project root
  - Deploy rules: `firebase deploy --only firestore:rules`

## Troubleshooting

- **"project_id missing"**: Check that all `FIREBASE_*` environment variables are set correctly
- **"undefined in where()"**: Ensure the user is signed in before querying attempts




