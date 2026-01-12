#!/bin/bash

# Gemara Training Web Interface Launcher
# This script starts a local web server to host the training course

PORT=${1:-8000}
WEB_DIR="src/web"

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  Gemara Policy Writing Training - Web Interface          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "Starting web server on port $PORT..."
echo ""

# Check if the web directory exists
if [ ! -d "$WEB_DIR" ]; then
    echo "❌ Error: Web directory not found at $WEB_DIR"
    exit 1
fi

# Change to web directory
cd "$WEB_DIR" || exit 1

echo "✓ Web directory: $(pwd)"
echo "✓ Server URL: http://localhost:$PORT"
echo ""
echo "📚 To access the course:"
echo "   1. Open your web browser"
echo "   2. Navigate to: http://localhost:$PORT"
echo "   3. Start with Module 1: Understanding the Gemara Framework"
echo ""
echo "💡 Tips:"
echo "   • Have your AI agent (Claude/Cursor) ready for exercises"
echo "   • Complete the prerequisites checklist before starting"
echo "   • Your progress is saved in browser localStorage"
echo ""
echo "Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Try Python 3 first, then Python 2, then show error
if command -v python3 &> /dev/null; then
    echo "Using Python 3 HTTP server..."
    python3 -m http.server "$PORT"
elif command -v python &> /dev/null; then
    echo "Using Python 2 HTTP server..."
    python -m SimpleHTTPServer "$PORT"
else
    echo "❌ Error: Python not found. Please install Python to run the web server."
    echo ""
    echo "Alternative: Install and use a different web server:"
    echo "  • Node.js: npx http-server -p $PORT"
    echo "  • PHP: php -S localhost:$PORT"
    exit 1
fi
