// src/components/ScanForm.jsx
import { useState } from "react";

export function ScanForm({ onScanStart }) {
  const [target, setTarget] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!target.trim()) return;
    onScanStart(target.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 md:flex-row md:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="target"
          className="block text-xs font-medium uppercase tracking-wide text-slate-400 mb-1"
        >
          Target API URL
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-slate-500">
            https://
          </span>
          <input
            id="target"
            type="text"
            placeholder="api.example.com"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 pl-16 text-sm text-slate-50 shadow-sm outline-none 
                       focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/60 placeholder:text-slate-600"
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-500/40 hover:brightness-110"
      >
        Start Scan
      </button>
    </form>
  );
}
