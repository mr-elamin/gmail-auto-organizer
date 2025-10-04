/**
 * Production Functions for Gmail Organizer
 * These functions run automatically via triggers for automated email organization
 * 
 * IMPORTANT: Test all functions with sandbox: true before setting sandbox: false
 * Set up triggers in Google Apps Script: Triggers > Add Trigger
 * 
 * Last Updated: October 2025
 */

/**
 * Main daily email organizer
 * Runs daily to organize emails automatically
 * Recommended trigger: Time-driven, Day timer, between 1-2 AM
 */
function dailyEmailOrganizer() {
  Logger.log('Running daily email organizer at ' + new Date());

  try {
    // Example: Organize bank transaction alerts
    organizeEmails({
      subjectInclude: 'Transaction Alert',
      emailFrom: 'alerts@yourbank.com',  // Replace with your bank's alert email
      emailOlderThan: 14,
      action: 'label',
      newLabel: 'Bank_Alerts',           // Replace with your preferred label
      searchLabel: 'INBOX',
      // forwardTo: 'backup@example.com', // Uncomment and replace with your backup email
      sandbox: true                      // Set to false when ready for production
    });

    // Archive newsletters older than 30 days
    organizeEmails({
      subjectInclude: 'Newsletter',
      emailOlderThan: 30,
      action: 'label',
      newLabel: '_Archive',
      searchLabel: 'INBOX',
      sandbox: true                      // Set to false when ready for production
    });
    
    // Move promotional emails to custom label after 7 days
    organizeEmails({
      subjectInclude: 'Promotion',
      emailOlderThan: 7,
      action: 'label',
      newLabel: 'Marketing_Archive',
      searchLabel: 'INBOX',
      sandbox: true                      // Set to false when ready for production
    });
    
    // Organize notification emails
    organizeEmails({
      subjectInclude: 'Notification',
      emailOlderThan: 14,
      action: 'label',
      newLabel: 'Notifications_Archive',
      searchLabel: 'INBOX',
      sandbox: true                      // Set to false when ready for production
    });

    Logger.log('Daily email organizer completed successfully');
    
  } catch (error) {
    Logger.log('Error in daily email organizer: ' + error.message);
    // Optionally send error notification email
    // MailApp.sendEmail('your-email@example.com', 'Gmail Organizer Error', error.message);
  }
}

/**
 * Weekly cleanup function - runs every Sunday
 * More aggressive cleanup for older emails
 * Recommended trigger: Time-driven, Week timer, Every Sunday
 */
function weeklyEmailCleanup() {
  Logger.log('Running weekly email cleanup at ' + new Date());
  
  try {
    // Delete very old promotional emails from archive
    organizeEmails({
      subjectInclude: 'Unsubscribe',
      emailOlderThan: 180,               // 6 months old
      action: 'delete',
      searchLabel: '_Archive',
      sandbox: true                      // Set to false when ready for production
    });
    
    // Clean up old test emails (example)
    organizeEmails({
      emailFrom: 'test@example.com',     // Replace with actual test email sender
      subjectInclude: 'test',
      emailOlderThan: 30,                // Delete test emails after 30 days
      action: 'delete',
      sandbox: true                      // Set to false when ready for production
    });
    
    // Move very old work emails to long-term archive
    organizeEmails({
      subjectInclude: 'Meeting',
      emailOlderThan: 365,               // 1 year old
      action: 'label',
      newLabel: 'Archive_LongTerm',
      searchLabel: '_Archive',
      sandbox: true                      // Set to false when ready for production
    });

    // Clean up social media notifications
    organizeEmails({
      emailFrom: 'notifications@facebook.com',
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'Social_Archive',
      searchLabel: 'INBOX',
      sandbox: true                      // Set to false when ready for production
    });
    
    organizeEmails({
      emailFrom: 'notify@twitter.com',
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'Social_Archive',
      searchLabel: 'INBOX',
      sandbox: true                      // Set to false when ready for production
    });

    Logger.log('Weekly email cleanup completed successfully');
    
  } catch (error) {
    Logger.log('Error in weekly email cleanup: ' + error.message);
  }
}

