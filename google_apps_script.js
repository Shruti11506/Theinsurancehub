/**
 * =========================================================================
 * GOOGLE APPS SCRIPT FOR "THE INSURANCE HUB"
 * - Website Visitor Analytics & Page Views Tracking
 * - Customer Feedback & Review Submissions
 * =========================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet (Spreadsheet ID: 14uBdsW1CN8FD_Zc0LBXX8hjfgEop9X2TZIFodT9WmxE).
 * 2. In Google Sheets, click: Extensions > Apps Script.
 * 3. Replace all existing code in the script editor with this complete code.
 * 4. Click the Save icon (Floppy disk).
 * 5. Click: Deploy > Manage deployments > Edit > New version > Deploy.
 *    (Or Deploy > New deployment > Web app > Execute as "Me", Who has access "Anyone").
 * 6. Authorize required Google Sheets permissions if prompted.
 * 
 * =========================================================================
 */

// Exact Google Spreadsheet ID for The Insurance Hub
var SPREADSHEET_ID = "14uBdsW1CN8FD_Zc0LBXX8hjfgEop9X2TZIFodT9WmxE";

// Sheet Tab Names
var FEEDBACK_SHEET_NAME = "Customer Feedback";
var VIEWS_SHEET_NAME = "Website Views";
var DASHBOARD_SHEET_NAME = "Traffic Dashboard";

