// src/hooks/useScan.js
import { useEffect, useState, useCallback } from "react";
import { getScanResults, getScanStatus, startScan } from "../api/client";

/**
 * Manages scan status, endpoints, findings, and polling.
 */
export function useScan() {
  const [status, setStatus] = useState("idle"); // idle | running | done | error
  const [message, setMessage] = useState("");
  const [endpoints, setEndpoints] = useState([]);
  const [findings, setFindings] = useState([]);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
    try {
      const s = await getScanStatus();
      setStatus(s.status || "idle");
      setMessage(s.message || "");
    } catch (e) {
      setStatus("error");
      setMessage(e.message || "Failed to get status");
    }
  }, []);

  const fetchResults = useCallback(async () => {
    try {
      const res = await getScanResults();
      setEndpoints(res.endpoints || []);
      setFindings(res.findings || []);
    } catch (e) {
      setError(e.message || "Failed to get results");
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchResults, 2000);
    return () => clearInterval(interval);
  }, [fetchStatus, fetchResults]);

  async function triggerScan(target) {
    try {
      setError(null);
      await startScan(target);
      setStatus("running");
      setMessage("Scan in progress...");
      // Optional: immediately fetch results once
      fetchResults();
    } catch (e) {
      setStatus("error");
      setMessage(e.message || "Failed to start scan");
    }
  }

  return {
    status,
    message,
    endpoints,
    findings,
    error,
    triggerScan,
  };
}
