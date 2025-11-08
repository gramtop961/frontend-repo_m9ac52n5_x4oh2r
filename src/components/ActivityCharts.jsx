import React from 'react';

function Bars({ data }) {
  // Simple inline bar chart without external libs
  const max = Math.max(1, ...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-28 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex-1">
          <div
            title={`${d.label}: ${d.value}`}
            className="w-full bg-gradient-to-t from-gray-900 to-gray-700 rounded"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ActivityCharts({ dailyCommits = [], topRepos = [] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 py-6">
      <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Commits by Day</h3>
          <span className="text-xs text-gray-500">Last 14 days</span>
        </div>
        <Bars data={dailyCommits} />
        <div className="mt-3 grid grid-cols-7 gap-2 text-xs text-gray-500">
          {dailyCommits.map((d, i) => (
            <span key={i} className="truncate text-center">{d.label}</span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Top Repositories</h3>
          <span className="text-xs text-gray-500">By commits</span>
        </div>
        <ul className="space-y-3">
          {topRepos.length === 0 ? (
            <li className="text-sm text-gray-500">No data</li>
          ) : (
            topRepos.map((r, i) => (
              <li key={i} className="flex items-center justify-between">
                <div className="truncate">
                  <p className="font-medium truncate">{r.name}</p>
                  <p className="text-xs text-gray-500 truncate">{r.owner}</p>
                </div>
                <div className="text-sm font-semibold">{r.commits}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
