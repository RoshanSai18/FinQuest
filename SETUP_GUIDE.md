# FinQuest 2.0 - Google OAuth Setup Guide

## ✅ Completed Integration

I've successfully integrated Google OAuth authentication with a sample Dashboard. Here's what was implemented:

### Frontend Changes
1. **Dashboard Component** ([Dashboard.jsx](frontend/src/components/Dashboard.jsx))
   - Modern financial dashboard with stats, transactions, and goals
   - User profile display with avatar
   - Logout functionality
   - Responsive design with animations

2. **App.jsx Updates**
   - Added authentication state management
   - Added `handleGoogleLogin()` function to redirect to Google OAuth
   - Added `handleChange()` for form input handling
   - Added `handleLogout()` for user logout
   - Updated `handleAuthSubmit()` to work with backend API
   - Added `useEffect` to check authentication status on page load
   - Conditional rendering: Dashboard shows only when user is authenticated

### Backend Updates
1. **Updated Google OAuth callback URL** to `/auth/google/callback`
2. **Fixed `/auth/current_user` endpoint** to return JSON properly
3. **Updated redirect URLs** to redirect to root (`http://localhost:3000`) after auth

## 🚀 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/finquest
PORT=5000
NODE_ENV=development
SESSION_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if not already done
6. Select **Web application** as application type
7. Add these **Authorized redirect URIs**:
   - `http://localhost:5000/auth/google/callback`
8. Copy **Client ID** and **Client Secret** to `.env` file

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
mongod

# Or if using MongoDB as a service, it should already be running
```

### 4. Start Backend Server

```bash
cd backend
npm start
```

Server should start on `http://localhost:5000`

### 5. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend should start on `http://localhost:3000`

## 🧪 Testing the Authentication

### Test Google OAuth:
1. Open `http://localhost:3000`
2. Click **"Get Started"** or **"Log in"**
3. Click **"Sign in with Google"** button
4. Complete Google authentication
5. You'll be redirected back and see the Dashboard

### Test Email/Password Auth:
1. Click **"Get Started"** for signup
2. Fill in name, email, password
3. Click **"Create Account"**
4. You should see confetti and then the Dashboard

### Test Logout:
1. When logged in to Dashboard
2. Click the **"Logout"** button in top-right
3. You'll be redirected to landing page

## 📁 Project Structure

```
frontend/src/
├── components/
│   ├── Dashboard.jsx          ← NEW: Sample dashboard (only shows when authenticated)
│   ├── UIComponents.jsx       ← Existing UI components
│   └── ...
└── App.jsx                     ← Updated with auth logic

backend/
├── config/
│   ├── db.js
│   └── googleAuth.js          ← Updated callback URL
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js          ← Updated endpoints
└── server.js
```

## 🔧 Key Features Implemented

✅ Google OAuth 2.0 integration
✅ Email/Password authentication
✅ Session management with Passport.js
✅ Protected Dashboard route
✅ User profile display
✅ Logout functionality
✅ Sample financial dashboard with:
  - Account stats (Balance, Savings, Expenses, Investments)
  - Recent transactions list
  - Financial goals with progress bars
  - Quick action buttons

## 🎯 Next Steps

The Dashboard is currently a sample with mock data. You can now:
1. Connect to real financial data APIs
2. Add more dashboard features (charts, analytics)
3. Implement transaction management
4. Add budget creation/tracking
5. Build the "What-If Simulator" feature
6. Add AI-powered insights with Gemini AI

## 🐛 Troubleshooting

### "Google Auth Failed"
- Check if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set correctly
- Verify redirect URI is added to Google Console

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod` or check service status
- Check MONGO_URI in `.env` file

### "CORS Error"
- Backend CORS is configured for `http://localhost:3000`
- Make sure frontend is running on port 3000

### Session Not Persisting
- Check SESSION_SECRET in `.env`
- Ensure cookies are enabled in browser
- Verify `credentials: 'include'` in fetch requests
