// src/api/client.js

const BASE_URL = "http://localhost:8000";

/**
 * Start a scan for a given target URL.
 */
export async function startScan(target) {
  // TODO: replace with real backend call when FastAPI is ready:
  //
  // const res = await fetch(`${BASE_URL}/api/scan`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ target }),
  // });
  // if (!res.ok) throw new Error("Failed to start scan");
  // return res.json();

  // Mock response for now:
  console.log("Mock startScan called with target:", target);
  return { status: "started" };
}

/**
 * Get current scan status.
 */
export async function getScanStatus() {
  // TODO: real backend call:
  //
  // const res = await fetch(`${BASE_URL}/api/scan/status`);
  // if (!res.ok) throw new Error("Failed to get scan status");
  // return res.json();

  // Mock:
  return { status: "done", message: "Mock scan finished." };
}

/**
 * Get scan results (endpoints + findings).
 */
export async function getScanResults() {
  // TODO: real backend call:
  //
  // const res = await fetch(`${BASE_URL}/api/scan/results`);
  // if (!res.ok) throw new Error("Failed to get scan results");
  // return res.json();

  // Mock data:
  return {
    endpoints: [
      { path: "/api/login", method: "POST", source: "crawl" },
      { path: "/api/users", method: "GET", source: "openapi" },
      { path: "/api/admin", method: "GET", source: "crawl" },
    ],
    findings: [
      {
        endpoint: "/api/users",
        issue: "Possible unauthenticated access to sensitive endpoint",
        severity: "High",
        description: "GET /api/users returned 200 without authentication.",
      },
      {
        endpoint: "/api/login",
        issue: "Insecure transport (HTTP instead of HTTPS)",
        severity: "Medium",
        description: "API is accessible over plain HTTP.",
      },
      {
        endpoint: "/api/admin",
        issue: "Verbose error messages leak internal details",
        severity: "Medium",
        description: "Error responses include stack traces and debug info.",
      },
    ],
  };
}

/**
 * Get a scan report (JSON).
 */
export async function getScanReport() {
  // TODO: real backend call:
  //
  // const res = await fetch(`${BASE_URL}/api/scan/report`);
  // if (!res.ok) throw new Error("Failed to get report");
  // return res.json();

  const results = await getScanResults();
  return {
    status: "done",
    message: "Mock report",
    endpoints_count: results.endpoints.length,
    findings_count: results.findings.length,
    endpoints: results.endpoints,
    findings: results.findings,
  };
}
