# Gemara Policy Writing Training

Interactive AI-assisted training course for compliance professionals to learn Layer 3 policy authoring using the [Gemara framework](https://github.com/ossf/gemara).

## Overview

This comprehensive training program teaches compliance professionals how to write effective organizational policies (Layer 3) using the Gemara logical model with AI assistance through the [gemara-mcp-server](https://github.com/complytime/gemara-mcp-server).

### What is Gemara?

Gemara (GRC Engineering Model for Automated Risk Assessment) is a framework that organizes cybersecurity governance, risk, and compliance activities into six interconnected layers:

1. **Layer 1: Guidance** - Industry best practices (NIST, ISO 27001, etc.)
2. **Layer 2: Controls** - Technology-specific security controls
3. **Layer 3: Policy** - Organization-tailored governance rules ⭐ (Course Focus)
4. **Layer 4: Evaluation** - Assessment of implementations
5. **Layer 5: Enforcement** - Prevention and remediation
6. **Layer 6: Audit** - Compliance review

## Features

### 🎓 Comprehensive Curriculum

- **6 Interactive Modules** covering all aspects of policy writing
- **10 Hands-on Exercises** using real Gemara tools
- **Quizzes and Assessments** with instant feedback
- **Real-world Case Studies** from finance, healthcare, and technology sectors
- **Final Exam and Capstone Project** for certification

### 🤖 AI-Assisted Learning

- Seamless integration with Claude or Cursor IDE
- Direct access to gemara-mcp-server tools
- Guided exercises with AI assistance
- Policy validation and refinement workflows

### 💻 Hybrid Learning Approach

- **Web Interface**: Modern, responsive course platform
- **CLI Tools**: Interactive command-line exercises
- **Visual Diagrams**: Interactive layer visualizations
- **Code Editors**: Built-in YAML editors with syntax highlighting

### 📊 Progress Tracking

- Real-time progress monitoring
- Module completion tracking
- Quiz scores and statistics
- Certificate generation upon completion

## Installation

### Prerequisites

1. **Go 1.24 or higher** (for CLI tools)
2. **Modern web browser** (Chrome, Firefox, Safari, Edge)
3. **Claude Desktop or Cursor IDE** (for AI assistance)
4. **gemara-mcp-server** (for hands-on exercises)

### Setup Steps

1. **Clone this repository:**
   ```bash
   git clone https://github.com/hbraswel/gemara-training.git
   cd gemara-training
   ```

2. **Install gemara-mcp-server:**

   Option A: Using Go
   ```bash
   git clone https://github.com/complytime/gemara-mcp-server.git
   cd gemara-mcp-server
   go build ./cmd/gemara-mcp-server
   ./gemara-mcp-server
   ```

   Option B: Using Docker
   ```bash
   docker run -p 8080:8080 complytime/gemara-mcp-server
   ```

3. **Build the CLI training tool:**
   ```bash
   cd gemara-training
   go build -o bin/gemara-trainer ./cmd/gemara-trainer
   ```

4. **Configure your AI agent:**

   For Claude Desktop, add to `~/.config/claude/config.json`:
   ```json
   {
     "mcpServers": {
       "gemara": {
         "command": "/path/to/gemara-mcp-server"
       }
     }
   }
   ```

   For Cursor IDE, add the MCP server through the settings panel.

## Usage

### Web Interface

Open the web interface to access the full training course:

```bash
cd src/web
# Serve with your preferred web server, e.g.:
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Navigate through the interactive modules, complete quizzes, and work on exercises with AI assistance.

### CLI Training Tool

The command-line interface provides interactive exercises and policy templates:

```bash
# Interactive mode (default)
./bin/gemara-trainer

# Run specific exercise
./bin/gemara-trainer exercise 1

# Generate policy template
./bin/gemara-trainer template mfa-policy > my-policy.yaml

# Validate a policy
./bin/gemara-trainer validate my-policy.yaml

# Show help
./bin/gemara-trainer help
```

#### Available CLI Exercises

1. **Policy Structure Basics** - Learn essential policy components
2. **Writing Policy Statements** - Practice directive language
3. **YAML Syntax and Schema** - Master Gemara YAML format
4. **Compliance Mapping** - Map policies to frameworks
5. **Exception Management** - Handle exceptions and compensating controls
6. **Complete Policy Creation** - Create full policies from scratch

#### Available Policy Templates

- `mfa-policy` - Multi-Factor Authentication
- `password-policy` - Password Management
- `data-encryption` - Data Encryption
- `access-control` - Access Control
- `incident-response` - Incident Response
- `backup-policy` - Data Backup and Recovery

## Course Structure

### Module 1: Understanding the Gemara Framework (30 min)
Learn the 6-layer model and how layers interact. Includes interactive visualizations and quizzes.

### Module 2: Layer 1 & Layer 2 Foundations (45 min)
Explore industry guidance and threat-informed controls with AI-assisted discovery exercises.

### Module 3: Layer 3 Policy Writing Fundamentals (90 min)
Master policy structure, writing effective statements, and creating valid YAML artifacts. Includes guided policy creation exercises.

### Module 4: Advanced Policy Authoring with AI (120 min)
Deep dive into gemara-mcp-server tools, AI-assisted workflows, and complex policy scenarios. Features 4 intensive exercises.

### Module 5: Real-World Policy Implementation (60 min)
Apply skills to industry case studies (finance, healthcare, technology). Practice audit preparation and stakeholder communication.

### Module 6: Continuous Improvement and Mastery (30 min)
Learn policy lifecycle management, stay current with frameworks, and explore advanced topics. Complete final exam and capstone project.

## Learning Objectives

By completing this course, you will be able to:

✅ Explain the Gemara 6-layer model and its benefits
✅ Navigate Layer 1 guidance and Layer 2 control documents
✅ Write clear, effective Layer 3 organizational policies
✅ Use gemara-mcp-server tools proficiently
✅ Leverage AI assistance for policy development
✅ Validate and store policy artifacts correctly
✅ Handle complex policy scenarios with confidence
✅ Apply skills to real-world compliance requirements

## Certification

Upon successful completion of:
- All 6 modules
- All module quizzes (80% or higher)
- Final comprehensive exam (80% or higher)
- Capstone project

You will earn the **Gemara Policy Writing Certification**, demonstrating your ability to write effective Layer 3 policies using AI-assisted workflows.

## Project Structure

```
gemara-training/
├── cmd/
│   └── gemara-trainer/      # CLI training tool
│       └── main.go
├── docs/
│   └── course-outline.md    # Detailed curriculum
├── src/
│   ├── cli/                 # CLI utilities (future)
│   └── web/                 # Web interface
│       ├── index.html       # Main course page
│       ├── css/
│       │   └── styles.css   # Course styling
│       ├── js/
│       │   ├── app.js       # Main application
│       │   ├── modules.js   # Module content
│       │   ├── quiz.js      # Quiz system
│       │   ├── ai-integration.js  # AI connectivity
│       │   └── progress.js  # Progress tracking
│       └── modules/         # Module assets (future)
├── go.mod                   # Go module definition
├── LICENSE                  # Apache 2.0 license
└── README.md               # This file
```

## Development

### Building from Source

```bash
# Build CLI tool
go build -o bin/gemara-trainer ./cmd/gemara-trainer

# Run tests (when available)
go test ./...
```

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Resources

### Official Documentation
- [Gemara Framework](https://github.com/ossf/gemara)
- [gemara-mcp-server](https://github.com/complytime/gemara-mcp-server)

### Compliance Frameworks
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [ISO 27001](https://www.iso.org/isoiec-27001-information-security.html)
- [CIS Controls](https://www.cisecurity.org/controls)

### YAML Resources
- [YAML Official Specification](https://yaml.org/)
- [Learn YAML in Y Minutes](https://learnxinyminutes.com/docs/yaml/)

## Frequently Asked Questions

### Q: Do I need prior cybersecurity experience?

A: Basic understanding of cybersecurity concepts is helpful but not required. The course starts with fundamentals and builds up to advanced topics.

### Q: Which AI agent should I use - Claude or Cursor?

A: Either works! Claude Desktop provides a chat interface, while Cursor IDE integrates AI into your code editor. Choose based on your preference.

### Q: Can I complete the course without the gemara-mcp-server?

A: You can complete the theoretical modules and quizzes, but hands-on exercises require the MCP server for full functionality.

### Q: How long does the course take?

A: Approximately 6-8 hours for all modules, exercises, and assessments. You can work at your own pace over days or weeks.

### Q: Is the certification recognized?

A: This is an educational certificate demonstrating completion of the Gemara policy writing training program. It's valuable for showing your skills to employers interested in GRC automation.

### Q: Can I use this for my organization's policy framework?

A: Absolutely! The templates and techniques learned here can be directly applied to build your organization's policy library.

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/hbraswel/gemara-training/issues)
- **Gemara Community**: [Join discussions](https://github.com/ossf/gemara/discussions)
- **Email**: hbraswel@example.com

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenSSF** for the Gemara framework
- **ComplyTime** for the gemara-mcp-server
- **Anthropic** for Claude AI assistance capabilities
- **The compliance community** for feedback and contributions

## Roadmap

Future enhancements planned:

- [ ] Additional exercises for Layers 4, 5, and 6
- [ ] Integration with GRC platforms (ServiceNow, Archer)
- [ ] Mobile-responsive improvements
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Community policy template library
- [ ] Video tutorials
- [ ] Live instructor-led sessions

---

## Quick Start

Ready to begin? Follow these steps:

1. ✅ Install prerequisites (Go, AI agent, gemara-mcp-server)
2. ✅ Clone and build the project
3. ✅ Configure your AI agent
4. ✅ Open `src/web/index.html` in your browser
5. ✅ Start with Module 1!

**Happy learning, and welcome to the world of AI-assisted policy authoring!** 🚀

---

*For detailed course content, see [docs/course-outline.md](docs/course-outline.md)*
