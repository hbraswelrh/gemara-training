package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

const version = "1.0.0"

func main() {
	if len(os.Args) > 1 {
		switch os.Args[1] {
		case "version", "--version", "-v":
			fmt.Printf("Gemara Training CLI v%s\n", version)
			return
		case "help", "--help", "-h":
			showHelp()
			return
		case "exercise":
			if len(os.Args) > 2 {
				runExercise(os.Args[2])
			} else {
				listExercises()
			}
			return
		case "validate":
			if len(os.Args) > 2 {
				validatePolicy(os.Args[2])
			} else {
				fmt.Println("Error: Please specify a policy file to validate")
				fmt.Println("Usage: gemara-trainer validate <policy-file.yaml>")
			}
			return
		case "template":
			if len(os.Args) > 2 {
				generateTemplate(os.Args[2])
			} else {
				listTemplates()
			}
			return
		case "interactive":
			runInteractiveMode()
			return
		default:
			fmt.Printf("Unknown command: %s\n", os.Args[1])
			fmt.Println("Run 'gemara-trainer help' for usage information")
		}
		return
	}

	// Default: run interactive mode
	runInteractiveMode()
}

func showHelp() {
	help := `Gemara Policy Writing Training CLI

USAGE:
    gemara-trainer [COMMAND] [OPTIONS]

COMMANDS:
    interactive        Start interactive training mode (default)
    exercise <num>     Run a specific training exercise
    validate <file>    Validate a policy YAML file
    template <type>    Generate a policy template
    help              Show this help message
    version           Show version information

EXAMPLES:
    # Start interactive training
    gemara-trainer
    gemara-trainer interactive

    # Run specific exercise
    gemara-trainer exercise 1

    # Validate a policy file
    gemara-trainer validate my-policy.yaml

    # Generate a template
    gemara-trainer template mfa-policy

    # List all templates
    gemara-trainer template

EXERCISES:
    1. Policy Structure Basics
    2. Writing Policy Statements
    3. YAML Syntax and Schema
    4. Compliance Mapping
    5. Exception Management
    6. Complete Policy Creation

For more information, visit: https://github.com/ossf/gemara
`
	fmt.Println(help)
}

func runInteractiveMode() {
	fmt.Println("╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Gemara Policy Writing Training - Interactive CLI        ║")
	fmt.Println("║  Learn to write effective Layer 3 organizational policies║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")
	fmt.Println()

	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Println("\nWhat would you like to do?")
		fmt.Println("  1. Start guided exercises")
		fmt.Println("  2. Practice policy writing")
		fmt.Println("  3. Validate a policy file")
		fmt.Println("  4. Generate policy template")
		fmt.Println("  5. View learning resources")
		fmt.Println("  6. Exit")
		fmt.Print("\nEnter your choice (1-6): ")

		choice, _ := reader.ReadString('\n')
		choice = strings.TrimSpace(choice)

		switch choice {
		case "1":
			runGuidedExercises(reader)
		case "2":
			practicePolicyWriting(reader)
		case "3":
			fmt.Print("Enter policy file path: ")
			filePath, _ := reader.ReadString('\n')
			validatePolicy(strings.TrimSpace(filePath))
		case "4":
			listTemplates()
			fmt.Print("Enter template type: ")
			templateType, _ := reader.ReadString('\n')
			generateTemplate(strings.TrimSpace(templateType))
		case "5":
			showResources()
		case "6":
			fmt.Println("\nThank you for using Gemara Policy Writing Training!")
			fmt.Println("Keep practicing and writing great policies!")
			return
		default:
			fmt.Println("Invalid choice. Please enter a number between 1 and 6.")
		}
	}
}

