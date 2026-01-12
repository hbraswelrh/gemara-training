#!/bin/bash

# Font Changer Script for Gemara Training Web Interface

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  Gemara Training - Font Customization                    ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

echo "Choose a font preset:"
echo ""
echo "  1. Inter + Fira Code (Modern & Clean)"
echo "  2. Poppins + JetBrains Mono (Friendly & Professional)"
echo "  3. Open Sans + Source Code Pro (Classic & Readable)"
echo "  4. Roboto + Roboto Mono (Technical & Crisp)"
echo "  5. System Fonts (Default - No Download)"
echo "  6. Custom (I'll configure manually)"
echo ""
read -p "Enter choice (1-6): " choice

CSS_FILE="src/web/css/styles.css"
HTML_FILE="src/web/index.html"

case $choice in
    1)
        FONT_NAME="Inter + Fira Code"
        SANS_FONT="'Inter', system-ui, sans-serif"
        MONO_FONT="'Fira Code', monospace"
        GOOGLE_LINK='<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">'
        ;;
    2)
        FONT_NAME="Poppins + JetBrains Mono"
        SANS_FONT="'Poppins', system-ui, sans-serif"
        MONO_FONT="'JetBrains Mono', monospace"
        GOOGLE_LINK='<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">'
        ;;
    3)
        FONT_NAME="Open Sans + Source Code Pro"
        SANS_FONT="'Open Sans', sans-serif"
        MONO_FONT="'Source Code Pro', monospace"
        GOOGLE_LINK='<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet">'
        ;;
    4)
        FONT_NAME="Roboto + Roboto Mono"
        SANS_FONT="'Roboto', sans-serif"
        MONO_FONT="'Roboto Mono', monospace"
        GOOGLE_LINK='<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono&display=swap" rel="stylesheet">'
        ;;
    5)
        FONT_NAME="System Fonts"
        SANS_FONT="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        MONO_FONT="'SF Mono', Monaco, 'Cascadia Code', Consolas, 'Courier New', monospace"
        GOOGLE_LINK=""
        ;;
    6)
        echo ""
        echo "📖 Manual configuration:"
        echo "   1. See src/web/FONTS.md for detailed instructions"
        echo "   2. Edit src/web/css/styles.css (line 34-35)"
        echo "   3. Optionally add Google Fonts to src/web/index.html"
        echo ""
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Applying: $FONT_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Backup files first
cp "$CSS_FILE" "$CSS_FILE.backup"
cp "$HTML_FILE" "$HTML_FILE.backup"

echo "✓ Backed up existing files (.backup)"

# Update CSS file
sed -i "s|--font-sans:.*|--font-sans: $SANS_FONT;|" "$CSS_FILE"
sed -i "s|--font-mono:.*|--font-mono: $MONO_FONT;|" "$CSS_FILE"

echo "✓ Updated CSS font variables"

# Add Google Fonts link if needed
if [ -n "$GOOGLE_LINK" ]; then
    # Remove any existing Google Fonts links
    sed -i '/fonts.googleapis.com/d' "$HTML_FILE"
    sed -i '/fonts.gstatic.com/d' "$HTML_FILE"

    # Add new Google Fonts link before </head>
    sed -i "s|</head>|    $GOOGLE_LINK\n</head>|" "$HTML_FILE"

    echo "✓ Added Google Fonts link to HTML"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Font change complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎨 Applied fonts:"
echo "   Main text: $SANS_FONT"
echo "   Code text: $MONO_FONT"
echo ""
echo "🌐 To see changes:"
echo "   1. Start web server: ./start-web.sh"
echo "   2. Open: http://localhost:8000"
echo "   3. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)"
echo ""
echo "↩️  To restore previous fonts:"
echo "   cp $CSS_FILE.backup $CSS_FILE"
echo "   cp $HTML_FILE.backup $HTML_FILE"
echo ""
