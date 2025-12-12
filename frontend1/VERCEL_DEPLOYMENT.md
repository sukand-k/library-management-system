# Vercel Deployment Guide

## Steps to Deploy Frontend on Vercel

### 1. **Prepare Your Project**
The frontend is now configured for Vercel deployment.

### 2. **Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
cd frontend1
vercel
```

#### Option B: Using GitHub
1. Push your code to GitHub
2. Go to https://vercel.com
3. Sign in with your GitHub account
4. Click "New Project"
5. Select your repository
6. Click "Import"

### 3. **Configure Environment Variables**

In your Vercel dashboard:
1. Go to your project settings
2. Click "Environment Variables"
3. Add: `REACT_APP_API_URL` = `https://your-backend-url.com/api/`
   - Replace `your-backend-url.com` with your actual backend URL

### 4. **Backend Setup**

You need to deploy your backend first. Options:
- **Heroku** (free tier available)
- **Railway** (https://railway.app)
- **Render** (https://render.com)
- **AWS/Azure** (paid)

### 5. **CORS Configuration**

Update your backend `server.js` to allow Vercel domain:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://your-vercel-domain.vercel.app'],
  credentials: true
}));
```

### 6. **Files Created/Updated**
- ✅ `.env` - Local development configuration
- ✅ `.env.production` - Production configuration
- ✅ `vercel.json` - Vercel configuration
- ✅ `src/api/axios.js` - Updated for environment variables

### 7. **Important Notes**
- Do NOT commit `.env` file to Git
- Update `.env.production` with your actual backend URL before deploying
- Ensure your backend is publicly accessible
- Update CORS in backend to include your Vercel domain

### 8. **After Deployment**
Your app will be live at: `https://your-app-name.vercel.app`

For details, visit: https://vercel.com/docs