func runGuidedExercises(reader *bufio.Reader) {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Guided Policy Writing Exercises                         ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	exercises := []struct {
		num   int
		title string
		desc  string
	}{
		{1, "Policy Structure Basics", "Learn the essential components of a Layer 3 policy"},
		{2, "Writing Policy Statements", "Practice writing clear, directive policy statements"},
		{3, "YAML Syntax and Schema", "Master the Gemara YAML format"},
		{4, "Compliance Mapping", "Map policies to compliance frameworks"},
		{5, "Exception Management", "Handle policy exceptions and compensating controls"},
		{6, "Complete Policy Creation", "Create a full policy from scratch"},
	}

	fmt.Println("\nAvailable Exercises:")
	for _, ex := range exercises {
		fmt.Printf("  %d. %s\n      %s\n\n", ex.num, ex.title, ex.desc)
	}

	fmt.Print("Which exercise would you like to run (1-6)? ")
	choice, _ := reader.ReadString('\n')
	choice = strings.TrimSpace(choice)

	if num := choice; num >= "1" && num <= "6" {
		runExercise(num)
	} else {
		fmt.Println("Invalid exercise number.")
	}
}

func runExercise(exerciseNum string) {
	switch exerciseNum {
	case "1":
		runExercise1()
	case "2":
		runExercise2()
	case "3":
		runExercise3()
	case "4":
		runExercise4()
	case "5":
		runExercise5()
	case "6":
		runExercise6()
	default:
		fmt.Println("Exercise not found. Please choose 1-6.")
	}
}

func runExercise1() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Exercise 1: Policy Structure Basics                     ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nLearning Objectives:")
	fmt.Println("  • Understand the required fields in a Layer 3 policy")
	fmt.Println("  • Identify the purpose of each section")
	fmt.Println("  • Recognize well-structured vs. poorly-structured policies")

	fmt.Println("\n📚 Key Concepts:")
	fmt.Println("\nA complete Layer 3 policy requires these key sections:")
	fmt.Println("  1. Metadata (version, type, id, title, owner, dates)")
	fmt.Println("  2. Policy Statement (what must be done)")
	fmt.Println("  3. Scope (who/what it applies to)")
	fmt.Println("  4. Requirements (specific obligations)")
	fmt.Println("  5. Derived From Controls (Layer 2 control references)")
	fmt.Println("  6. Risk Context (why this policy exists)")
	fmt.Println("  7. Enforcement (how it's enforced)")
	fmt.Println("  8. Compliance Mappings (framework requirements)")

	fmt.Println("\n✏️  Practice Question:")
	fmt.Println("\nWhich section would contain this text:")
	fmt.Println("  'All remote access to corporate systems must use")
	fmt.Println("   multi-factor authentication'")
	fmt.Println("\n  a) Metadata")
	fmt.Println("  b) Policy Statement")
	fmt.Println("  c) Requirements")
	fmt.Println("  d) Scope")

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("\nYour answer (a-d): ")
	answer, _ := reader.ReadString('\n')
	answer = strings.TrimSpace(strings.ToLower(answer))

	if answer == "b" {
		fmt.Println("\n✓ Correct!")
		fmt.Println("This is a Policy Statement - it clearly states what must be done.")
		fmt.Println("Requirements would break this down into specific, measurable obligations.")
	} else {
		fmt.Println("\n✗ Not quite.")
		fmt.Println("The correct answer is (b) Policy Statement.")
		fmt.Println("This high-level directive belongs in the policy_statement field.")
		fmt.Println("Requirements would provide more specific details.")
	}

	fmt.Println("\n💡 Tip: Policy statements are high-level, directive statements.")
	fmt.Println("   Requirements provide specific, measurable obligations.")
	fmt.Println("\n✅ Exercise 1 Complete!")
}

