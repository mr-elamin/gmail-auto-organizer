/**
 * Gmail Organizer - Label & Delete Automation
 * 
 * organizeEmails(options)
 * 
 * Scans Gmail for messages matching a subject and/or sender, older than X days.
 * Can apply labels (remove ALL current labels + add new label), delete, or forward emails based on configuration.
 * 
 * Usage Examples:
 *   // Move emails to _Archive label (default behavior)
 *   organizeEmails({
 *     subjectInclude: 'Newsletter',
 *     emailOlderThan: 30,
 *     searchLabel: 'INBOX'
 *   });
 * 
 *   // Move emails back to Inbox
 *   organizeEmails({
 *     emailFrom: 'notifications@example.com',
 *     emailOlderThan: 7,
 *     action: 'label',
 *     newLabel: 'INBOX',
 *     searchLabel: '_Archive'
 *   });
 * 
 *   // Delete emails older than 90 days
 *   organizeEmails({
 *     subjectInclude: 'Invoice',
 *     emailOlderThan: 90,
 *     action: 'delete',
 *     searchLabel: 'INBOX',
 *     forwardTo: 'backup@company.com'
 *   });
 *
 * Options:
 *   - subjectInclude: string - Filter by subject text (optional if emailFrom is set)
 *   - emailFrom: string - Filter by sender email (optional if subjectInclude is set)
 *   - emailOlderThan: number - Process emails older than this many days (required)
 *   - action: string - 'label' (default) or 'delete'
 *   - newLabel: string - Label to apply when action is 'label' (default: '_Archive')
 *                       Use 'INBOX' to move back to inbox, or any custom label name
 *   - forwardTo: string - Forward emails to this address before action (optional) - includes attachments
 *   - searchLabel: string - Gmail label to search in (e.g., 'INBOX', 'Work', '_Archive'), empty means all labels
 *   - sandbox: boolean - If true, only logs what would be done (no actual actions)
 *
 * To run automatically:
 *   - In Apps Script editor: Triggers > Add Trigger > Select organizeEmails function
 *   - Set timing as desired (daily recommended)
 *
 * Debug output:
 *   - Use View > Logs in the Apps Script editor to see Logger output
 */

