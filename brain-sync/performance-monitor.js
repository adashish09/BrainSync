#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Performance monitoring script for BrainSync
console.log('📊 BrainSync Performance Monitor');
console.log('================================');

// Check bundle sizes
function checkBundleSizes() {
  console.log('\n📦 Bundle Size Analysis');
  console.log('----------------------');
  
  const buildPath = path.join(__dirname, 'frontend', 'build', 'static');
  
  if (!fs.existsSync(buildPath)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }
  
  const jsFiles = [];
  const cssFiles = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else {
        const ext = path.extname(file);
        const size = stat.size;
        
        if (ext === '.js') {
          jsFiles.push({ name: file, size, path: filePath });
        } else if (ext === '.css') {
          cssFiles.push({ name: file, size, path: filePath });
        }
      }
    });
  }
  
  scanDirectory(buildPath);
  
  // Sort by size (largest first)
  jsFiles.sort((a, b) => b.size - a.size);
  cssFiles.sort((a, b) => b.size - a.size);
  
  console.log('\nJavaScript Files:');
  jsFiles.forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(2);
    console.log(`  ${file.name}: ${sizeKB} KB`);
  });
  
  console.log('\nCSS Files:');
  cssFiles.forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(2);
    console.log(`  ${file.name}: ${sizeKB} KB`);
  });
  
  const totalJSSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
  const totalCSSSize = cssFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSize = totalJSSize + totalCSSSize;
  
  console.log(`\nTotal JavaScript: ${(totalJSSize / 1024).toFixed(2)} KB`);
  console.log(`Total CSS: ${(totalCSSSize / 1024).toFixed(2)} KB`);
  console.log(`Total Assets: ${(totalSize / 1024).toFixed(2)} KB`);
  
  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  
  if (totalJSSize > 500 * 1024) {
    console.log('  ⚠️  JavaScript bundle is large. Consider code splitting.');
  }
  
  if (totalCSSSize > 100 * 1024) {
    console.log('  ⚠️  CSS bundle is large. Consider purging unused styles.');
  }
  
  if (totalSize < 200 * 1024) {
    console.log('  ✅ Bundle size is excellent!');
  } else if (totalSize < 500 * 1024) {
    console.log('  ✅ Bundle size is good.');
  } else {
    console.log('  ⚠️  Bundle size could be optimized.');
  }
}

// Check for performance anti-patterns
function checkPerformancePatterns() {
  console.log('\n🔍 Performance Pattern Analysis');
  console.log('-------------------------------');
  
  const frontendSrc = path.join(__dirname, 'frontend', 'src');
  
  if (!fs.existsSync(frontendSrc)) {
    console.log('❌ Frontend src directory not found.');
    return;
  }
  
  let issues = [];
  
  function scanFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanFiles(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for common performance issues
        if (content.includes('useEffect(() => {}, [])') && content.includes('fetch')) {
          issues.push(`${file}: useEffect with empty dependency array and fetch`);
        }
        
        if (content.includes('console.log') && !file.includes('.test.')) {
          issues.push(`${file}: Contains console.log statements`);
        }
        
        if (content.includes('document.querySelector') || content.includes('document.getElementById')) {
          issues.push(`${file}: Direct DOM manipulation detected`);
        }
        
        if (content.includes('innerHTML')) {
          issues.push(`${file}: innerHTML usage detected (security risk)`);
        }
      }
    });
  }
  
  scanFiles(frontendSrc);
  
  if (issues.length === 0) {
    console.log('✅ No performance issues detected!');
  } else {
    console.log('⚠️  Potential performance issues:');
    issues.forEach(issue => {
      console.log(`  - ${issue}`);
    });
  }
}

// Check dependencies
function checkDependencies() {
  console.log('\n📋 Dependency Analysis');
  console.log('----------------------');
  
  const packageJsonPath = path.join(__dirname, 'frontend', 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Frontend package.json not found.');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  
  console.log(`Total dependencies: ${dependencies.length}`);
  
  // Check for large dependencies
  const largeDeps = [
    'lodash',
    'moment',
    'jquery',
    'bootstrap',
    '@mui/material'
  ];
  
  const foundLargeDeps = dependencies.filter(dep => 
    largeDeps.some(largeDep => dep.includes(largeDep))
  );
  
  if (foundLargeDeps.length > 0) {
    console.log('\n⚠️  Large dependencies detected:');
    foundLargeDeps.forEach(dep => {
      console.log(`  - ${dep}`);
    });
    console.log('  Consider using tree-shaking or alternatives.');
  } else {
    console.log('✅ No unusually large dependencies detected.');
  }
}

// Main execution
function main() {
  checkBundleSizes();
  checkPerformancePatterns();
  checkDependencies();
  
  console.log('\n🎯 Performance Score Summary');
  console.log('============================');
  console.log('Run this script after building to monitor performance.');
  console.log('For detailed analysis, use browser dev tools and Lighthouse.');
}

main();