func runExercise2() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Exercise 2: Writing Policy Statements                   ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nLearning Objectives:")
	fmt.Println("  • Write clear, directive policy statements")
	fmt.Println("  • Use appropriate language (must, shall, will)")
	fmt.Println("  • Avoid weak or ambiguous language")

	fmt.Println("\n📚 Key Concepts:")
	fmt.Println("\nEffective policy statements:")
	fmt.Println("  ✓ Use directive language: 'must', 'will', 'shall'")
	fmt.Println("  ✓ Are clear and specific")
	fmt.Println("  ✓ State WHO must do WHAT")
	fmt.Println("  ✓ Are enforceable")
	fmt.Println("\n  ✗ Avoid 'should', 'may', 'consider'")
	fmt.Println("  ✗ Avoid technical implementation details")
	fmt.Println("  ✗ Avoid ambiguous language")

	fmt.Println("\n✏️  Practice:")
	fmt.Println("\nWhich statement is better?")
	fmt.Println("\n  A) 'Users should consider enabling encryption for sensitive data'")
	fmt.Println("  B) 'All sensitive data must be encrypted at rest and in transit'")

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("\nYour answer (A/B): ")
	answer, _ := reader.ReadString('\n')
	answer = strings.TrimSpace(strings.ToUpper(answer))

	if answer == "B" {
		fmt.Println("\n✓ Correct!")
		fmt.Println("\nStatement B is better because:")
		fmt.Println("  • Uses directive language ('must')")
		fmt.Println("  • Is specific about what needs encryption")
		fmt.Println("  • States both 'at rest' and 'in transit'")
		fmt.Println("  • Is clearly enforceable")
		fmt.Println("\nStatement A is weak because:")
		fmt.Println("  • 'should consider' is not directive")
		fmt.Println("  • It's optional, not mandatory")
		fmt.Println("  • Cannot be enforced")
	} else {
		fmt.Println("\n✗ Not quite.")
		fmt.Println("\nThe correct answer is B.")
		fmt.Println("Statement A uses weak language ('should consider') which is not enforceable.")
		fmt.Println("Statement B uses directive language ('must') and is specific.")
	}

	fmt.Println("\n💡 Tip: Replace 'should' with 'must' and 'may' with 'will'")
	fmt.Println("   to make policies more enforceable.")
	fmt.Println("\n✅ Exercise 2 Complete!")
}

func runExercise3() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Exercise 3: YAML Syntax and Schema                      ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nLearning Objectives:")
	fmt.Println("  • Understand YAML syntax basics")
	fmt.Println("  • Learn the Gemara Layer 3 schema")
	fmt.Println("  • Identify common YAML errors")

	fmt.Println("\n📚 YAML Basics:")
	fmt.Println("  • Use spaces (2 per level), NOT tabs")
	fmt.Println("  • Key-value pairs: key: value")
	fmt.Println("  • Lists use dashes: - item")
	fmt.Println("  • Multi-line text uses > or |")
	fmt.Println("  • Strings with special chars need quotes")

	fmt.Println("\n✏️  Identify the Error:")
	fmt.Println("\nWhat's wrong with this YAML?")
	fmt.Println("\n  version: 1.0")
	fmt.Println("  type: layer3-policy")
	fmt.Println("	  id: pol-001")  // Note: this has a tab
	fmt.Println("  metadata:")
	fmt.Println("    title: My Policy")

	fmt.Println("\n  a) Missing quotes around version")
	fmt.Println("  b) Tab used instead of spaces for 'id'")
	fmt.Println("  c) 'type' should come before 'version'")
	fmt.Println("  d) No error")

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("\nYour answer (a-d): ")
	answer, _ := reader.ReadString('\n')
	answer = strings.TrimSpace(strings.ToLower(answer))

	if answer == "b" {
		fmt.Println("\n✓ Correct!")
		fmt.Println("YAML does not allow tabs for indentation.")
		fmt.Println("Always use spaces (typically 2 spaces per indentation level).")
	} else {
		fmt.Println("\n✗ Not quite.")
		fmt.Println("The correct answer is (b).")
		fmt.Println("The 'id' line uses a tab instead of spaces.")
		fmt.Println("YAML requires consistent spacing, not tabs.")
	}

	fmt.Println("\n💡 Tip: Configure your editor to insert spaces when you press Tab.")
	fmt.Println("\n✅ Exercise 3 Complete!")
}

