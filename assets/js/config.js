/**
 * CLEVIX TECH - GLOBAL CONFIGURATION & API CLIENT
 * 
 * Update BACKEND_URL below to switch between Localhost and Production.
 * Example Local:       https://server.kyragroupindia.com
 * Example Production:  https://your-api-domain.com
 */

window.CONFIG = {
  // Backend API Base URL
  BACKEND_URL: "https://server.kyragroupindia.com",

  // Project identification name for email alerts
  PROJECT_NAME: "Clevix-Tech",

  // Lead Submission Endpoint
  CONTACT_API_ENDPOINT: "/api/contact",
};

/**
 * Reusable Lead & Contact Form Submission Utility
 * Sends form payload to the backend API and dispatches email alert
 * 
 * @param {Object} payload - { name, phone, email, message, service, budget, ... }
 * @returns {Promise<Object>} API response JSON
 */
window.sendContactInquiry = async function (payload) {
  const backendBase = (window.CONFIG && window.CONFIG.BACKEND_URL)
    ? window.CONFIG.BACKEND_URL.replace(/\/+$/, "")
    : "https://server.kyragroupindia.com";

  const endpoint = (window.CONFIG && window.CONFIG.CONTACT_API_ENDPOINT)
    ? window.CONFIG.CONTACT_API_ENDPOINT
    : "/api/contact";

  const apiUrl = `${backendBase}${endpoint}`;

  // Assemble full message with service and budget if provided
  let fullMessage = payload.message || "";
  if (payload.service) {
    fullMessage = `[Service: ${payload.service}]` + (payload.budget ? ` [Budget: ${payload.budget}] ` : " ") + fullMessage;
  }

  const bodyData = {
    name: payload.name || payload.full_name || "",
    full_name: payload.name || payload.full_name || "",
    phone: payload.phone || payload.mobile || "",
    email: payload.email || "",
    project_name: payload.project_name || (window.CONFIG && window.CONFIG.PROJECT_NAME) || "Clevix-Tech",
    service: payload.service || "",
    budget: payload.budget || "",
    message: fullMessage.trim(),
    page_url: payload.page_url || window.location.href,
    source: payload.source || "Website Form",
  };

  console.log("📤 [Clevix-Tech API] Submitting form payload to:", apiUrl, bodyData);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const errorMsg = data.message || `Submission failed with status ${response.status}. Please try again.`;
    console.error("❌ [Clevix-Tech API Error]:", errorMsg);
    throw new Error(errorMsg);
  }

  console.log("✅ [Clevix-Tech API Success]:", data);
  return data;
};
