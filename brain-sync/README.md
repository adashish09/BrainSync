# 🧠 BrainSync - Modern Video Learning Platform

<div align="center">

![BrainSync Logo](https://img.shields.io/badge/BrainSync-Learn%20Anything-purple?style=for-the-badge&logo=brain&logoColor=white)

**A beautiful, responsive, and performant video learning platform built with modern web technologies.**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.0+-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#️-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

BrainSync is a modern, full-stack video learning platform that enables instructors to share knowledge and students to learn at their own pace. Built with performance and user experience in mind, it features a beautiful, responsive interface with advanced search and filtering capabilities.

### ✨ Highlights

- 🎨 **Modern UI/UX**: Beautiful gradient designs, smooth animations, and glassmorphism effects
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **High Performance**: Code splitting, lazy loading, and optimized rendering
- 🔍 **Smart Search**: Debounced search with real-time filtering
- 🎥 **Video Management**: Upload, organize, and manage video courses
- 👤 **User Authentication**: Secure Firebase-based authentication
- 📊 **Dashboard Analytics**: Track courses and engagement metrics
- 🎯 **Role-based Access**: Separate views for students and instructors

---

## 🌟 Features

### For Students

| Feature | Description |
|---------|-------------|
| **Browse Courses** | Explore thousands of video courses across multiple categories |
| **Advanced Search** | Find courses by title, instructor, or category with real-time filtering |
| **Video Player** | Custom video player with controls and progress tracking |
| **Responsive Design** | Seamless experience across all devices |
| **User Profiles** | Manage your learning journey with personalized profiles |
| **Category Filters** | Filter courses by specific categories |
| **Sort Options** | Sort by newest, oldest, title, or instructor |

### For Instructors

| Feature | Description |
|---------|-------------|
| **Course Upload** | Easy video upload with detailed course information |
| **Course Management** | Create, edit, and delete your courses |
| **Analytics Dashboard** | Track course performance and student engagement |
| **Category Organization** | Organize courses into relevant categories |
| **Instructor Profile** | Showcase your expertise and courses |

### Performance Features

| Feature | Description |
|---------|-------------|
| **Lazy Loading** | Components and images load only when needed |
| **React.memo** | Prevents unnecessary re-renders |
| **Debounced Search** | Optimized search with 300ms debouncing |
| **Code Splitting** | Route-based code splitting for faster loads |
| **Image Optimization** | Lazy loading and optimized thumbnails |
| **Error Boundaries** | Graceful error handling and recovery |

---

## 🎥 Demo

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Home Page
![Home Page](docs/screenshots/home.png)

#### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

#### Video Player
![Video Player](docs/screenshots/player.png)

</details>

---

## 🚀 Installation

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/brain-sync.git
cd brain-sync

# Using Docker Compose (Recommended)
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Detailed Installation

For detailed installation instructions including:
- Prerequisites and system requirements
- Manual installation steps
- Environment configuration
- Firebase setup
- Troubleshooting

**👉 See [INSTALLATION.md](INSTALLATION.md) for complete installation guide**

### Quick Manual Setup

1. **Install Prerequisites**
   - Node.js v16+ ([Download](https://nodejs.org/))
   - MongoDB v5.0+ ([Download](https://www.mongodb.com/try/download/community))
   - Git ([Download](https://git-scm.com/))

2. **Setup Backend**
   ```bash
   cd brain-sync/backend
   npm install
   
   # Create .env file
   echo "MONGODB_URI=mongodb://localhost:27017/brainsync
   PORT=5000
   NODE_ENV=development" > .env
   
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd brain-sync/frontend
   npm install
   
   # Create .env file with your Firebase config
   # See INSTALLATION.md for Firebase setup
   
   npm start
   ```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework with latest concurrent features |
| **React Router DOM** | 7.9.4 | Client-side routing |
| **Bootstrap** | 5.3.8 | Responsive UI components |
| **Material-UI** | 7.3.4 | Modern React components |
| **Axios** | 1.12.2 | HTTP client for API calls |
| **Firebase** | 12.4.0 | User authentication |
| **Lodash** | 4.17.21 | Utility functions for performance |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v16+ | JavaScript runtime |
| **Express.js** | 5.1.0 | Web framework |
| **MongoDB** | 8.19.2 | NoSQL database |
| **Mongoose** | 8.19.2 | MongoDB object modeling |
| **Helmet** | 7.1.0 | Security middleware |
| **Compression** | 1.7.4 | Response compression |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Express Rate Limit** | 7.1.5 | API rate limiting |

### DevOps

- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy and static file serving
- **MongoDB** - Database service

---

## 📁 Project Structure

```
brain-sync/
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   │   └── db.js          # Database connection
│   ├── controllers/        # Route controllers
│   │   └── videoController.js
│   ├── models/            # Database models
│   │   └── Video.js
│   ├── routes/            # API routes
│   │   └── videoRoutes.js
│   ├── server.js          # Express server
│   ├── healthcheck.js     # Health check endpoint
│   ├── Dockerfile         # Docker configuration
│   └── package.json       # Dependencies
│
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth/      # Authentication components
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── Footer.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── Navbar.js
│   │   │   └── VideoCard.js
│   │   ├── context/       # React Context providers
│   │   │   ├── AuthContext.js
│   │   │   └── VideoContext.js
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── Home.js
│   │   │   ├── Profile.js
│   │   │   ├── Upload.js
│   │   │   └── VideoPlayer.js
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── Dockerfile         # Docker configuration
│   ├── nginx.conf         # Nginx configuration
│   └── package.json       # Dependencies
│
├── docker-compose.yml     # Docker Compose configuration
├── deploy.sh             # Deployment script
├── quick-start.sh        # Quick start script
├── performance-monitor.js # Performance monitoring
├── README.md             # This file
└── INSTALLATION.md       # Detailed installation guide
```

---

## 🎨 UI/UX Features

### Design System

- **Modern Gradient Backgrounds**: Eye-catching visual design with smooth gradients
- **Glassmorphism Effects**: Frosted glass effects for modern aesthetics
- **Card-based Layout**: Clean, organized content presentation
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Custom Scrollbar**: Styled scrollbars matching the theme
- **Loading States**: Beautiful loading indicators
- **Error Handling**: User-friendly error messages

### Color Palette

```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--dark-gradient: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
```

### Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

---

## 📊 API Endpoints

### Videos

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/videos` | Get all videos | No |
| `GET` | `/api/videos/:id` | Get single video | No |
| `POST` | `/api/videos` | Create new video | Yes |
| `DELETE` | `/api/videos/:id` | Delete video | Yes |
| `GET` | `/api/videos/category/:category` | Get videos by category | No |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | API health status |

---

## 🔒 Security Features

- **Helmet.js**: Secure HTTP headers
- **CORS Protection**: Configured cross-origin requests
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Server-side validation for all inputs
- **Firebase Authentication**: Secure user authentication
- **Role-based Access**: Different permissions for students and instructors
- **Environment Variables**: Sensitive data stored in environment variables
- **Error Handling**: Secure error messages without sensitive data

---

## ⚡ Performance Metrics

Our performance optimizations achieve excellent scores:

| Metric | Target | Status |
|--------|--------|--------|
| **First Contentful Paint** | < 1.5s | ✅ |
| **Largest Contentful Paint** | < 2.5s | ✅ |
| **Cumulative Layout Shift** | < 0.1 | ✅ |
| **Time to Interactive** | < 3s | ✅ |

---

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test

# Run tests with coverage
npm test -- --coverage
```

---

## 🚀 Deployment

### Using Docker

```bash
# Build and deploy with Docker Compose
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Manual Deployment

#### Frontend (Netlify, Vercel, AWS S3)

```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting service
```

#### Backend (Heroku, Railway, DigitalOcean)

```bash
cd backend
# Set environment variables in your hosting platform
# Deploy using your hosting service's CLI or Git
```

#### Database (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in your environment variables

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead**: Your Name
- **Contributors**: [See all contributors](https://github.com/yourusername/brain-sync/graphs/contributors)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - Amazing UI framework
- [Bootstrap](https://getbootstrap.com/) - Excellent CSS framework
- [Firebase](https://firebase.google.com/) - Authentication services
- [MongoDB](https://www.mongodb.com/) - Powerful database solution
- [Express.js](https://expressjs.com/) - Minimal web framework
- All our [contributors](https://github.com/yourusername/brain-sync/graphs/contributors)

---

## 📞 Support & Contact

- **Email**: support@brainsync.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/brain-sync/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/brain-sync/discussions)
- **Twitter**: [@brainsync](https://twitter.com/brainsync)

---

## 📚 Additional Resources

- [Installation Guide](INSTALLATION.md) - Detailed installation instructions
- [API Documentation](docs/API.md) - Complete API reference
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Changelog](CHANGELOG.md) - Version history

---

## 🗺️ Roadmap

### Version 1.1
- [ ] Real-time notifications
- [ ] Course progress tracking
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Discussion forums

### Version 1.2
- [ ] Live streaming support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Multi-language support

### Version 2.0
- [ ] AI-powered recommendations
- [ ] Offline mode
- [ ] Social features
- [ ] Gamification
- [ ] Advanced reporting

---

<div align="center">

**BrainSync** - Learn Anything, Anywhere, Anytime! 🧠✨

Made with ❤️ by the BrainSync Team

[⬆ Back to Top](#-brainsync---modern-video-learning-platform)

</div>
