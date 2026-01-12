# Web Interface Setup Guide

## Quick Start

### Option 1: Using the Launcher Script (Recommended)

From the project root directory:

```bash
./start-web.sh
```

Then open your browser to: **http://localhost:8000**

### Option 2: Manual Python Server

```bash
cd src/web
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Option 3: Using Node.js

```bash
cd src/web
npx http-server -p 8000
```

### Option 4: Using PHP

```bash
cd src/web
php -S localhost:8000
```

## Prerequisites Checklist

Before starting the course, ensure you have:

- [x] **gemara-mcp-server** installed and running
- [x] **Claude Desktop or Cursor IDE** configured
- [x] **MCP server connection** tested
- [x] **Modern web browser** (Chrome, Firefox, Safari, or Edge)

## Testing Your Setup

1. **Test the web interface:**
   - Open http://localhost:8000
   - You should see the course welcome screen

2. **Test AI connectivity:**
   - Click "Connect AI Agent" in the sidebar
   - Follow the connection instructions
   - Verify your AI agent can access gemara-mcp-server tools

3. **Start learning:**
   - Check all prerequisites on the welcome screen
   - Click "Start Course" to begin Module 1

## Course Navigation

### Sidebar Sections

1. **Course Modules** - Navigate between the 6 modules
2. **AI Assistant** - Connect and interact with your AI agent
3. **Quick Links** - Access resources, help, and your certificate

### Module Status Indicators

- **○** Not started
- **◐** In progress
- **✓** Completed

### Progress Bar

The header shows your overall course completion percentage.

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### "Page not loading"
- Ensure the web server is running
- Check that you're using the correct port (default: 8000)
- Try a different browser
- Check browser console for errors (F12 → Console)

### "Progress not saving"
- Enable cookies and localStorage in your browser
- Don't use private/incognito mode (progress won't persist)
- Clear browser cache if you see old content

### "AI agent won't connect"
- Verify gemara-mcp-server is running
- Check your Claude/Cursor IDE configuration
- Restart your IDE and try again
- Review the troubleshooting guide in the AI connection modal

### "Exercises not working"
- Ensure you've connected your AI agent first
- Some exercises require direct interaction with Claude/Cursor IDE
- Check that gemara-mcp-server tools are available

## Features

### Progress Tracking
- Automatic progress saving to browser localStorage
- View detailed statistics via "View Statistics" in Quick Links
- Export/import progress data

### Quizzes
- Interactive quizzes after each module
- Instant feedback on answers
- 80% passing score required
- Retake unlimited times

### AI Integration
- In-browser AI assistance panel
- Guided prompts for exercises
- Direct integration with gemara-mcp-server via Claude/Cursor

### Certification
- Complete all modules
- Pass all quizzes (80%+)
- Pass final exam (80%+)
- Complete capstone project
- Download your certificate

## Data Storage

All course progress is stored locally in your browser using:
- **localStorage** for progress tracking
- **sessionStorage** for temporary state
- No server-side data collection

To clear your progress: Use the "Reset Progress" option in statistics, or clear browser data.

## Support

- **In-course help:** Click "Help & Support" in Quick Links
- **GitHub Issues:** https://github.com/hbraswel/gemara-training/issues
- **Gemara Community:** https://github.com/ossf/gemara/discussions

## Next Steps

1. ✅ Start the web server
2. ✅ Open http://localhost:8000 in your browser
3. ✅ Complete the prerequisites checklist
4. ✅ Click "Start Course"
5. ✅ Begin Module 1: Understanding the Gemara Framework

Happy learning! 🚀
