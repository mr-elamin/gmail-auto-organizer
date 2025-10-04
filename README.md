# Gmail Auto Organizer 📧

**Automated Gmail organization tool using Google Apps Script**

Organize emails by labels, archive old messages, and forward to backup addresses based on configurable rules. Perfect for keeping your inbox clean and manageable!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://script.google.com)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

## 🌟 Features

- **Smart Email Labeling**: Automatically apply custom labels to emails based on sender, subject, or age
- **Inbox Cleanup**: Remove emails from inbox and organize them into custom labels
- **Email Forwarding**: Forward emails to backup addresses before processing (includes attachments)
- **Flexible Search**: Target specific labels or search across all emails
- **Sandbox Mode**: Test your rules safely before applying them
- **System Label Support**: Move emails back to Inbox or handle other Gmail system labels
- **Age-based Filtering**: Process emails older than specified days
- **Automated Scheduling**: Set up daily, weekly, or monthly automation
- **Batch Processing**: Handle multiple emails efficiently
- **Error Handling**: Robust error handling with detailed logging

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration Options](#configuration-options)
- [Usage Examples](#usage-examples)
- [Setting Up Automation](#setting-up-automation)
- [File Structure](#file-structure)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Give your project a meaningful name (e.g., "Gmail Auto Organizer")

### Step 2: Add the Files

Copy the following files to your Apps Script project:

1. **`emailOrganizer.gs`** - Main organizer function
2. **`testFunctions.gs`** - Test functions for development
3. **`productionFunctions.gs`** - Production-ready automation functions

### Step 3: Set Up Gmail Labels

Create any custom labels you want to use in Gmail:
1. Open Gmail
2. Go to Settings > Labels
3. Create labels like `_Archive`, `Old_Newsletters`, `Backup`, etc.

### Step 4: Enable Gmail API (if needed)

The script automatically handles Gmail API access through Google Apps Script's built-in GmailApp service.

## ⚡ Quick Start

### Test Your Setup

```javascript
// Always start with sandbox mode to test your rules
organizeEmails({
  subjectInclude: 'Newsletter',
  emailOlderThan: 30,
  action: 'label',
  newLabel: '_Archive',
  searchLabel: 'INBOX',
  sandbox: true  // Test mode - no actual changes
});
```

### Basic Production Usage

```javascript
// Archive newsletters older than 30 days
organizeEmails({
  subjectInclude: 'Newsletter',
  emailOlderThan: 30,
  action: 'label',
  newLabel: '_Archive',
  searchLabel: 'INBOX',
  sandbox: false  // Live mode
});
```

## ⚙️ Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `subjectInclude` | string | * | - | Filter by subject text |
| `emailFrom` | string | * | - | Filter by sender email |
| `emailOlderThan` | number | ✅ | - | Process emails older than this many days |
| `action` | string | ❌ | 'label' | 'label' or 'delete' |
| `newLabel` | string | ❌ | '_Archive' | Target label name |
| `searchLabel` | string | ❌ | '' | Label to search in |
| `forwardTo` | string | ❌ | - | Forward emails to this address |
| `sandbox` | boolean | ❌ | false | Test mode |

*Either `subjectInclude` OR `emailFrom` must be specified

## 📖 Usage Examples

### Archive Old Newsletters

```javascript
organizeEmails({
  subjectInclude: 'Newsletter',
  emailOlderThan: 30,
  action: 'label',
  newLabel: '_Archive',
  searchLabel: 'INBOX'
});
```

### Organize by Sender

```javascript
organizeEmails({
  emailFrom: 'notifications@example.com',
  emailOlderThan: 7,
  action: 'label',
  newLabel: 'Notifications_Old',
  searchLabel: 'INBOX'
});
```

### Delete Spam After 7 Days

```javascript
organizeEmails({
  emailFrom: 'spam@example.com',
  emailOlderThan: 7,
  action: 'delete',
  searchLabel: 'INBOX'
});
```

### Forward and Archive Important Emails

```javascript
organizeEmails({
  subjectInclude: 'Invoice',
  emailOlderThan: 30,
  action: 'label',
  newLabel: 'Invoices_Archive',
  forwardTo: 'backup@example.com',
  searchLabel: 'INBOX'
});
```

### Move Emails Back to Inbox

```javascript
organizeEmails({
  emailFrom: 'important@example.com',
  emailOlderThan: 0,
  action: 'label',
  newLabel: 'INBOX',
  searchLabel: '_Archive'
});
```

## 🤖 Setting Up Automation

### Create Automated Triggers

1. In Apps Script editor: Click ⏰ **Triggers**
2. Click **+ Add Trigger**
3. Configure your schedule:
   - **Function**: Choose `dailyEmailOrganizer` or `weeklyEmailCleanup`
   - **Event source**: Time-driven
   - **Type**: Timer (Day, Week, Month)
   - **Time interval**: Your preference
4. **Save** and authorize the script

### Recommended Schedule

- **Daily**: Basic inbox cleanup and organization
- **Weekly**: More aggressive cleanup and archiving
- **Monthly**: Comprehensive organization and long-term archiving

## 📁 File Structure

```
gmail-auto-organizer/
├── README.md                    # This file
├── emailOrganizer.gs           # Core functionality
├── testFunctions.gs            # Test functions
├── productionFunctions.gs      # Production automation
├── LICENSE                     # MIT License
└── CONTRIBUTING.md            # Contribution guidelines
```

## 📚 API Reference

### Main Function: `organizeEmails(options)`

The core function that processes emails based on the provided configuration.

**Parameters:**
- `options` (Object): Configuration object with the options listed above

**Returns:**
- Logs processing results to Google Apps Script console

**Example:**
```javascript
organizeEmails({
  subjectInclude: 'Promotion',
  emailOlderThan: 14,
  action: 'label',
  newLabel: 'Marketing_Archive',
  searchLabel: 'INBOX',
  sandbox: true
});
```

### Test Functions

- `testMoveToArchive()`: Test basic archiving functionality
- `testMoveToCustomLabel()`: Test custom label assignment
- `testDeleteEmails()`: Test email deletion
- `testDefaultBehavior()`: Test with default settings

### Production Functions

- `dailyEmailOrganizer()`: Daily automated cleanup
- `weeklyEmailCleanup()`: Weekly comprehensive cleanup
- `monthlyEmailOrganization()`: Monthly deep organization
- `emergencyInboxCleanup()`: Manual emergency cleanup

## 🎯 Best Practices

### 1. Always Test First
```javascript
// Start with sandbox mode
sandbox: true
```

### 2. Use Specific Filters
```javascript
// Good: Specific subject and sender
subjectInclude: 'Newsletter',
emailFrom: 'newsletter@company.com'

// Avoid: Too broad
subjectInclude: 'email'
```

### 3. Start with Longer Time Periods
```javascript
// Safe: Start with older emails
emailOlderThan: 30

// Risky: Very recent emails
emailOlderThan: 1
```

### 4. Create Labels Before Use
Always create Gmail labels manually before referencing them in scripts.

### 5. Monitor Logs Regularly
Check Google Apps Script logs to ensure everything is working correctly.

## 🔧 Troubleshooting

### Common Issues

**Error: "emailOlderThan is mandatory"**
- Ensure you provide a numeric value for `emailOlderThan`

**Error: "One of subjectInclude or emailFrom must be specified"**
- Provide at least one filter criterion

**Error: "Label not found"**
- Create the label in Gmail before using it in the script

**Error: "Permission denied"**
- Re-authorize the script in Google Apps Script

### Debugging Tips

1. **Enable Sandbox Mode**: Always test with `sandbox: true` first
2. **Check Logs**: Use `View > Logs` in Apps Script editor
3. **Start Small**: Test with a few emails before processing many
4. **Verify Labels**: Ensure all labels exist in your Gmail

### Getting Help

1. Check the [Issues](https://github.com/mr-elamin/gmail-auto-organizer/issues) page
2. Review the troubleshooting section
3. Create a new issue with:
   - Your configuration
   - Error messages
   - Expected vs actual behavior

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **Bug Reports**: Found a bug? [Open an issue](https://github.com/mr-elamin/gmail-auto-organizer/issues)
2. **Feature Requests**: Have an idea? [Suggest it](https://github.com/mr-elamin/gmail-auto-organizer/issues)
3. **Code Contributions**: Submit pull requests
4. **Documentation**: Help improve this README or add examples
5. **Testing**: Test with different Gmail configurations

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly with `sandbox: true`
5. Submit a pull request

### Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code formatting
- Include test functions for new features

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Google Apps Script](https://script.google.com)
- Inspired by the need for better email organization
- Thanks to all contributors and users

## 📧 Support

- [Issues](https://github.com/mr-elamin/gmail-auto-organizer/issues): Bug reports and feature requests
- [Discussions](https://github.com/mr-elamin/gmail-auto-organizer/discussions): General questions and community

---

Made with ❤️ for the open source community

**Star ⭐ this repo if it helped you organize your Gmail!**
