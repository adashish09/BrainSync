#!/bin/bash

# BrainSync Deployment Script
echo "🚀 Starting BrainSync deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js and npm are available"

# Backend deployment
print_status "Deploying backend..."
cd backend

# Install backend dependencies
print_status "Installing backend dependencies..."
npm install --production

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please update .env file with your configuration"
    else
        print_error ".env.example file not found"
        exit 1
    fi
fi

# Start backend (in production, you might want to use PM2 or similar)
print_status "Starting backend server..."
if command -v pm2 &> /dev/null; then
    pm2 start server.js --name "brainsync-backend"
    print_status "Backend started with PM2"
else
    print_warning "PM2 not found. Starting backend with node..."
    nohup node server.js > backend.log 2>&1 &
    print_status "Backend started in background"
fi

cd ..

# Frontend deployment
print_status "Deploying frontend..."
cd frontend

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please update .env file with your configuration"
    else
        print_error ".env.example file not found"
        exit 1
    fi
fi

# Run production build optimization
print_status "Running build optimization..."
node build-optimize.js

# Build frontend
print_status "Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Frontend build completed successfully"
    print_status "Build files are in the 'build' directory"
else
    print_error "Frontend build failed"
    exit 1
fi

cd ..

print_status "🎉 Deployment completed successfully!"
print_status "Backend: Running on port 5000"
print_status "Frontend: Build files ready in frontend/build"
print_status ""
print_status "Next steps:"
print_status "1. Update your .env files with production values"
print_status "2. Deploy backend to your hosting platform"
print_status "3. Deploy frontend build files to your CDN/hosting"
print_status "4. Configure your domain and SSL certificates"