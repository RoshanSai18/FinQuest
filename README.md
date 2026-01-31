# FinQuest 2.0 - Financial Operating System for Modern Indian Households

A cutting-edge fintech web application designed to help modern Indian households master personal finance through AI-powered simulations, stress-testing, and personalized financial insights.

## 🚀 Tech Stack

### Frontend
- **React 19** + **Vite 6** - Modern build tooling
- **TailwindCSS 3.4.19** - Utility-first CSS
- **Framer Motion 12** - Animation library
- **Three.js 0.182** - 3D graphics
- **Lucide React** + **Iconify** - Icon libraries
- **React Router DOM 7** - Client-side routing

### Backend
- **Node.js** + **Express 5.2** - Server framework
- **MongoDB** + **Mongoose 9.1** - Database
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Social authentication
- **bcryptjs** - Password hashing
- **Express Session** - Session management

## 📦 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or remote)
- Google OAuth credentials
- **Perplexity API Key** (for AI Financial Advisor) - Get it from [Perplexity Settings](https://www.perplexity.ai/settings/api)

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env
# Edit .env and add your credentials:
# - MONGODB_URI (your MongoDB connection string)
# - GOOGLE_CLIENT_ID (from Google Cloud Console)
# - GOOGLE_CLIENT_SECRET (from Google Cloud Console)
# - SESSION_SECRET (any random string)
# - PERPLEXITY_API_KEY (from Perplexity Settings - REQUIRED for Advisor feature)

# Start the server
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

### 3. Configure Google OAuth

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions on setting up Google OAuth credentials.

## ✨ Features

### ✅ Implemented
- **Google OAuth Authentication** - Secure login with Google
- **Email/Password Authentication** - Traditional login system
- **Protected Dashboard** - Only accessible when authenticated
- **User Session Management** - Persistent sessions
- **Responsive Design** - Mobile-first approach
- **Sample Financial Dashboard** with stats, transactions, and goals
- **🤖 AI Financial Advisor** - Powered by Perplexity AI
  - Comprehensive financial health analysis
  - Personalized investment strategies
  - Conversational chat assistant with financial context
  - Multi-user support with database persistence
  - Indian financial context (₹, Lakhs, Crores)

### 🚧 Planned
- What-If Financial Simulator
- AI-Powered Insights (Gemini AI)
- Real-Time Account Tracking
- Smart Budgeting
- Multi-Currency Support

## 🏛️ Project Structure

```
finquest/
├── backend/           # Node.js + Express API
│   ├── config/       # Database & OAuth config
│   ├── controllers/  # Business logic
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   └── middleware/   # Auth middleware
├── frontend/         # React application
│   └── src/
│       ├── components/  # React components
│       │   └── Dashboard.jsx  # Protected dashboard
│       └── App.jsx      # Main component
└── SETUP_GUIDE.md    # Detailed setup instructions
```

## 🔐 Authentication Flow

1. User clicks "Sign in with Google" or enters credentials
2. Backend validates via Passport.js
3. Session created and stored
4. User redirected to Dashboard
5. Dashboard displays user financial data

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/finquest

# Server
PORT=5000
NODE_ENV=development

# Session
SESSION_SECRET=your_random_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Financial Advisor (REQUIRED)
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

**📌 Getting your Perplexity API Key:**
1. Visit [Perplexity Settings](https://www.perplexity.ai/settings/api)
2. Sign in with your account
3. Navigate to API section
4. Click "Generate API Key"
5. Copy the generated key and add it to your `.env` file
6. The server will validate this key on startup and fail with a clear error if missing

## 📚 Documentation

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup & troubleshooting
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`

## 🐛 Troubleshooting

Common issues and solutions in [SETUP_GUIDE.md](SETUP_GUIDE.md#-troubleshooting)

## 🎯 Core Mission

Demystify financial decision-making through interactive scenario simulation and intelligent wealth management tools.

---

**Note**: Dashboard currently displays sample data. Real API integration coming soon.
