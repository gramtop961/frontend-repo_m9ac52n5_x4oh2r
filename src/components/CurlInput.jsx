import React, { useState } from 'react';
import { Terminal, Play } from 'lucide-react';

function extractUrlFromCurl(curl) {
  try {
    // Try to find first http(s) URL possibly wrapped in quotes
    const match = curl.match(/https?:\/\/[\w\-.:/?#@%&=+,;~()*'!]+/i);
    return match ? match[0] : '';
  } catch {
    return '';
  }
}

export default function CurlInput({ onExecute }) {
  const [curl, setCurl] = useState('');
  const [token, setToken] = useState('');

  const handleRun = async (e) => {
    e.preventDefault();
    const url = extractUrlFromCurl(curl);
    if (!url) return;

    const headers = { 'Accept': 'application/vnd.github+json' };
    if (token.trim()) headers['Authorization'] = `Bearer ${token.trim()}`;

    onExecute({ url, headers });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-gray-700">
          <Terminal size={18} />
          <span className="font-medium">Paste a GitHub curl command</span>
        </div>
        <form onSubmit={handleRun} className="space-y-3">
          <textarea
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
            placeholder="curl -H \"Accept: application/vnd.github+json\" https://api.github.com/repos/vercel/next.js/commits?per_page=50"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
          />
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Optional: GitHub token for higher rate limits"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
            />
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
              <Play size={16} /> Run
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