function organizeEmails(options) {
  // ---- Validation ----
  if (!options || typeof options.emailOlderThan !== 'number') {
    throw new Error('emailOlderThan is mandatory and must be a number.');
  }
  if (!options.subjectInclude && !options.emailFrom) {
    throw new Error('One of subjectInclude or emailFrom must be specified.');
  }

  // ---- Set defaults ----
  var action = options.action || 'label'; // Default to label
  var newLabel = options.newLabel || '_Archive'; // Default to _Archive label
  var searchLabel = options.searchLabel || ''; // Default to all labels (empty string)
  var sandboxMode = options.sandbox === true;
  
  // Validate action
  if (action !== 'label' && action !== 'delete') {
    throw new Error('action must be either "label" or "delete".');
  }

  Logger.log('Starting organizeEmails with options: ' + JSON.stringify(options));
  Logger.log('Action mode: ' + action.toUpperCase() + ' emails older than ' + options.emailOlderThan + ' days');
  if (action === 'label') {
    Logger.log('Target label: ' + newLabel);
  }
  Logger.log('Search label: ' + (searchLabel || 'ALL LABELS'));
  if (sandboxMode) {
    Logger.log('*** SANDBOX MODE ENABLED - NO ACTUAL ACTIONS WILL BE PERFORMED ***');
  }

  // ---- Check if target is a system label or custom label ----
  var isSystemLabel = false;
  var targetLabel = null;
  var systemLabels = ['INBOX', 'SENT', 'DRAFT', 'TRASH', 'SPAM', 'STARRED', 'IMPORTANT'];
  
  if (action === 'label') {
    if (systemLabels.indexOf(newLabel.toUpperCase()) !== -1) {
      isSystemLabel = true;
      Logger.log('Target is a system label: ' + newLabel.toUpperCase());
    } else if (!sandboxMode) {
      // Handle custom user labels
      try {
        targetLabel = GmailApp.getUserLabelByName(newLabel);
        if (!targetLabel) {
          Logger.log('Target label "' + newLabel + '" not found. Creating it...');
          targetLabel = GmailApp.createLabel(newLabel);
          Logger.log('Created new label: ' + newLabel);
        }
        Logger.log('Found/created target label: ' + newLabel);
      } catch (e) {
        Logger.log('ERROR: Could not access/create target label "' + newLabel + '": ' + e.message);
        return;
      }
    }
  }

  // ---- Build Gmail search query ----
  var queryParts = [];
  
  // Add label filter if specified
  if (searchLabel) {
    if (searchLabel.toUpperCase() === 'INBOX') {
      queryParts.push('in:inbox');
    } else {
      queryParts.push('label:' + searchLabel);
    }
  }
  // If searchLabel is empty, search all labels (no filter added)
  
  if (options.subjectInclude) queryParts.push('subject:"' + options.subjectInclude + '"');
  if (options.emailFrom) queryParts.push('from:' + options.emailFrom);
  queryParts.push('older_than:' + options.emailOlderThan + 'd');
  var searchQuery = queryParts.join(' ');
  Logger.log('Gmail search query: ' + searchQuery);

  // ---- Search for matching threads ----
  var threads = GmailApp.search(searchQuery);
  Logger.log('Found ' + threads.length + ' matching threads' + (searchLabel ? ' in label: ' + searchLabel : ' across all labels'));

  var totalMessagesProcessed = 0, totalForwarded = 0, totalActioned = 0;

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var age = (new Date() - message.getDate()) / (1000 * 60 * 60 * 24); // Age in days
      if (age >= options.emailOlderThan) {
        totalMessagesProcessed++;
        Logger.log('Processing message: Subject="' + message.getSubject() + '" From="' + message.getFrom() + '" Date=' + message.getDate() + ' (Age: ' + Math.round(age) + ' days)');

        // Forward if needed (including attachments)
        if (options.forwardTo) {
          if (sandboxMode) {
            Logger.log('[SANDBOX] Would forward email with attachments to ' + options.forwardTo);
            totalForwarded++;
          } else {
            try {
              message.forward(options.forwardTo);
              Logger.log('Forwarded email with attachments to ' + options.forwardTo);
              totalForwarded++;
            } catch (e) {
              Logger.log('Error forwarding message: ' + e.message);
            }
          }
        }

        // Perform action (label or delete)
        if (sandboxMode) {
          if (action === 'label') {
            if (isSystemLabel && newLabel.toUpperCase() === 'INBOX') {
              Logger.log('[SANDBOX] Would move email back to INBOX');
            } else {
              Logger.log('[SANDBOX] Would remove ALL current labels and apply label: ' + newLabel);
            }
          } else {
            Logger.log('[SANDBOX] Would delete email.');
          }
          totalActioned++;
        } else {
          try {
            var thread = message.getThread();
            
            if (action === 'label') {
              // Get current labels
              var currentLabels = thread.getLabels();
              Logger.log('Current labels: ' + currentLabels.map(function(l) { return l.getName(); }).join(', '));
              
              if (isSystemLabel && newLabel.toUpperCase() === 'INBOX') {
                // Special handling for moving back to INBOX
                // Remove all user labels but keep system labels, then add to inbox
                currentLabels.forEach(function(label) {
                  var labelName = label.getName();
                  // Only remove custom user labels, not system labels
                  if (systemLabels.indexOf(labelName.toUpperCase()) === -1) {
                    try {
                      thread.removeLabel(label);
                      Logger.log('Removed custom label: ' + labelName);
                    } catch (removeError) {
                      Logger.log('Could not remove label "' + labelName + '": ' + removeError.message);
                    }
                  }
                });
                
                // Move back to inbox
                thread.moveToInbox();
                Logger.log('Moved email back to INBOX');
                
              } else {
                // Handle custom labels - remove ALL labels and add new one
                currentLabels.forEach(function(label) {
                  var labelName = label.getName();
                  try {
                    thread.removeLabel(label);
                    Logger.log('Removed label: ' + labelName);
                  } catch (removeError) {
                    Logger.log('Could not remove label "' + labelName + '": ' + removeError.message);
                  }
                });
                
                // Remove from INBOX if it was there
                try {
                  thread.moveToArchive(); // This removes the INBOX label
                  Logger.log('Removed from INBOX using moveToArchive()');
                } catch (archiveError) {
                  Logger.log('moveToArchive() failed: ' + archiveError.message);
                }
                
                // Add the new custom label
                thread.addLabel(targetLabel);
                Logger.log('Applied new label: ' + newLabel);
              }
              
            } else if (action === 'delete') {
              // Delete = Move to Trash
              thread.moveToTrash();
              Logger.log('Deleted email (moved to Trash).');
            }
            totalActioned++;
          } catch (e) {
            Logger.log('Error ' + action + 'ing message: ' + e.message);
          }
        }
      }
    });
  });

  var actionWord = action === 'label' ? 'labeled' : 'deleted';
  Logger.log('Completed. Total processed: ' + totalMessagesProcessed + ', forwarded: ' + totalForwarded + ', ' + actionWord + ': ' + totalActioned);
  if (sandboxMode) {
    Logger.log('*** SANDBOX MODE - NO ACTUAL ACTIONS WERE PERFORMED ***');
  }
}