func runExercise4() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Exercise 4: Compliance Mapping                          ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nLearning Objectives:")
	fmt.Println("  • Map policies to compliance frameworks")
	fmt.Println("  • Understand framework requirements")
	fmt.Println("  • Create compliance matrices")

	fmt.Println("\n📚 Key Compliance Frameworks:")
	fmt.Println("  • SOC 2 - Trust Service Criteria")
	fmt.Println("  • ISO 27001 - Information Security Controls")
	fmt.Println("  • NIST 800-53 - Security and Privacy Controls")
	fmt.Println("  • PCI-DSS - Payment Card Industry Standards")

	fmt.Println("\n✏️  Practice:")
	fmt.Println("\nAn MFA policy would most likely map to which SOC 2 criterion?")
	fmt.Println("\n  a) CC1.1 (COSO Principles)")
	fmt.Println("  b) CC6.1 (Logical Access)")
	fmt.Println("  c) CC7.1 (System Operations)")
	fmt.Println("  d) CC8.1 (Change Management)")

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("\nYour answer (a-d): ")
	answer, _ := reader.ReadString('\n')
	answer = strings.TrimSpace(strings.ToLower(answer))

	if answer == "b" {
		fmt.Println("\n✓ Correct!")
		fmt.Println("\nCC6.1 covers logical and physical access controls,")
		fmt.Println("including authentication mechanisms like MFA.")
	} else {
		fmt.Println("\n✗ Not quite.")
		fmt.Println("The correct answer is (b) CC6.1.")
		fmt.Println("This criterion covers access control mechanisms.")
	}

	fmt.Println("\n💡 Tip: Always include compliance_mappings in your policies")
	fmt.Println("   to demonstrate framework coverage.")
	fmt.Println("\n✅ Exercise 4 Complete!")
}

func runExercise5() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Exercise 5: Exception Management                        ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nLearning Objectives:")
	fmt.Println("  • Design exception processes")
	fmt.Println("  • Define compensating controls")
	fmt.Println("  • Balance security and business needs")

	fmt.Println("\n📚 Exception Best Practices:")
	fmt.Println("  • Document a clear exception request process")
	fmt.Println("  • Require appropriate approval level")
	fmt.Println("  • Set expiration dates for exceptions")
	fmt.Println("  • Require compensating controls")
	fmt.Println("  • Review exceptions regularly")

	fmt.Println("\n✏️  Scenario:")
	fmt.Println("\nYour MFA policy requires all users to use MFA.")
	fmt.Println("The CEO's executive assistant has an old device that")
	fmt.Println("doesn't support MFA and needs email access.")
	fmt.Println("\nWhat should you do?")

	fmt.Println("\n  a) Deny the exception - no exceptions allowed")
	fmt.Println("  b) Grant permanent exception - CEO privilege")
	fmt.Println("  c) Grant temporary exception with compensating controls")
	fmt.Println("  d) Change the policy to make MFA optional")

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("\nYour answer (a-d): ")
	answer, _ := reader.ReadString('\n')
	answer = strings.TrimSpace(strings.ToLower(answer))

	if answer == "c" {
		fmt.Println("\n✓ Correct!")
		fmt.Println("\nGrant a temporary exception with:")
		fmt.Println("  • Time limit (e.g., 90 days to replace device)")
		fmt.Println("  • Compensating controls (restrict IP, monitor access)")
		fmt.Println("  • VP-level approval")
		fmt.Println("  • Regular review")
	} else {
		fmt.Println("\n✗ Not quite.")
		fmt.Println("The correct answer is (c).")
		fmt.Println("Balance security and business needs with temporary exceptions")
		fmt.Println("and compensating controls.")
	}

	fmt.Println("\n💡 Tip: Always document exception criteria in your policies.")
	fmt.Println("\n✅ Exercise 5 Complete!")
}