// Column headers for Customer Feedback
var FEEDBACK_HEADERS = [
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

// Column headers for Website Views
var VIEW_HEADERS = [
  "Timestamp (IST)",
  "Visitor Type",
  "Page / Section",
  "Device",
  "Browser",
  "Screen Resolution",
  "Referrer Source",
  "Visitor ID",
  "Session ID",
  "Language"
];

/**
 * Handles incoming POST requests (Visitor Tracking & Feedback Form)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = lock.tryLock(15000); // Wait up to 15s for concurrent write

  try {
    if (!hasLock) {
      return createJsonResponse({
        status: "error",
        message: "Server is busy processing other requests. Please try again."
      }, 503);
    }

    // 1. Parse submitted data
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

    // 2. Access Google Spreadsheet
    var spreadsheet = getSpreadsheet();
    if (!spreadsheet) {
      return createJsonResponse({
        status: "error",
        message: "Spreadsheet not accessible. Check SPREADSHEET_ID permissions."
      });
    }

    // 3. Route request by action type
    var action = (data.action || data.type || "").toString().toLowerCase();

    if (action === "track_pageview" || action === "pageview" || action === "view") {
      return handlePageView(data, spreadsheet);
    }

    // Default to Feedback submission
    return handleFeedback(data, spreadsheet);

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
 * Handles GET requests (Health check, Visitor tracking fallback, and Stats)
 */
function doGet(e) {
  try {
    var params = (e && e.parameter) ? e.parameter : {};
    var action = (params.action || "").toString().toLowerCase();

    if (action === "track_pageview" || action === "pageview" || action === "view") {
      var spreadsheet = getSpreadsheet();
      if (spreadsheet) {
        return handlePageView(params, spreadsheet);
      }
    }

    if (action === "stats" || action === "get_stats") {
      return getAnalyticsStats();
    }

    return createJsonResponse({
      status: "online",
      service: "The Insurance Hub API Endpoint (Analytics & Feedback)",
      timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
    });
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  }
}

/**
 * Records a page view into the "Website Views" sheet and updates "Traffic Dashboard"
 */
function handlePageView(data, spreadsheet) {
  var viewsSheet = spreadsheet.getSheetByName(VIEWS_SHEET_NAME);
  if (!viewsSheet) {
    viewsSheet = spreadsheet.insertSheet(VIEWS_SHEET_NAME);
  }

  // Initialize header row if empty
  if (viewsSheet.getLastRow() === 0) {
    viewsSheet.appendRow(VIEW_HEADERS);
    var headerRange = viewsSheet.getRange(1, 1, 1, VIEW_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0f172a"); // Dark Navy Slate
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    viewsSheet.setFrozenRows(1);
  }

  // Server-side timestamp in Indian Standard Time (IST)
  var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

  var visitorType = sanitize(data.visitorType) || (data.isNewVisitor === "true" || data.isNewVisitor === true ? "New Visitor" : "Returning Visitor");
  var page = sanitize(data.page) || "Home";
  var device = sanitize(data.device) || "Desktop";
  var browser = sanitize(data.browser) || "Browser";
  var screenResolution = sanitize(data.screenResolution || data.screenSize) || "-";
  var referrer = sanitize(data.referrer) || "Direct";
  var visitorId = sanitize(data.visitorId) || "-";
  var sessionId = sanitize(data.sessionId) || "-";
  var language = sanitize(data.language) || "en";

  var row = [
    timestamp,
    visitorType,
    page,
    device,
    browser,
    screenResolution,
    referrer,
    visitorId,
    sessionId,
    language
  ];

  viewsSheet.appendRow(row);

  // Auto-resize first few columns if needed
  if (viewsSheet.getLastRow() <= 5) {
    for (var i = 1; i <= VIEW_HEADERS.length; i++) {
      viewsSheet.autoResizeColumn(i);
    }
  }

  // Ensure Traffic Dashboard summary tab exists
  setupTrafficDashboard(spreadsheet);

  return createJsonResponse({
    status: "success",
    message: "Page view logged successfully.",
    timestamp: timestamp
  });
}

/**
 * Initializes and styles the "Traffic Dashboard" summary sheet
 */
function setupTrafficDashboard(spreadsheet) {
  try {
    var dashboardSheet = spreadsheet.getSheetByName(DASHBOARD_SHEET_NAME);
    if (!dashboardSheet) {
      dashboardSheet = spreadsheet.insertSheet(DASHBOARD_SHEET_NAME, 0); // Put dashboard as first tab
    }

    // Only configure if not already initialized
    if (dashboardSheet.getRange("A1").getValue() !== "THE INSURANCE HUB - REAL-TIME VISITOR DASHBOARD") {
      dashboardSheet.clear();

      // Title Banner
      dashboardSheet.getRange("A1:F1").merge();
      var titleCell = dashboardSheet.getRange("A1");
      titleCell.setValue("THE INSURANCE HUB - REAL-TIME VISITOR DASHBOARD");
      titleCell.setFontSize(14);
      titleCell.setFontWeight("bold");
      titleCell.setBackground("#1e293b");
      titleCell.setFontColor("#ffffff");
      titleCell.setHorizontalAlignment("center");

      // Metric Headers
      var headers = [
        ["Total Page Views", "Unique Visitors", "New Visitors", "Returning Visitors", "Mobile Visitors", "Desktop Visitors"]
      ];
      dashboardSheet.getRange("A3:F3").setValues(headers);
      var metricHeaderRange = dashboardSheet.getRange("A3:F3");
      metricHeaderRange.setFontWeight("bold");
      metricHeaderRange.setBackground("#f1f5f9");
      metricHeaderRange.setFontColor("#0f172a");
      metricHeaderRange.setHorizontalAlignment("center");

      // Dynamic Live Formulas linking to 'Website Views'
      var formulaRow = [
        [
          "=IFERROR(COUNTA('Website Views'!A2:A), 0)",
          "=IFERROR(COUNTUNIQUE('Website Views'!H2:H), 0)",
          "=IFERROR(COUNTIF('Website Views'!B2:B, \"New Visitor*\"), 0)",
          "=IFERROR(COUNTIF('Website Views'!B2:B, \"Returning Visitor*\"), 0)",
          "=IFERROR(COUNTIF('Website Views'!D2:D, \"Mobile*\"), 0)",
          "=IFERROR(COUNTIF('Website Views'!D2:D, \"Desktop*\"), 0)"
        ]
      ];
      dashboardSheet.getRange("A4:F4").setFormulas(formulaRow);
      var formulaRange = dashboardSheet.getRange("A4:F4");
      formulaRange.setFontSize(16);
      formulaRange.setFontWeight("bold");
      formulaRange.setFontColor("#f28b24"); // Brand Orange
      formulaRange.setHorizontalAlignment("center");

      // Note Row
      dashboardSheet.getRange("A6:F6").merge();
      var noteCell = dashboardSheet.getRange("A6");
      noteCell.setValue("Data updates automatically as visitors browse the website. See 'Website Views' tab for detailed log.");
      noteCell.setFontStyle("italic");
      noteCell.setFontColor("#64748b");
      noteCell.setHorizontalAlignment("center");

      // Auto-fit column widths
      for (var c = 1; c <= 6; c++) {
        dashboardSheet.setColumnWidth(c, 160);
      }
    }
  } catch (dashErr) {
    // Silently continue if dashboard setup faces permission limits
  }
}

/**
 * Handles customer feedback submissions
 */
function handleFeedback(data, spreadsheet) {
  var fullName = sanitize(data.fullName);
  var email = sanitize(data.email);
  var phone = sanitize(data.phone);
  var profession = sanitize(data.profession);
  var otherProfession = sanitize(data.otherProfession);
  var service = sanitize(data.service);
  var otherService = sanitize(data.otherService);
  var feedbackMessage = sanitize(data.feedbackMessage);

  // Validation
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

  var sheet = spreadsheet.getSheetByName(FEEDBACK_SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(FEEDBACK_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FEEDBACK_HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, FEEDBACK_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1e293b");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

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

  sheet.appendRow(row);

  if (sheet.getLastRow() <= 5) {
    for (var col = 1; col <= FEEDBACK_HEADERS.length; col++) {
      sheet.autoResizeColumn(col);
    }
  }

  return createJsonResponse({
    status: "success",
    message: "Feedback submitted successfully."
  });
}

/**
 * Returns basic aggregated stats as JSON
 */
function getAnalyticsStats() {
  try {
    var spreadsheet = getSpreadsheet();
    var viewsSheet = spreadsheet.getSheetByName(VIEWS_SHEET_NAME);
    var totalViews = viewsSheet ? Math.max(0, viewsSheet.getLastRow() - 1) : 0;
    return createJsonResponse({
      status: "success",
      totalViews: totalViews,
      timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
    });
  } catch (e) {
    return createJsonResponse({ status: "error", message: e.toString() });
  }
}

/**
 * Helper to obtain spreadsheet reference
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (idErr) {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
}

/**
 * Sanitizes input
 */
function sanitize(val) {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

/**
 * Helper to build JSON ContentService response with proper MIME type
 */
function createJsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