/**
 * Monthly organization function - runs first day of each month
 * Comprehensive email organization
 * Recommended trigger: Time-driven, Month timer, First day of month
 */
function monthlyEmailOrganization() {
  Logger.log('Running monthly email organization at ' + new Date());
  
  try {
    // Organize invoices into yearly folders with backup
    organizeEmails({
      subjectInclude: 'Invoice',
      emailOlderThan: 365,
      action: 'label',
      newLabel: 'Finance_Invoices_2024',  // Update year as needed
      searchLabel: 'INBOX',
      forwardTo: 'backup@example.com',    // Replace with your backup email
      sandbox: true                       // Set to false when ready for production
    });
    
    // Clean up old system notifications
    organizeEmails({
      emailFrom: 'noreply@',              // Catches emails from noreply addresses
      emailOlderThan: 90,
      action: 'label',
      newLabel: 'System_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    // Archive old receipts
    organizeEmails({
      subjectInclude: 'Receipt',
      emailOlderThan: 365,                // 1 year old
      action: 'label',
      newLabel: 'Receipts_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    Logger.log('Monthly email organization completed successfully');
    
  } catch (error) {
    Logger.log('Error in monthly email organization: ' + error.message);
  }
}

/**
 * Emergency cleanup function - manual trigger only
 * Use this when inbox gets too cluttered
 * Run manually from Apps Script editor when needed
 */
function emergencyInboxCleanup() {
  Logger.log('Running emergency inbox cleanup at ' + new Date());
  
  try {
    // Archive all promotional emails older than 3 days
    organizeEmails({
      subjectInclude: 'Offer',
      emailOlderThan: 3,
      action: 'label',
      newLabel: '_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });
    
    // Archive all social media notifications older than 1 day
    organizeEmails({
      emailFrom: 'notifications@facebook.com',
      emailOlderThan: 1,
      action: 'label',
      newLabel: 'Social_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });
    
    organizeEmails({
      emailFrom: 'notify@twitter.com',
      emailOlderThan: 1,
      action: 'label',
      newLabel: 'Social_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    // Archive mailing list emails
    organizeEmails({
      subjectInclude: 'mailing list',
      emailOlderThan: 1,
      action: 'label',
      newLabel: 'Lists_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    Logger.log('Emergency inbox cleanup completed successfully');
    
  } catch (error) {
    Logger.log('Error in emergency inbox cleanup: ' + error.message);
  }
}

/**
 * Bank and financial alerts organizer
 * Organize financial emails into appropriate categories
 * Recommended trigger: Time-driven, Day timer (can run with daily organizer)
 */
function organizeBankAlerts() {
  Logger.log('Running bank alerts organizer at ' + new Date());
  
  try {
    // Organize transaction alerts from different banks
    organizeEmails({
      subjectInclude: 'Transaction Alert',
      emailFrom: 'alerts@yourbank.com',   // Replace with your bank's email
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'Bank_Transactions',
      searchLabel: 'INBOX',
      forwardTo: 'backup@example.com',    // Replace with your backup email
      sandbox: true                       // Set to false when ready for production
    });
    
    // Organize account statements
    organizeEmails({
      subjectInclude: 'Statement',
      emailFrom: 'statements@yourbank.com', // Replace with your bank's email
      emailOlderThan: 90,
      action: 'label',
      newLabel: 'Bank_Statements',
      searchLabel: 'INBOX',
      forwardTo: 'backup@example.com',    // Replace with your backup email
      sandbox: true                       // Set to false when ready for production
    });

    // Organize credit card alerts
    organizeEmails({
      subjectInclude: 'Credit Card',
      emailFrom: 'alerts@creditcard.com', // Replace with your credit card company's email
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'CreditCard_Alerts',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    Logger.log('Bank alerts organizer completed successfully');
    
  } catch (error) {
    Logger.log('Error in bank alerts organizer: ' + error.message);
  }
}

/**
 * E-commerce and shopping email organizer
 * Organize emails from shopping sites and marketplaces
 */
function organizeShoppingEmails() {
  Logger.log('Running shopping emails organizer at ' + new Date());
  
  try {
    // Organize order confirmations
    organizeEmails({
      subjectInclude: 'Order Confirmation',
      emailOlderThan: 90,                 // 3 months old
      action: 'label',
      newLabel: 'Shopping_Orders',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    // Organize shipping notifications
    organizeEmails({
      subjectInclude: 'Shipped',
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'Shopping_Shipping',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    // Archive old promotional shopping emails
    organizeEmails({
      subjectInclude: 'Sale',
      emailOlderThan: 14,
      action: 'label',
      newLabel: 'Shopping_Promotions',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready for production
    });

    Logger.log('Shopping emails organizer completed successfully');
    
  } catch (error) {
    Logger.log('Error in shopping emails organizer: ' + error.message);
  }
}

/**
 * Test production function - use this to test before going live
 * Always run this first with sandbox: true before setting up triggers
 */
function testProductionFunctions() {
  Logger.log('Testing production functions at ' + new Date());
  
  // Test with sandbox mode enabled
  organizeEmails({
    subjectInclude: 'Newsletter',
    emailOlderThan: 30,
    action: 'label',
    newLabel: '_Archive',
    searchLabel: 'INBOX',
    sandbox: true                         // Keep sandbox true for testing
  });
  
  organizeEmails({
    subjectInclude: 'Promotion',
    emailOlderThan: 7,
    action: 'label',
    newLabel: 'Marketing_Archive',
    searchLabel: 'INBOX',
    sandbox: true                         // Keep sandbox true for testing
  });
  
  Logger.log('Production function test completed. Review logs and set sandbox to false when ready.');
}

/**
 * Custom organizer template
 * Copy and modify this function to create your own custom email organization rules
 */
function customOrganizerTemplate() {
  Logger.log('Running custom organizer at ' + new Date());
  
  try {
    // Example: Organize emails from specific domain
    organizeEmails({
      emailFrom: '@company.com',          // Replace with actual domain
      emailOlderThan: 14,                 // Adjust age as needed
      action: 'label',                    // or 'delete'
      newLabel: 'Company_Archive',        // Replace with your label
      searchLabel: 'INBOX',               // or specific label to search
      sandbox: true                       // Set to false when ready
    });

    // Example: Organize by subject pattern
    organizeEmails({
      subjectInclude: 'Weekly Report',    // Replace with your pattern
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'Reports_Archive',
      searchLabel: 'INBOX',
      sandbox: true                       // Set to false when ready
    });

    Logger.log('Custom organizer completed successfully');
    
  } catch (error) {
    Logger.log('Error in custom organizer: ' + error.message);
  }
}

/**
 * Comprehensive test function - tests multiple scenarios
 * Use this to test all your production functions safely
 */
function runAllProductionTests() {
  Logger.log('=== Starting comprehensive production tests ===');
  
  try {
    Logger.log('Test 1: Daily organizer');
    // Run a subset of daily organizer for testing
    organizeEmails({
      subjectInclude: 'Newsletter',
      emailOlderThan: 30,
      action: 'label',
      newLabel: '_Archive',
      searchLabel: 'INBOX',
      sandbox: true
    });
    
    Logger.log('Test 2: Bank alerts');
    organizeEmails({
      subjectInclude: 'Transaction',
      emailFrom: 'alerts@example.com',
      emailOlderThan: 14,
      action: 'label',
      newLabel: 'Bank_Test',
      searchLabel: 'INBOX',
      sandbox: true
    });
    
    Logger.log('Test 3: Shopping emails');
    organizeEmails({
      subjectInclude: 'Order',
      emailOlderThan: 30,
      action: 'label',
      newLabel: 'Shopping_Test',
      searchLabel: 'INBOX',
      sandbox: true
    });
    
    Logger.log('=== All production tests completed ===');
    Logger.log('Review the logs above and adjust settings before running in production');
    Logger.log('Remember to set sandbox: false when ready for live operation');
    
  } catch (error) {
    Logger.log('Error in comprehensive testing: ' + error.message);
  }
}