func runExercise6() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Exercise 6: Complete Policy Creation                    ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nThis exercise will guide you through creating a complete")
	fmt.Println("Layer 3 policy from scratch.")

	fmt.Println("\n📝 Your Task:")
	fmt.Println("Create a password policy for a healthcare organization")
	fmt.Println("that must comply with HIPAA requirements.")

	fmt.Println("\n💡 Use the template generator:")
	fmt.Println("   gemara-trainer template password-policy > my-policy.yaml")

	fmt.Println("\n📚 Then customize it with:")
	fmt.Println("  1. Healthcare-specific requirements")
	fmt.Println("  2. HIPAA compliance mappings")
	fmt.Println("  3. Appropriate risk context")
	fmt.Println("  4. Enforcement mechanisms")

	fmt.Println("\n✅ When done, validate with:")
	fmt.Println("   gemara-trainer validate my-policy.yaml")

	fmt.Println("\n💡 For full validation, use the gemara-mcp-server:")
	fmt.Println("   Ask your AI agent to validate using the")
	fmt.Println("   validate_gemara_yaml tool")

	fmt.Println("\n✅ Exercise 6 Complete!")
}

func practicePolicyWriting(reader *bufio.Reader) {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Policy Writing Practice                                 ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\nChoose a scenario:")
	fmt.Println("  1. Write an access control policy")
	fmt.Println("  2. Write a data encryption policy")
	fmt.Println("  3. Write a password policy")
	fmt.Println("  4. Write an incident response policy")
	fmt.Print("\nChoice (1-4): ")

	choice, _ := reader.ReadString('\n')
	choice = strings.TrimSpace(choice)

	scenarios := map[string]string{
		"1": "access-control",
		"2": "data-encryption",
		"3": "password-policy",
		"4": "incident-response",
	}

	if template, ok := scenarios[choice]; ok {
		fmt.Printf("\nGenerating %s template...\n", template)
		generateTemplate(template)
	} else {
		fmt.Println("Invalid choice.")
	}
}

func validatePolicy(filePath string) {
	fmt.Printf("\n🔍 Validating policy file: %s\n", filePath)

	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		fmt.Printf("❌ Error: File not found: %s\n", filePath)
		return
	}

	// Read file
	content, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Printf("❌ Error reading file: %v\n", err)
		return
	}

	// Basic validation (in a real implementation, this would use a YAML parser)
	fileContent := string(content)

	fmt.Println("\n✓ File exists and is readable")

	// Check for required fields
	requiredFields := []string{
		"version:",
		"type: layer3-policy",
		"id:",
		"metadata:",
		"policy_statement:",
		"scope:",
	}

	allPresent := true
	for _, field := range requiredFields {
		if !strings.Contains(fileContent, field) {
			fmt.Printf("⚠ Warning: Missing required field: %s\n", field)
			allPresent = false
		}
	}

	if allPresent {
		fmt.Println("✓ All required fields present")
	}

	// Check for tabs (common YAML error)
	if strings.Contains(fileContent, "\t") {
		fmt.Println("❌ Error: File contains tabs. YAML requires spaces for indentation.")
	} else {
		fmt.Println("✓ No tabs found (proper YAML spacing)")
	}

	fmt.Println("\n💡 For complete validation, use gemara-mcp-server:")
	fmt.Println("   Ask your AI agent to run validate_gemara_yaml tool")

	fmt.Println("\n✅ Basic validation complete!")
}

func listTemplates() {
	fmt.Println("\n📋 Available Policy Templates:")
	fmt.Println("\n  1. mfa-policy          - Multi-Factor Authentication")
	fmt.Println("  2. password-policy     - Password Management")
	fmt.Println("  3. data-encryption     - Data Encryption")
	fmt.Println("  4. access-control      - Access Control")
	fmt.Println("  5. incident-response   - Incident Response")
	fmt.Println("  6. backup-policy       - Data Backup and Recovery")

	fmt.Println("\nUsage: gemara-trainer template <template-name>")
}

func listExercises() {
	fmt.Println("\n📚 Available Training Exercises:")
	fmt.Println("\n  1. Policy Structure Basics")
	fmt.Println("  2. Writing Policy Statements")
	fmt.Println("  3. YAML Syntax and Schema")
	fmt.Println("  4. Compliance Mapping")
	fmt.Println("  5. Exception Management")
	fmt.Println("  6. Complete Policy Creation")

	fmt.Println("\nUsage: gemara-trainer exercise <number>")
}

