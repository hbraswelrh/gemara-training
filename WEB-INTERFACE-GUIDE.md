# 🌐 Web Interface Quick Start Guide

## Starting the Web Server

### Method 1: Using the Launcher Script (Easiest)

```bash
./start-web.sh
```

This will:
- ✅ Start a web server on port 8000
- ✅ Show you the URL to open
- ✅ Display helpful tips
- ✅ Keep running until you press Ctrl+C

**Custom Port:**
```bash
./start-web.sh 3000  # Use port 3000 instead
```

### Method 2: Direct Python Command

```bash
cd src/web
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

## Accessing the Course

1. **Start the server** using one of the methods above
2. **Open your browser** to http://localhost:8000
3. **You'll see the welcome screen** with:
   - Course overview
   - Prerequisites checklist
   - "Start Course" button

## What You'll See

### Welcome Screen
- Overview of what you'll learn
- 4 key features highlighted
- Prerequisites checklist (check all boxes before starting)
- "Start Course" and "Setup Guide" buttons

### Main Course Interface
Once you start:

**Left Sidebar:**
- 📚 **Course Modules** (1-6) with progress indicators
  - ○ = Not started
  - ◐ = In progress
  - ✓ = Completed
- 🤖 **AI Assistant** connection status
- 🔗 **Quick Links** (Outline, Resources, Help, Certificate)

**Main Content Area:**
- Module content with rich text and diagrams
- Interactive elements (quizzes, code editors)
- Navigation buttons (Previous/Next Module, Take Quiz)

**Header:**
- Course title
- Progress bar showing overall completion %

## Interactive Features

### 1. Modules
- Click any module in the sidebar to navigate
- Read through the content
- Complete embedded activities
- Click "Take Quiz" when ready

### 2. Quizzes
- Multiple choice questions
- Instant feedback on answers
- Explanations for each question
- Must score 80%+ to pass
- Can retake unlimited times

### 3. AI Integration
- Click "Connect AI Agent" in sidebar
- Follow setup instructions
- Use the AI panel for help throughout the course
- **Important:** For hands-on exercises, use Claude/Cursor IDE directly

### 4. Code Editors
- Built-in YAML editor with syntax highlighting
- Used in Module 3+ for policy writing practice
- Validate button to check your work

### 5. Progress Tracking
- Automatic saving to browser localStorage
- View statistics via "View Statistics" in Quick Links
- Download certificate when all requirements met

## Prerequisites Setup

Before starting, ensure you have:

### 1. gemara-mcp-server Running

```bash
# In a separate terminal:
cd /path/to/gemara-mcp-server
./gemara-mcp-server
```

### 2. AI Agent Configured

**For Claude Desktop:**
Edit `~/.config/claude/config.json`:
```json
{
  "mcpServers": {
    "gemara": {
      "command": "/path/to/gemara-mcp-server"
    }
  }
}
```

**For Cursor IDE:**
- Open Settings → MCP Servers
- Add gemara-mcp-server with correct path
- Reload window

### 3. Test AI Connection

In Claude or Cursor, try:
```
"List all available Gemara MCP tools"
```

You should see: `store_layer3_yaml`, `validate_gemara_yaml`, etc.

## Course Structure

### Module 1: Understanding Gemara (30 min)
- Interactive 6-layer diagram
- Hover effects on layers
- Visual flow demonstrations

### Module 2: Layer 1 & 2 Foundations (45 min)
- Framework comparison cards
- Example YAML artifacts
- **Exercise 1:** AI-assisted exploration

### Module 3: Policy Writing Fundamentals (90 min)
- Interactive policy structure visualization
- Good vs. bad examples
- **Exercises 2-4:** AI-assisted policy creation

### Module 4: Advanced Policy Authoring (120 min)
- MCP server tools reference
- Workflow diagrams
- **Exercises 5-8:** Complex scenarios

### Module 5: Real-World Implementation (60 min)
- Industry case studies
- Interactive scenarios
- **Exercises 9-10:** Practical application

### Module 6: Continuous Improvement (30 min)
- Policy lifecycle diagram
- Community resources
- **Final Exam & Capstone Project**

## Tips for Success

### 💡 General Tips
- Complete modules in order
- Don't skip the quizzes - they reinforce learning
- Use the AI assistant liberally
- Take breaks between modules

### 💡 For Exercises
- Keep Claude/Cursor IDE window open next to your browser
- Copy exercise prompts from the web interface
- Paste into your AI agent
- Work through the steps guided by AI

### 💡 For Policy Writing
- Start with templates (use CLI: `gemara-trainer template mfa-policy`)
- Customize for your context
- Use AI to validate and refine
- Save your work as you go

### 💡 For Quizzes
- Read explanations even when you answer correctly
- Note: You need 80% to pass each quiz
- Review module content before retaking

## Keyboard Shortcuts

- **Ctrl+Enter** in AI chat: Send message
- **Tab** in code editor: Insert spaces (not tabs!)
- **Escape**: Close modals

## Troubleshooting

### Server Issues
```bash
# Kill any process using port 8000
lsof -ti:8000 | xargs kill -9

# Try a different port
./start-web.sh 3000
```

### Browser Issues
- Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
- Clear cache and cookies for localhost
- Try incognito mode to test
- Check browser console (F12) for errors

### AI Connection Issues
- Verify gemara-mcp-server is running
- Restart Claude Desktop or Cursor IDE
- Check MCP configuration file syntax
- Review logs for errors

## What's Next?

After starting the server:

1. ✅ **Open browser** to http://localhost:8000
2. ✅ **Check prerequisites** - all 4 items
3. ✅ **Click "Start Course"**
4. ✅ **Begin Module 1**
5. ✅ **Complete at your own pace**
6. ✅ **Earn your certificate!**

## Need Help?

- **In-Course:** Click "Help & Support" in Quick Links
- **Setup:** Read `src/web/SETUP.md`
- **CLI Tool:** Run `./bin/gemara-trainer help`
- **Main Docs:** See `README.md`

---

**Ready to start? Run:**

```bash
./start-web.sh
```

**Then open your browser to: http://localhost:8000**

🎓 Happy Learning! 🚀
