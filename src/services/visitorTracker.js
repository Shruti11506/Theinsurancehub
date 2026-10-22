/**
 * Visitor Tracking Service for The Insurance Hub
 * Tracks website views and logs analytics directly to the connected Google Spreadsheet.
 */

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrH_C0J2UOz2ZQwLIN1eJCSKNMwHjjp-JoxqMHmQXjuJLFPdUaklAbIfimwcXX1Ymj/exec";

// Local storage & session storage keys
const VISITOR_ID_KEY = "theinsurancehub_vid";
const SESSION_ID_KEY = "theinsurancehub_sid";
const LAST_PAGE_VIEW_PREFIX = "theinsurancehub_view_";

/**
 * Generate a random unique ID
 */
function generateId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Detect browser name from User Agent
 */
function detectBrowser() {
  const ua = navigator.userAgent;
  if (/Edg\//i.test(ua)) return "Microsoft Edge";
  if (/Chrome\//i.test(ua) && !/Chromium\//i.test(ua)) return "Google Chrome";
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return "Safari";
  if (/Firefox\//i.test(ua)) return "Mozilla Firefox";
  if (/OPR\//i.test(ua) || /Opera\//i.test(ua)) return "Opera";
  return "Browser";
}

/**
 * Detect device type
 */
function detectDevice() {
  const width = window.innerWidth || window.screen.width || 0;
  const ua = navigator.userAgent || '';
  const isMobileUa = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua);
  const isTabletUa = /Tablet|iPad/i.test(ua);

  if (isTabletUa || (width >= 640 && width <= 1024 && isMobileUa)) {
    return "Tablet";
  }
  if (isMobileUa || width < 768) {
    return "Mobile";
  }
  return "Desktop";
}

/**
 * Track a page view event and sync with the Google Spreadsheet backend
 * @param {string} pageName - Optional label for current page/section
 */
export async function trackPageView(pageName = 'Home') {
  if (typeof window === 'undefined' || !navigator) return;

  try {
    // 1. Get or create Persistent Visitor ID
    let isNewVisitor = false;
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = generateId('usr');
      try {
        localStorage.setItem(VISITOR_ID_KEY, visitorId);
        isNewVisitor = true;
      } catch (e) {
        // Storage might be disabled in private mode
      }
    }

    // 2. Get or create Session ID
    let sessionId = '';
    try {
      sessionId = sessionStorage.getItem(SESSION_ID_KEY);
      if (!sessionId) {
        sessionId = generateId('ses');
        sessionStorage.setItem(SESSION_ID_KEY, sessionId);
      }
    } catch (e) {
      sessionId = 'temp_session';
    }

    // 3. Prevent duplicate recording of the same page in the same session within 10 minutes
    const pageKey = `${LAST_PAGE_VIEW_PREFIX}${pageName}`;
    const now = Date.now();
    try {
      const lastRecorded = sessionStorage.getItem(pageKey);
      if (lastRecorded && now - parseInt(lastRecorded, 10) < 10 * 60 * 1000) {
        // Already recorded recently in this session, skip duplicate hit
        return;
      }
      sessionStorage.setItem(pageKey, String(now));
    } catch (e) {
      // Ignore storage errors
    }

    // 4. Gather visitor environment details
    const device = detectDevice();
    const browser = detectBrowser();
    const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
    const referrer = document.referrer ? (document.referrer.length > 100 ? document.referrer.substring(0, 100) : document.referrer) : "Direct / Bookmark";
    const language = navigator.language || navigator.userLanguage || "en";

    const payload = {
      action: "track_pageview",
      visitorId: visitorId || 'anonymous',
      sessionId: sessionId || 'unknown',
      visitorType: isNewVisitor ? "New Visitor" : "Returning Visitor",
      page: pageName,
      referrer: referrer,
      device: device,
      browser: browser,
      screenResolution: screenResolution,
      language: language
    };

    // 5. Send non-blocking request to Google Apps Script Web App
    if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("AKfycbx...")) {
      // Non-blocking fetch with no-cors to avoid blocking UI rendering
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Fallback to GET query string if POST fails
        try {
          const params = new URLSearchParams(payload);
          fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, { mode: 'no-cors' }).catch(() => {});
        } catch (_) {}
      });
    }

    // Also notify python backend if deployed/accessible
    try {
      fetch("/api/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (_) {}

  } catch (err) {
    // Fail silently so visitor experience is never interrupted
  }
}
