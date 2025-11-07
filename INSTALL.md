# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
  - Comes with Node.js
  - Verify installation: `npm --version`
  
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd ai-interview-coach
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- Firebase SDK
- VAPI SDK
- Google AI SDK
- Tailwind CSS
- And all other dependencies

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your credentials:

### Required Services

#### A. VAPI (Voice AI)
1. Sign up at [vapi.ai](https://vapi.ai)
2. Create a new assistant
3. Copy your Web Token and Workflow ID
4. Add to `.env.local`:
```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_token_here
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id_here
```

#### B. Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env.local`:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

#### C. Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your config from Project Settings > General
6. Add to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

7. For server-side (Admin SDK):
   - Go to Project Settings > Service Accounts
   - Generate new private key
   - Add to `.env.local`:
```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
```

#### D. Application URL
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 4: Set Up Firebase

### Firestore Database Structure

Create the following collections in Firestore:

1. **users**
   - Document ID: user UID
   - Fields: `name`, `email`, `createdAt`

2. **interviews**
   - Document ID: auto-generated
   - Fields: `userId`, `role`, `company`, `personality`, `questions`, `createdAt`, `finalized`

3. **feedback**
   - Document ID: auto-generated
   - Fields: `interviewId`, `userId`, `transcript`, `questionEvaluations`, `summaryFeedback`, `createdAt`

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /interviews/{interviewId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    match /feedback/{feedbackId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 5: Run the Development Server

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

## Step 6: Verify Installation

1. Open your browser to `http://localhost:3000`
2. You should see the landing page
3. Try signing up with a test account
4. Create a test interview
5. Start an interview to test VAPI connection

## Troubleshooting

### Common Issues

#### 1. VAPI Connection Fails
**Error**: "Failed to start interview" or 400 Bad Request

**Solutions**:
- Verify your VAPI_WEB_TOKEN is correct
- Check that your VAPI assistant is properly configured
- Ensure you have credits in your VAPI account
- Check browser console for detailed error messages

#### 2. Firebase Authentication Errors
**Error**: "Firebase: Error (auth/...)"

**Solutions**:
- Verify all Firebase environment variables are correct
- Ensure Email/Password authentication is enabled in Firebase Console
- Check that your Firebase project is on the Blaze (pay-as-you-go) plan if using server-side features

#### 3. Gemini API Errors
**Error**: "API key not valid"

**Solutions**:
- Verify your GOOGLE_GENERATIVE_AI_API_KEY is correct
- Ensure you have enabled the Gemini API in Google Cloud Console
- Check your API quota and billing

#### 4. Build Errors
**Error**: Module not found or TypeScript errors

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### 5. Environment Variables Not Loading
**Error**: Variables are undefined

**Solutions**:
- Ensure `.env.local` is in the root directory
- Restart the development server after changing env variables
- Check that variable names start with `NEXT_PUBLIC_` for client-side access
- Verify no extra spaces or quotes in `.env.local`

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Check the terminal/server logs
3. Review the [Next.js documentation](https://nextjs.org/docs)
4. Review the [Firebase documentation](https://firebase.google.com/docs)
5. Review the [VAPI documentation](https://docs.vapi.ai)

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_BASE_URL` to your production URL
5. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Railway
- Render

Ensure you:
- Set all environment variables
- Use Node.js 18+
- Configure build command: `npm run build`
- Configure start command: `npm start`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run type checking
npm run type-check
```

## Next Steps

After successful installation:
1. Review the [README.md](./README.md) for project overview
2. Check [FEATURES.md](./FEATURES.md) for detailed feature documentation
3. Review [docs/use-cases.md](./docs/use-cases.md) for usage examples
4. Explore the codebase starting with `/app` and `/components`

## Support

For additional help:
- Open an issue on GitHub
- Review existing documentation in `/docs`
- Check `/lib/prompts` for AI prompt configurations
