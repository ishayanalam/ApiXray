// src/components/Dashboard.jsx
import { ScanForm } from "./ScanForm";
import { EndpointsTable } from "./EndpointsTable";
import { FindingsTable } from "./FindingsTable";
import { useScan } from "../hooks/useScan";
import { getScanReport } from "../api/client";

export function Dashboard() {
  const { status, message, endpoints, findings, error, triggerScan } =
    useScan();

  async function handleDownloadReport() {
    try {
      const report = await getScanReport();
      const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "api-sentry-report.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to download report:", e);
      alert("Failed to download report.");
    }
  }

  const statusStyles =
    status === "running"
      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
      : status === "error"
        ? "bg-red-500/10 text-red-300 border border-red-500/30"
        : "bg-slate-500/10 text-slate-300 border border-slate-500/30";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            CSE 4419 • Network Security
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            API Sentry
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
            Automated API Reconnaissance & Vulnerability Pipeline for
            discovering endpoints, checking common misconfigurations, and
            generating security reports.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Scan Target</h2>
                  <p className="text-sm text-slate-400">
                    Enter an API URL to start reconnaissance.
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles}`}
                >
                  Status: {status}
                </span>
              </div>

              <ScanForm onScanStart={triggerScan} />

              {message && (
                <p className="mt-4 text-sm text-slate-400">{message}</p>
              )}

              {error && (
                <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  Error: {error}
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Discovered Endpoints
                  </h2>
                  <p className="text-sm text-slate-400">
                    {endpoints.length} endpoint
                    {endpoints.length === 1 ? "" : "s"} found.
                  </p>
                </div>
              </div>
              <EndpointsTable endpoints={endpoints} />
            </section>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Findings</h2>
                  <p className="text-sm text-slate-400">
                    {findings.length} issue{findings.length === 1 ? "" : "s"}{" "}
                    detected.
                  </p>
                </div>
              </div>
              <FindingsTable findings={findings} />
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
              <h2 className="text-lg font-semibold">Export Report</h2>
              <p className="mt-2 text-sm text-slate-400">
                Download a JSON report with all endpoints and findings.
              </p>

              <button
                onClick={handleDownloadReport}
                disabled={findings.length === 0}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download JSON
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
