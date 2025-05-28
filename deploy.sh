#!/bin/bash

echo "🚀 Starting full deployment..."

# --- CONFIG ---
ROOT_DIR=$(pwd)
FRONTEND_DIR="$ROOT_DIR/frontend"
SPRING_STATIC_DIR="$ROOT_DIR/backend/src/main/resources/static"

# --- CLEAN STATIC DIR ---
echo "🧹 Cleaning Spring Boot static folder..."
rm -rf "$SPRING_STATIC_DIR"/*
mkdir -p "$SPRING_STATIC_DIR"

# --- COPY STATIC HTML ---
echo "📁 Copying static HTML/CSS..."
cp -R "$FRONTEND_DIR/public/"* "$SPRING_STATIC_DIR/"

# --- ADMIN ---
echo "🛠️ Building admin-react..."
cd "$FRONTEND_DIR/admin-react"
npm install
npm run build
cp -R build/* "$SPRING_STATIC_DIR/admin"

# --- EVENTS ---
echo "🛠️ Building events-react..."
cd "$FRONTEND_DIR/events-react"
npm install
npm run build
cp -R dist/* "$SPRING_STATIC_DIR/events"

# --- MEDIA ---
echo "🛠️ Building media-react..."
cd "$FRONTEND_DIR/media-react"
npm install
npm run build
cp -R dist/* "$SPRING_STATIC_DIR/media"

# --- DONE ---
cd "$ROOT_DIR"
echo "✅ Deployment complete! View at: http://localhost:8080/"