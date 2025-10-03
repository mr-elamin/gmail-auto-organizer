# Gmail Auto Organizer \U0001f4e7

**Automated Gmail organization tool using Google Apps Script**

Organize emails by labels, archive old messages, and forward to backup addresses based on configurable rules. Perfect for keeping your inbox clean and manageable!

## \U0001f31f Features

- **Smart Email Labeling**: Automatically apply custom labels to emails based on sender, subject, or age
- **Inbox Cleanup**: Remove emails from inbox and organize them into custom labels
- **Email Forwarding**: Forward emails to backup addresses before processing (includes attachments)
- **Flexible Search**: Target specific labels or search across all emails
- **Sandbox Mode**: Test your rules safely before applying them
- **System Label Support**: Move emails back to Inbox or handle other Gmail system labels
- **Age-based Filtering**: Process emails older than specified days
- **Automated Scheduling**: Set up daily, weekly, or monthly automation

## \U0001f4cb Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration Options](#configuration-options)
- [Usage Examples](#usage-examples)
- [Setting Up Automation](#setting-up-automation)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## \U0001f680 Installation

### Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Replace the default code with the files from this repository

### Step 2: Add the Files

Copy the following files to your Apps Script project:
- `emailOrganizer.gs` - Main organizer function
- `testFunctions.gs` - Test functions for development
- `productionFunctions.gs` - Production-ready automation functions

### Step 3: Set Up Labels

Create any custom labels you want to use in Gmail:
1. Open Gmail
2. Go to Settings > Labels
3. Create labels like `_Archive`, `Old_Newsletters`, `Backup`, etc.

## \u26a1 Quick Start

### Basic Usage

```javascript
// Archive newsletters older than 30 days
organizeEmails({
  subjectInclude: 'Newsletter',
  emailOlderThan: 30,
  action: 'label',
  newLabel: '_Archive',
  searchLabel: 'INBOX',
  sandbox: true  // Always test first!
});

\u2699\ufe0f Configuration Options
Option	Type	Required	Default	Description
subjectInclude	string	*	-	Filter by subject text
emailFrom	string	*	-	Filter by sender email
emailOlderThan	number	\u2705	-	Process emails older than this many days
action	string	\u274c	'label'	'label' or 'delete'
newLabel	string	\u274c	'_Archive'	Target label name
searchLabel	string	\u274c	''	Label to search in
forwardTo	string	\u274c	-	Forward emails to this address
sandbox	boolean	\u274c	false	Test mode
\U0001f4d6 Usage Examples
Archive Old Newsletters
JavaScript

organizeEmails({
  subjectInclude: 'Newsletter',
  emailOlderThan: 30,
  action: 'label',
  newLabel: '_Archive',
  searchLabel: 'INBOX'
});

Delete Spam After 7 Days
JavaScript

organizeEmails({
  emailFrom: 'spam@example.com',
  emailOlderThan: 7,
  action: 'delete',
  searchLabel: 'INBOX'
});

\U0001f916 Setting Up Automation

    In Apps Script: Click \u23f0 Triggers
    Add Trigger: Click + Add Trigger
    Configure daily/weekly/monthly schedule
    Save and authorize

\U0001f91d Contributing

We welcome contributions! Please fork the repository and submit pull requests.
\U0001f4c4 License

MIT License - see LICENSE file for details.

Made with \u2764\ufe0f for the open source community