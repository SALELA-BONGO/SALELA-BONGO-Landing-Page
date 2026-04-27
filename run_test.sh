#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

echo "=========================================="
echo "🚀 Running pre-push checks for Salela Bongo Landing Page..."
echo "=========================================="

echo ""
echo "🔍 1. Running Linter..."
npm run lint

echo ""
echo "🏗️  2. Running Production Build..."
npm run build

echo ""
echo "✅ All checks passed! The app is ready to be pushed to git."
echo "=========================================="
