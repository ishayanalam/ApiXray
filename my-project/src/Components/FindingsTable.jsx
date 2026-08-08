// src/components/FindingsTable.jsx
function severityClasses(severity) {
  switch (severity) {
    case "High":
      return "bg-red-500/15 text-red-300 border border-red-500/30";
    case "Medium":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
    case "Low":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 border border-slate-500/30";
  }
}

export function FindingsTable({ findings }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/90">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Endpoint
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Issue
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Severity
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {findings.map((f, idx) => (
            <tr key={idx} className="hover:bg-slate-900/60">
              <td className="px-4 py-3 text-sm text-slate-100">{f.endpoint}</td>
              <td className="px-4 py-3 text-sm text-slate-100">{f.issue}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={
                    "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                    severityClasses(f.severity)
                  }
                >
                  {f.severity}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-300">
                {f.description}
              </td>
            </tr>
          ))}
          {findings.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                No findings yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
