// src/components/EndpointsTable.jsx
export function EndpointsTable({ endpoints }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/90">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Path
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Method
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Source
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {endpoints.map((ep, idx) => (
            <tr key={idx} className="hover:bg-slate-900/60">
              <td className="px-4 py-3 text-sm text-slate-100">{ep.path}</td>
              <td className="px-4 py-3 text-sm">
                <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
                  {ep.method}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-400">{ep.source}</td>
            </tr>
          ))}
          {endpoints.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                No endpoints discovered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