func generateTemplate(templateType string) {
	templates := map[string]string{
		"mfa-policy":        getMFATemplate(),
		"password-policy":   getPasswordTemplate(),
		"data-encryption":   getEncryptionTemplate(),
		"access-control":    getAccessControlTemplate(),
		"incident-response": getIncidentResponseTemplate(),
		"backup-policy":     getBackupTemplate(),
	}

	template, ok := templates[templateType]
	if !ok {
		fmt.Printf("Template '%s' not found.\n", templateType)
		listTemplates()
		return
	}

	fmt.Printf("\n📄 Generating %s template...\n\n", templateType)
	fmt.Println(template)

	fmt.Println("\n💡 Tip: Customize this template for your organization:")
	fmt.Println("   • Update metadata (owner, approval dates)")
	fmt.Println("   • Tailor policy_statement to your context")
	fmt.Println("   • Adjust requirements based on risk appetite")
	fmt.Println("   • Add organization-specific compliance mappings")
}

func getMFATemplate() string {
	return `metadata:
  id: "mfa-policy-001"
  description: "Multi-factor authentication policy for remote access"
  author:
    id: REPLACE_WITH_AUTHOR_ID
    name: "REPLACE_WITH_AUTHOR_NAME"
    type: Human
    contact:
      name: "REPLACE_WITH_CONTACT_NAME"
      affiliation: "REPLACE_WITH_DEPARTMENT"
      email: "REPLACE_WITH_EMAIL"
  draft: true

title: "Multi-Factor Authentication Policy"
purpose: "Require multi-factor authentication for all remote access to protect against credential theft"

contacts:
  responsible:
    - name: "REPLACE_WITH_RESPONSIBLE_NAME"
      primary: true
      affiliation: "Information Technology"
      email: "REPLACE_WITH_EMAIL"
  accountable:
    - name: "REPLACE_WITH_ACCOUNTABLE_NAME"
      primary: true
      affiliation: "Security Department"
      email: "REPLACE_WITH_EMAIL"

scope:
  in:
    technologies: ["VPN", "Cloud Applications", "Email Systems"]
    user-roles: ["Employees", "Contractors"]
  out:
    technologies: ["On-premises Systems"]
    user-roles: ["Service Accounts"]

imports:
  catalogs:
    - id: "iam-controls"
      location: "REPLACE_WITH_CATALOG_LOCATION"

adherence:
  evaluation-methods:
    - "Automated MFA enrollment compliance scans"
    - "Quarterly access control reviews"
  assessment-plans:
    - "Monthly MFA enrollment status reports"
  enforcement-methods:
    - "Conditional access policies in identity provider"
    - "Account suspension for non-compliant users"
  non-compliance: "Accounts without MFA will be disabled after 30-day grace period"`
}

func getPasswordTemplate() string {
	return `metadata:
  id: "password-policy-001"
  description: "Password complexity and management requirements"
  author:
    id: REPLACE_WITH_AUTHOR_ID
    name: "REPLACE_WITH_AUTHOR_NAME"
    type: Human
    contact:
      name: "REPLACE_WITH_CONTACT_NAME"
      affiliation: "REPLACE_WITH_DEPARTMENT"
      email: "REPLACE_WITH_EMAIL"
  draft: true

title: "Password Management Policy"
purpose: "Ensure all passwords meet minimum security requirements"

contacts:
  responsible:
    - name: "REPLACE_WITH_RESPONSIBLE_NAME"
      primary: true
      affiliation: "IT"
      email: "REPLACE_WITH_EMAIL"
  accountable:
    - name: "REPLACE_WITH_ACCOUNTABLE_NAME"
      primary: true
      affiliation: "Security"
      email: "REPLACE_WITH_EMAIL"

scope:
  in:
    technologies: ["All Systems"]
    user-roles: ["All Users"]
  out:
    user-roles: ["Service Accounts"]

imports:
  catalogs:
    - id: "iam-controls"
      location: "REPLACE_WITH_CATALOG_LOCATION"

adherence:
  evaluation-methods:
    - "Password policy compliance scans"
  assessment-plans:
    - "Monthly password audit"
  enforcement-methods:
    - "Automated password complexity validation"
  non-compliance: "Passwords not meeting requirements must be changed within 24 hours"`
}

