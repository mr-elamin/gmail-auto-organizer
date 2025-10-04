/**
 * Test Functions for Gmail Organizer
 * Use these functions to test your email organization rules before applying them in production
 */

/**
 * Test function for moving emails to _Archive label (default behavior)
 */
function testMoveToArchive() {
  organizeEmails({
    subjectInclude: 'Newsletter',
    emailOlderThan: 30,
    action: 'label',              // Explicit action
    newLabel: '_Archive',         // Default label
    searchLabel: 'INBOX',
    sandbox: true                 // Always test first!
  });
}

/**
 * Test function for moving emails to a custom label
 */
function testMoveToCustomLabel() {
  organizeEmails({
    emailFrom: 'notifications@example.com',
    emailOlderThan: 30,
    action: 'label',
    newLabel: 'Old_Notifications', // Custom label
    searchLabel: 'INBOX',
    sandbox: true
  });
}

/**
 * Test function using default settings (label action with _Archive)
 */
function testDefaultBehavior() {
  organizeEmails({
    subjectInclude: 'Promotion',
    emailOlderThan: 14,
    searchLabel: 'INBOX',         // action and newLabel will use defaults
    sandbox: true
  });
}

/**
 * Test function for deleting emails
 */
function testDeleteEmails() {
  organizeEmails({
    subjectInclude: 'Spam',
    emailOlderThan: 7,
    action: 'delete',             // Delete action
    searchLabel: 'INBOX',
    sandbox: true
  });
}

/**
 * Test function for forwarding and archiving emails
 */
function testForwardAndArchive() {
  organizeEmails({
    subjectInclude: 'Invoice',
    emailOlderThan: 30,
    action: 'label',
    newLabel: 'Invoices_Archive',
    forwardTo: 'backup@example.com', // Replace with your backup email
    searchLabel: 'INBOX',
    sandbox: true
  });
}

/**
 * Test function for moving emails back to Inbox
 */
function testMoveBackToInbox() {
  organizeEmails({
    emailFrom: 'important@example.com',
    emailOlderThan: 0,            // Any age
    action: 'label',
    newLabel: 'INBOX',            // Move back to inbox
    searchLabel: '_Archive',      // Search in archive
    sandbox: true
  });
}

/**
 * Test function for organizing by multiple criteria
 */
function testMultipleCriteria() {
  organizeEmails({
    subjectInclude: 'Transaction Alert',
    emailFrom: 'alerts@bank.com',
    emailOlderThan: 14,
    action: 'label',
    newLabel: 'Bank_Alerts',
    searchLabel: 'INBOX',
    sandbox: true
  });
}

/**
 * Test function for processing very old emails
 */
function testOldEmailCleanup() {
  organizeEmails({
    subjectInclude: 'Unsubscribe',
    emailOlderThan: 180,          // 6 months old
    action: 'delete',
    searchLabel: '_Archive',
    sandbox: true
  });
}

/**
 * Test function for social media notifications
 */
function testSocialMediaCleanup() {
  organizeEmails({
    emailFrom: 'notifications@social.com',
    emailOlderThan: 7,
    action: 'label',
    newLabel: 'Social_Archive',
    searchLabel: 'INBOX',
    sandbox: true
  });
}

/**
 * Test function for email age validation
 */
function testEmailAgeFilter() {
  organizeEmails({
    subjectInclude: 'Daily Digest',
    emailOlderThan: 1,            // Yesterday's emails
    action: 'label',
    newLabel: 'Daily_Archive',
    searchLabel: 'INBOX',
    sandbox: true
  });
}

/**
 * Comprehensive test function - tests multiple scenarios
 */
function runAllTests() {
  Logger.log('=== Starting comprehensive tests ===');
  
  Logger.log('Test 1: Archive newsletters');
  testMoveToArchive();
  
  Logger.log('Test 2: Custom label assignment');
  testMoveToCustomLabel();
  
  Logger.log('Test 3: Default behavior');
  testDefaultBehavior();
  
  Logger.log('Test 4: Delete old emails');
  testDeleteEmails();
  
  Logger.log('=== All tests completed ===');
  Logger.log('Review the logs above and adjust settings before running in production');
}
