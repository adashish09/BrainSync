# BrainSync - Video Learning Platform

A modern, responsive video learning platform built with React and Node.js, optimized for performance and user experience.

## 🚀 Features

### For Students
- **Browse Courses**: Discover thousands of video courses across multiple categories
- **Advanced Search**: Find courses by title, instructor, or category with real-time filtering
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **User Profiles**: Manage your learning journey with personalized profiles
- **Video Player**: Custom video player with controls, progress tracking, and fullscreen support

### For Instructors
- **Course Upload**: Easy drag-and-drop video upload with progress tracking
- **Course Management**: Create, edit, and delete your courses
- **Analytics Dashboard**: Track course performance and student engagement
- **Category Management**: Organize courses into relevant categories

### Performance Optimizations
- **Lazy Loading**: Components and images load only when needed
- **React.memo**: Prevents unnecessary re-renders for better performance
- **Debounced Search**: Optimized search with 300ms debouncing
- **Image Optimization**: Thumbnail generation and lazy loading
- **Code Splitting**: Route-based code splitting for faster initial load
- **Error Boundaries**: Graceful error handling and recovery

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - Responsive UI components
- **Axios** - HTTP client for API calls
- **Firebase Auth** - User authentication
- **Lodash** - Utility functions for performance

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd brain-sync/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/brainsync
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd brain-sync/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Copy your Firebase configuration to the frontend `.env` file

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your backend `.env` file
3. The application will automatically create the necessary collections

## 📱 Usage

### For Students
1. **Register/Login**: Create an account or sign in
2. **Browse Courses**: Use the search and filter options to find courses
3. **Watch Videos**: Click on any course to start watching
4. **Manage Profile**: Update your profile information

### For Instructors
1. **Register as Instructor**: Select "Instructor" role during registration
2. **Upload Courses**: Use the upload page to add new video courses
3. **Manage Content**: Edit or delete your courses from the dashboard
4. **Track Performance**: Monitor course views and engagement

## 🎨 UI/UX Features

### Design System
- **Modern Gradient Backgrounds**: Eye-catching visual design
- **Card-based Layout**: Clean, organized content presentation
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error messages and recovery

### Performance Features
- **Lazy Loading**: Images and components load on demand
- **Virtual Scrolling**: Efficient rendering of large lists
- **Memoization**: Optimized re-rendering with React.memo
- **Debounced Search**: Reduced API calls with smart search
- **Image Optimization**: Compressed thumbnails and lazy loading
- **Code Splitting**: Faster initial page loads

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Set environment variables in your hosting platform
3. Ensure MongoDB is accessible from your deployment

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Update API URLs in your environment variables

## 📊 API Endpoints

### Videos
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create new video
- `DELETE /api/videos/:id` - Delete video
- `GET /api/videos/category/:category` - Get videos by category

### Health Check
- `GET /api/health` - API health status

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Authentication**: Firebase-based user authentication
- **Role-based Access**: Different permissions for students and instructors
- **Error Handling**: Secure error messages without sensitive data

## 🧪 Testing

Run tests for both frontend and backend:

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 📈 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap team for the UI components
- Firebase team for authentication services
- MongoDB team for the database solution

## 📞 Support

For support, email support@brainsync.com or create an issue in the repository.

---

**BrainSync** - Learn Anything, Anywhere, Anytime! 🧠✨