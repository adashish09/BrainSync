const fs = require('fs');
const path = require('path');

// Production build optimization script
console.log('🚀 Starting production build optimization...');

// Create optimized build configuration
const buildConfig = {
  // Enable production optimizations
  GENERATE_SOURCEMAP: false,
  INLINE_RUNTIME_CHUNK: false,
  IMAGE_INLINE_SIZE_LIMIT: 0,
  
  // Bundle analyzer (optional)
  ANALYZE_BUNDLE: process.env.ANALYZE_BUNDLE === 'true',
  
  // Performance optimizations
  REACT_APP_OPTIMIZE_PERFORMANCE: true,
  REACT_APP_ENABLE_PWA: true,
};

// Write environment variables for build
const envContent = Object.entries(buildConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, '.env.production'), envContent);

console.log('✅ Production build configuration created');
console.log('📦 Run "npm run build" to create optimized production build');
console.log('🔍 Run "ANALYZE_BUNDLE=true npm run build" to analyze bundle size');