func getEncryptionTemplate() string {
	return `metadata:
  id: "encryption-policy-001"
  description: "Data encryption requirements for sensitive information"
  author:
    id: REPLACE_WITH_AUTHOR_ID
    name: "REPLACE_WITH_AUTHOR_NAME"
    type: Human
    contact:
      name: "REPLACE_WITH_CONTACT_NAME"
      affiliation: "REPLACE_WITH_DEPARTMENT"
      email: "REPLACE_WITH_EMAIL"
  draft: true

title: "Data Encryption Policy"
purpose: "Ensure all sensitive data is encrypted at rest and in transit using industry-standard algorithms"

contacts:
  responsible:
    - name: "REPLACE_WITH_RESPONSIBLE_NAME"
      primary: true
      affiliation: "IT Operations"
      email: "REPLACE_WITH_EMAIL"
  accountable:
    - name: "REPLACE_WITH_ACCOUNTABLE_NAME"
      primary: true
      affiliation: "Security"
      email: "REPLACE_WITH_EMAIL"

scope:
  in:
    technologies: ["Databases", "File Servers", "Cloud Storage"]
    data-sensitivity: ["Confidential", "Highly Confidential", "PII", "PHI"]
  out:
    data-sensitivity: ["Public"]

imports:
  catalogs:
    - id: "data-protection-controls"
      location: "REPLACE_WITH_CATALOG_LOCATION"

adherence:
  evaluation-methods:
    - "Encryption configuration audits"
    - "Data protection assessments"
  assessment-plans:
    - "Quarterly encryption compliance review"
  enforcement-methods:
    - "Automated encryption validation"
    - "Reject unencrypted data storage"
  non-compliance: "Systems storing unencrypted sensitive data must be remediated within 7 days or taken offline"`
}

func getAccessControlTemplate() string {
	return `metadata:
  id: "access-control-policy-001"
  description: "Role-based access control and least privilege requirements"
  author:
    id: REPLACE_WITH_AUTHOR_ID
    name: "REPLACE_WITH_AUTHOR_NAME"
    type: Human
    contact:
      name: "REPLACE_WITH_CONTACT_NAME"
      affiliation: "REPLACE_WITH_DEPARTMENT"
      email: "REPLACE_WITH_EMAIL"
  draft: true

title: "Access Control Policy"
purpose: "Ensure access to systems and data is granted based on least privilege and role-based access control"

contacts:
  responsible:
    - name: "REPLACE_WITH_RESPONSIBLE_NAME"
      primary: true
      affiliation: "IT"
      email: "REPLACE_WITH_EMAIL"
  accountable:
    - name: "REPLACE_WITH_ACCOUNTABLE_NAME"
      primary: true
      affiliation: "Security"
      email: "REPLACE_WITH_EMAIL"

scope:
  in:
    technologies: ["All Corporate Systems"]
    user-roles: ["All Users"]
  out:
    user-roles: []

imports:
  catalogs:
    - id: "access-management-controls"
      location: "REPLACE_WITH_CATALOG_LOCATION"

adherence:
  evaluation-methods:
    - "Quarterly access reviews"
    - "Role assignment audits"
  assessment-plans:
    - "Quarterly access certification"
  enforcement-methods:
    - "Automated role-based provisioning"
    - "Access request workflow"
  non-compliance: "Unauthorized access must be removed immediately upon discovery"`
}

