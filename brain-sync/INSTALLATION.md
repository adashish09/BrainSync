# 🚀 BrainSync - Complete Installation Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [System Requirements](#system-requirements)
- [Installation Methods](#installation-methods)
  - [Method 1: Docker Compose (Recommended)](#method-1-docker-compose-recommended)
  - [Method 2: Manual Installation](#method-2-manual-installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| **Node.js** | v16.0.0 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v8.0.0 or higher | Comes with Node.js |
| **MongoDB** | v5.0 or higher | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **Git** | v2.0 or higher | [git-scm.com](https://git-scm.com/downloads) |

### Optional (for Docker deployment)

| Software | Download Link |
|----------|---------------|
| **Docker** | [docker.com](https://www.docker.com/get-started) |
| **Docker Compose** | Usually comes with Docker Desktop |

---

## System Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 5 GB free space
- **OS**: Windows 10/11, macOS 10.14+, or Linux (Ubuntu 18.04+)

### Recommended Requirements
- **CPU**: 4 cores or more
- **RAM**: 8 GB or more
- **Storage**: 10 GB free space
- **OS**: Latest version of Windows, macOS, or Linux

---

## Installation Methods

## Method 1: Docker Compose (Recommended)

This is the easiest way to get BrainSync up and running. All services (frontend, backend, and MongoDB) will run in containers.

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/brain-sync.git

# Navigate to the project directory
cd brain-sync
```

### Step 2: Environment Configuration

The Docker Compose setup uses default environment variables. For production, you should customize these.

**Optional**: Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your_secure_password_here

# Backend Configuration
MONGODB_URI=mongodb://admin:your_secure_password_here@mongodb:27017/brainsync?authSource=admin
PORT=5000
NODE_ENV=production

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start All Services

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

### Step 4: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### Managing Docker Services

```bash
# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a specific service
docker-compose restart backend

# Remove all containers and volumes
docker-compose down -v
```

---

## Method 2: Manual Installation

For development or when you want more control over each service.

### Part A: MongoDB Setup

#### Option 1: Local MongoDB Installation

1. **Download and Install MongoDB**
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Download the appropriate version for your OS
   - Follow the installation wizard

2. **Start MongoDB Service**

   **On Windows:**
   ```bash
   # Start MongoDB as a service (if installed as service)
   net start MongoDB
   
   # Or run manually
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
   ```

   **On macOS:**
   ```bash
   # Using Homebrew
   brew services start mongodb-community@7.0
   
   # Or run manually
   mongod --config /usr/local/etc/mongod.conf
   ```

   **On Linux:**
   ```bash
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Enable to start on boot
   sudo systemctl enable mongod
   ```

3. **Verify MongoDB is Running**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # You should see a MongoDB connection prompt
   ```

#### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Use it in your `.env` file

### Part B: Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd brain-sync/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

   If you encounter any errors, try:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Create Environment File**

   Create a `.env` file in the `backend` directory:

   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/brainsync
   # For MongoDB Atlas, use your connection string:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainsync

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # CORS Configuration (Frontend URL)
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the Backend Server**

   **For Development (with hot reload):**
   ```bash
   npm run dev
   ```

   **For Production:**
   ```bash
   npm start
   ```

5. **Verify Backend is Running**
   - Open your browser and navigate to: http://localhost:5000/api/health
   - You should see a JSON response indicating the server is running

### Part C: Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   # From the project root
   cd brain-sync/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

   If you encounter any errors, try:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Create Environment File**

   Create a `.env` file in the `frontend` directory:

   ```env
   # Backend API URL
   REACT_APP_API_URL=http://localhost:5000/api

   # Firebase Configuration (Optional - for authentication)
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

   **Note**: Firebase is required for user authentication. See [Firebase Setup](#firebase-setup) below.

4. **Start the Frontend Development Server**
   ```bash
   npm start
   ```

5. **Access the Application**
   - The application will automatically open in your browser at: http://localhost:3000
   - If it doesn't open automatically, navigate to the URL manually

---

## Configuration

### Firebase Setup

Firebase is used for user authentication in BrainSync.

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**
   - In your Firebase project, go to "Authentication"
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

3. **Get Configuration Credentials**
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Copy the configuration object
   - Add these values to your frontend `.env` file

4. **Configure Firebase Security Rules** (Optional but Recommended)
   - Go to Firestore Database > Rules
   - Set appropriate read/write rules for your use case

### MongoDB Configuration Options

**Local Development:**
```env
MONGODB_URI=mongodb://localhost:27017/brainsync
```

**MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainsync?retryWrites=true&w=majority
```

**Local with Authentication:**
```env
MONGODB_URI=mongodb://username:password@localhost:27017/brainsync?authSource=admin
```

### Backend Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `PORT` | Backend server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `CORS_ORIGIN` | Allowed frontend origins | No | http://localhost:3000 |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API URL | Yes |
| `REACT_APP_FIREBASE_API_KEY` | Firebase API key | Yes |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `REACT_APP_FIREBASE_APP_ID` | Firebase app ID | Yes |

---

## Running the Application

### Development Mode

1. **Start MongoDB** (if not using Docker or Atlas)
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd brain-sync/backend
   npm run dev
   ```

3. **Start Frontend** (Terminal 2)
   ```bash
   cd brain-sync/frontend
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Production Mode

#### Option 1: Using Docker Compose
```bash
cd brain-sync
docker-compose up -d
```

#### Option 2: Manual Production Build

1. **Build Frontend**
   ```bash
   cd brain-sync/frontend
   npm run build
   ```

2. **Deploy Built Files**
   - The built files will be in `brain-sync/frontend/build/`
   - Serve these files using a web server (Nginx, Apache, etc.)

3. **Run Backend in Production**
   ```bash
   cd brain-sync/backend
   NODE_ENV=production npm start
   ```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error

**Error**: `MongoNetworkError: failed to connect to server`

**Solutions:**
- Verify MongoDB is running: `mongosh` or `mongo`
- Check if the port 27017 is not blocked
- Verify connection string in `.env` file
- For Windows, ensure MongoDB service is started

#### 2. Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
- Kill the process using the port:
  ```bash
  # On Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```
- Or change the PORT in your `.env` file

#### 3. npm Install Fails

**Error**: Various npm installation errors

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

#### 4. Firebase Not Working

**Error**: Authentication errors

**Solutions:**
- Verify all Firebase environment variables are set correctly
- Check that Email/Password authentication is enabled in Firebase Console
- Ensure your domain is authorized in Firebase Console

#### 5. CORS Errors

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**
- Verify `CORS_ORIGIN` in backend `.env` matches your frontend URL
- Check that backend is running
- Clear browser cache and cookies

#### 6. Frontend Build Fails

**Error**: Build errors during `npm run build`

**Solutions:**
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or on Windows
set NODE_OPTIONS=--max-old-space-size=4096 && npm run build
```

---

## FAQ

### Q: Do I need to install MongoDB if I use MongoDB Atlas?
**A:** No, MongoDB Atlas is a cloud-hosted solution. You only need the connection string.

### Q: Can I use a different port for the backend?
**A:** Yes, change the `PORT` variable in backend `.env` and update `REACT_APP_API_URL` in frontend `.env`.

### Q: Is Firebase required?
**A:** Yes, BrainSync uses Firebase for user authentication. You can modify the code to use a different authentication system if needed.

### Q: How do I deploy to production?
**A:** See the [Deployment](#running-the-application) section. You can use platforms like:
- **Frontend**: Netlify, Vercel, AWS S3, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean, AWS EC2
- **Database**: MongoDB Atlas (recommended for production)

### Q: Can I run this on a different OS?
**A:** Yes, BrainSync is cross-platform and works on Windows, macOS, and Linux.

### Q: Where are the videos stored?
**A:** Currently, BrainSync stores video URLs (from YouTube or other hosting services). To upload and store videos locally, you'll need to implement file upload functionality and storage.

### Q: How do I contribute to the project?
**A:** Fork the repository, make your changes, and submit a pull request. See CONTRIBUTING.md for guidelines.

---

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check existing [GitHub Issues](https://github.com/yourusername/brain-sync/issues)
2. Create a new issue with:
   - Your OS and versions
   - Error messages and logs
   - Steps to reproduce the problem
3. Email: support@brainsync.com

---

**Happy Learning with BrainSync! 🧠✨**
