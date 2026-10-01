/**
 * =========================================================================
 * GOOGLE APPS SCRIPT FOR "THE INSURANCE HUB" CUSTOMER FEEDBACK INTEGRATION
 * =========================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet (or create a new one named "The Insurance Hub - Customer Feedback").
 * 2. In Google Sheets, click: Extensions > Apps Script.
 * 3. Replace all existing code in the script editor with this complete code.
 * 4. Click the Save icon (Floppy disk).
 * 5. Click: Deploy > New deployment.
 * 6. Under "Select type", choose "Web app".
 * 7. In the configuration:
 *      - Description: "Customer Feedback Form API"
 *      - Execute as: "Me" (your Google account)
 *      - Who has access: "Anyone" (allows website visitors to submit feedback without logging in)
 * 8. Click "Deploy".
 * 9. Authorize the required Google Sheets permissions if prompted.
 * 10. Copy the generated "Web App URL" (ends with /exec).
 * 11. Paste that URL into src/components/FeedbackForm.jsx:
 *      export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
 * 
 * =========================================================================
 */

// Exact Google Spreadsheet ID provided for The Insurance Hub
var SPREADSHEET_ID = "14uBdsW1CN8FD_Zc0LBXX8hjfgEop9X2TZIFodT9WmxE";

// Target sheet tab name (will use this tab or default to first tab in spreadsheet)
var SHEET_NAME = "Customer Feedback";

// Required column headers in exact sequence
var HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone Number",
  "Profession",
  "Other Profession",
  "Service / Product Purchased",
  "Other Service",
  "Feedback Message"
];

/**
 * Handles incoming POST requests from the website feedback form
 */
function doPost(e) {
  // Use a lock to prevent concurrent write issues
  var lock = LockService.getScriptLock();
  var hasLock = lock.tryLock(10000); // Wait up to 10 seconds for concurrent write to complete

  try {
    if (!hasLock) {
      return createJsonResponse({
        status: "error",
        message: "Server is currently busy processing other requests. Please try again."
      }, 503);
    }

    // 1. Parse submitted data (supports text/plain JSON, application/json, and FormData)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. Extract and sanitize fields
    var fullName = sanitize(data.fullName);
    var email = sanitize(data.email);
    var phone = sanitize(data.phone);
    var profession = sanitize(data.profession);
    var otherProfession = sanitize(data.otherProfession);
    var service = sanitize(data.service);
    var otherService = sanitize(data.otherService);
    var feedbackMessage = sanitize(data.feedbackMessage);

    // 3. Server-side Validation
    if (!fullName || fullName.length < 2) {
      return createJsonResponse({ status: "error", message: "Full Name is required." });
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return createJsonResponse({ status: "error", message: "A valid Email Address is required." });
    }

    if (!phone) {
      return createJsonResponse({ status: "error", message: "Phone Number is required." });
    }

    if (!profession) {
      return createJsonResponse({ status: "error", message: "Profession is required." });
    }
    if (profession === "Other" && !otherProfession) {
      return createJsonResponse({ status: "error", message: "Please specify your profession." });
    }

    if (!service) {
      return createJsonResponse({ status: "error", message: "Service / Product Purchased is required." });
    }
    if (service === "Other" && !otherService) {
      return createJsonResponse({ status: "error", message: "Please specify the service." });
    }

    if (!feedbackMessage || feedbackMessage.length < 5) {
      return createJsonResponse({ status: "error", message: "Feedback Message is required." });
    }

    // 4. Access Google Sheet (uses exact ID or active sheet fallback)
    var spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (idErr) {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!spreadsheet) {
      return createJsonResponse({
        status: "error",
        message: "Spreadsheet not accessible. Please ensure SPREADSHEET_ID is correct and accessible."
      });
    }

    // Use sheet tab if it exists, otherwise use the first sheet tab
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.getSheets()[0] || spreadsheet.insertSheet(SHEET_NAME);
    }

    // 5. Initialize Header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      // Format header row with bold text and dark blue fill matching brand
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e293b"); // Slate-900 / dark blue
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // 6. Generate server-side Timestamp in Indian Standard Time (IST)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    // 7. Prepare Row Data
    // Rules:
    // If profession !== "Other", otherProfession is blank ""
    // If service !== "Other", otherService is blank ""
    var row = [
      timestamp,
      fullName,
      email,
      phone,
      profession,
      profession === "Other" ? otherProfession : "",
      service,
      service === "Other" ? otherService : "",
      feedbackMessage
    ];

    // 8. Append Row to Sheet
    sheet.appendRow(row);

    // Auto-fit column widths for readability on initial rows
    if (sheet.getLastRow() <= 5) {
      for (var col = 1; col <= HEADERS.length; col++) {
        sheet.autoResizeColumn(col);
      }
    }

    return createJsonResponse({
      status: "success",
      message: "Feedback submitted successfully."
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles GET requests to verify health / connectivity of the Web App
 */
function doGet(e) {
  return createJsonResponse({
    status: "online",
    service: "The Insurance Hub - Customer Feedback Form Endpoint",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
  });
}

/**
 * Sanitizes input to string, trimming excess spaces
 */
function sanitize(val) {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

/**
 * Helper to build JSON ContentService response with proper MIME type
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