func getIncidentResponseTemplate() string {
	return `metadata:
  id: "incident-response-policy-001"
  description: "Security incident reporting, investigation, and response requirements"
  author:
    id: REPLACE_WITH_AUTHOR_ID
    name: "REPLACE_WITH_AUTHOR_NAME"
    type: Human
    contact:
      name: "REPLACE_WITH_CONTACT_NAME"
      affiliation: "REPLACE_WITH_DEPARTMENT"
      email: "REPLACE_WITH_EMAIL"
  draft: true

title: "Security Incident Response Policy"
purpose: "Ensure all security incidents are promptly reported, investigated, and remediated"

contacts:
  responsible:
    - name: "REPLACE_WITH_RESPONSIBLE_NAME"
      primary: true
      affiliation: "Security Operations"
      email: "REPLACE_WITH_EMAIL"
  accountable:
    - name: "REPLACE_WITH_ACCOUNTABLE_NAME"
      primary: true
      affiliation: "CISO Office"
      email: "REPLACE_WITH_EMAIL"

scope:
  in:
    technologies: ["All Systems"]
    user-roles: ["All Employees", "Contractors"]
  out:
    user-roles: []

imports:
  catalogs:
    - id: "incident-management-controls"
      location: "REPLACE_WITH_CATALOG_LOCATION"

adherence:
  evaluation-methods:
    - "Incident response drills"
    - "Incident handling metrics review"
  assessment-plans:
    - "Quarterly incident response capability assessment"
  enforcement-methods:
    - "Required incident reporting training"
    - "Incident escalation procedures"
  non-compliance: "Failure to report incidents may result in disciplinary action"`
}

func getBackupTemplate() string {
	return `metadata:
  id: "backup-policy-001"
  description: "Data backup and recovery requirements for business continuity"
  author:
    id: REPLACE_WITH_AUTHOR_ID
    name: "REPLACE_WITH_AUTHOR_NAME"
    type: Human
    contact:
      name: "REPLACE_WITH_CONTACT_NAME"
      affiliation: "REPLACE_WITH_DEPARTMENT"
      email: "REPLACE_WITH_EMAIL"
  draft: true

title: "Data Backup and Recovery Policy"
purpose: "Ensure critical data is backed up regularly and can be recovered to maintain business continuity"

contacts:
  responsible:
    - name: "REPLACE_WITH_RESPONSIBLE_NAME"
      primary: true
      affiliation: "IT Operations"
      email: "REPLACE_WITH_EMAIL"
  accountable:
    - name: "REPLACE_WITH_ACCOUNTABLE_NAME"
      primary: true
      affiliation: "IT Management"
      email: "REPLACE_WITH_EMAIL"

scope:
  in:
    technologies: ["Production Systems", "Databases", "File Servers"]
    data-sensitivity: ["Critical", "Confidential"]
  out:
    technologies: ["Test Systems", "Development Systems"]

imports:
  catalogs:
    - id: "business-continuity-controls"
      location: "REPLACE_WITH_CATALOG_LOCATION"

adherence:
  evaluation-methods:
    - "Backup completion monitoring"
    - "Recovery testing"
  assessment-plans:
    - "Monthly backup verification"
    - "Quarterly recovery drills"
  enforcement-methods:
    - "Automated backup scheduling"
    - "Backup failure alerts"
  non-compliance: "Systems without compliant backups must have backup configured within 48 hours"`
}

func showResources() {
	fmt.Println("\n╔═══════════════════════════════════════════════════════════╗")
	fmt.Println("║  Learning Resources                                       ║")
	fmt.Println("╚═══════════════════════════════════════════════════════════╝")

	fmt.Println("\n📚 Official Documentation:")
	fmt.Println("  • Gemara Framework: https://github.com/ossf/gemara")
	fmt.Println("  • gemara-mcp-server: https://github.com/complytime/gemara-mcp-server")

	fmt.Println("\n🎓 Compliance Frameworks:")
	fmt.Println("  • NIST CSF: https://www.nist.gov/cyberframework")
	fmt.Println("  • ISO 27001: https://www.iso.org/isoiec-27001-information-security.html")
	fmt.Println("  • CIS Controls: https://www.cisecurity.org/controls")

	fmt.Println("\n💻 YAML Resources:")
	fmt.Println("  • YAML Spec: https://yaml.org/")
	fmt.Println("  • Learn YAML: https://learnxinyminutes.com/docs/yaml/")

	fmt.Println("\n📖 Policy Writing Guides:")
	fmt.Println("  • Run exercises 1-6 for guided practice")
	fmt.Println("  • Generate templates for examples")
	fmt.Println("  • Use the web interface for comprehensive training")
}
