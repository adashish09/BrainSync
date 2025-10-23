# ⚡ BrainSync - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Docker (Easiest - Recommended)

```bash
# 1. Clone and navigate
git clone https://github.com/yourusername/brain-sync.git
cd brain-sync

# 2. Start everything with one command
docker-compose up -d

# 3. Open your browser
http://localhost:3000

# That's it! 🎉
```

### Option 2: Manual Setup

#### Prerequisites Check
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
mongod --version  # Should be v5.0+
```

#### Backend Setup (Terminal 1)
```bash
cd brain-sync/backend
npm install
echo "MONGODB_URI=mongodb://localhost:27017/brainsync\nPORT=5000" > .env
npm run dev
```

#### Frontend Setup (Terminal 2)
```bash
cd brain-sync/frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
# Add Firebase config to .env (see INSTALLATION.md)
npm start
```

---

## 📋 What You Need to Install

| Item | Where to Install | When |
|------|------------------|------|
| **MongoDB** | Your computer | Before running backend |
| **Node.js & npm** | Your computer | Before running anything |
| **Backend dependencies** | `/backend` folder | Once, before first run |
| **Frontend dependencies** | `/frontend` folder | Once, before first run |
| **Firebase config** | Frontend `.env` | For authentication |

---

## 📁 Where to Install What

```
brain-sync/
│
├── backend/
│   ├── npm install ← Run HERE for backend
│   └── .env ← Create HERE for backend config
│
└── frontend/
    ├── npm install ← Run HERE for frontend  
    └── .env ← Create HERE for frontend config
```

---

## 🔧 Configuration Files

### Backend `.env` (Create in `/backend` folder)
```env
MONGODB_URI=mongodb://localhost:27017/brainsync
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend `.env` (Create in `/frontend` folder)
```env
REACT_APP_API_URL=http://localhost:5000/api

# Get these from Firebase Console (firebase.google.com)
REACT_APP_FIREBASE_API_KEY=your_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## 🔥 Firebase Setup (Required for Auth)

1. Go to https://console.firebase.google.com/
2. Click "Add project" → Follow steps
3. In your project:
   - Go to Authentication → Get Started
   - Enable "Email/Password"
   - Go to Project Settings → Copy config
   - Add to frontend `.env`

---

## 🎯 URLs After Starting

| Service | URL | What It Does |
|---------|-----|--------------|
| **Frontend** | http://localhost:3000 | Main application |
| **Backend** | http://localhost:5000 | API server |
| **Health Check** | http://localhost:5000/api/health | Check if API is working |
| **MongoDB** | localhost:27017 | Database |

---

## ✅ Verify Everything Works

### 1. Check MongoDB
```bash
mongosh  # or mongo
# Should show MongoDB shell
```

### 2. Check Backend
Open browser: http://localhost:5000/api/health
```json
{ "status": "healthy" }  ← Should see this
```

### 3. Check Frontend
Open browser: http://localhost:3000
Should see BrainSync home page 🎉

---

## 🛑 Common Issues

### "MongoDB not running"
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### "Port already in use"
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in backend .env
PORT=5001
```

### "Module not found"
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Firebase errors"
- Double-check all Firebase config values
- Ensure Email/Password is enabled in Firebase Console
- Make sure frontend `.env` has all Firebase variables

---

## 📚 Need More Help?

- **Detailed Installation**: See [INSTALLATION.md](INSTALLATION.md)
- **Full Documentation**: See [README.md](README.md)
- **UI Improvements**: See [UI_IMPROVEMENTS.md](UI_IMPROVEMENTS.md)

---

## 🎨 Features Included

✨ **Modern UI/UX**
- Beautiful gradients and animations
- Glassmorphism effects
- Fully responsive design
- Smooth transitions

📱 **Responsive**
- Works on mobile, tablet, desktop
- Touch-friendly interface
- Adaptive layouts

⚡ **High Performance**
- Fast load times
- Optimized rendering
- Lazy loading
- Code splitting

🔐 **Secure**
- Firebase authentication
- Role-based access
- Input validation
- CORS protection

---

## 🚀 Quick Commands Reference

```bash
# Start MongoDB
mongod

# Backend Development
cd backend && npm run dev

# Backend Production
cd backend && npm start

# Frontend Development
cd frontend && npm start

# Frontend Build
cd frontend && npm run build

# Docker - Start All
docker-compose up -d

# Docker - Stop All
docker-compose down

# Docker - View Logs
docker-compose logs -f

# Run Tests
npm test
```

---

## 📞 Support

- **Issues**: Create an issue on GitHub
- **Email**: support@brainsync.com
- **Docs**: See INSTALLATION.md

---

**Ready to start learning? Open http://localhost:3000 and explore BrainSync! 🧠✨**
