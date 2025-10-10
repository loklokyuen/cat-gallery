# Cat Gallery 🐈

Discover and filter cat photos, save a profile, and try email login/signup backed by Firebase Auth and Firestore.

## Features
- Browse cat images with pagination, sort order, and breed filtering.
- Highlight the currently selected cat.
- Email/password signup or login with optional avatar and cat-liking level.
- Guest browsing without an account.
- Firestore user document creation on first login.
- Responsive UI built with Material UI and Vite.

## Tech
- React 19 + Vite
- React Router 7
- MUI 6
- Firebase Auth + Firestore
- The Cat API (image data)

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create environment file** at the project root (e.g. `.env.local`) with:
   ```bash
   VITE_CAT_API_URL=https://api.thecatapi.com/v1
   VITE_CAT_API_KEY=your_cat_api_key

   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   The Cat API key is free to obtain at https://thecatapi.com. Use your Firebase project settings for the remaining values.
3. **Run the dev server**
   ```bash
   npm run dev
   ```
4. **Open the app** at the URL shown in the console (default `http://localhost:5173`).

## Usage Notes
- Email auth requires Firebase configuration; guest browsing works without it.
- New users have a Firestore `users/{uid}` document created with profile details and timestamps.
- Environment variables must be prefixed with `VITE_` to be available in the client.

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
