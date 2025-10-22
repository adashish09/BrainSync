#!/bin/bash

# BrainSync Quick Start Script
echo "🚀 BrainSync Quick Start"
echo "========================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

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
    print_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) detected"

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Create backend .env if it doesn't exist
if [ ! -f .env ]; then
    print_warning "Creating backend .env file..."
    cp .env.example .env
    print_warning "Please update backend/.env with your MongoDB URI"
fi

# Start backend in background
print_status "Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd ../frontend
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install frontend dependencies"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Create frontend .env if it doesn't exist
if [ ! -f .env ]; then
    print_warning "Creating frontend .env file..."
    cp .env.example .env
    print_warning "Please update frontend/.env with your Firebase configuration"
fi

# Start frontend
print_status "Starting frontend development server..."
print_status "Backend: http://localhost:5000"
print_status "Frontend: http://localhost:3000"
print_status ""
print_status "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    print_status "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start frontend (this will block)
npm start

# This will only run if frontend is stopped
cleanup