import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import CurlInput from './components/CurlInput';
import StatsCards from './components/StatsCards';
import ActivityCharts from './components/ActivityCharts';

function analyzeCommits(data, sourceUrl) {
  if (!Array.isArray(data)) return { stats: {}, daily: [], topRepos: [] };
  // Filter objects that look like commit objects
  const commits = data.filter((d) => d && (d.commit || d.sha));
  if (commits.length === 0) return { stats: {}, daily: [], topRepos: [] };

  // Repo inference from URL: https://api.github.com/repos/{owner}/{repo}/commits
  let repoName = '';
  let repoOwner = '';
  try {
    const u = new URL(sourceUrl);
    const parts = u.pathname.split('/').filter(Boolean);
    const repoIdx = parts.findIndex((p) => p === 'repos');
    if (repoIdx !== -1 && parts.length > repoIdx + 2) {
      repoOwner = parts[repoIdx + 1];
      repoName = parts[repoIdx + 2];
    }
  } catch {}

  // Daily aggregation (last 14 days)
  const map = new Map();
  const uniqueUsers = new Set();

  commits.forEach((c) => {
    const dateStr = (c.commit?.author?.date || c.commit?.committer?.date || c.author?.date || '').slice(0, 10);
    if (dateStr) map.set(dateStr, (map.get(dateStr) || 0) + 1);
    const userLogin = c.author?.login || c.commit?.author?.name || c.commit?.committer?.name;
    if (userLogin) uniqueUsers.add(userLogin);
  });

  const today = new Date();
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    return { label: key.slice(5), value: map.get(key) || 0 };
  });

  const stats = {
    users: uniqueUsers.size,
    commits: commits.length,
    repos: repoName ? 1 : 0,
    orgs: 0,
  };

  const topRepos = repoName
    ? [{ name: repoName, owner: repoOwner, commits: commits.length }]
    : [];

  return { stats, daily: days, topRepos };
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [raw, setRaw] = useState(null);
  const [sourceUrl, setSourceUrl] = useState('');

  const { stats, daily, topRepos } = useMemo(() => {
    if (!raw) return { stats: { users: 0, commits: 0, repos: 0, orgs: 0 }, daily: [], topRepos: [] };
    return analyzeCommits(raw, sourceUrl);
  }, [raw, sourceUrl]);

  const handleExecute = async ({ url, headers }) => {
    setLoading(true);
    setError('');
    setRaw(null);
    setSourceUrl(url);
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed (${res.status}): ${text.slice(0, 200)}`);
      }
      const json = await res.json();
      setRaw(json);
    } catch (e) {
      setError(e.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
      <Header />

      <main className="pb-10">
        <CurlInput onExecute={handleExecute} />

        {error && (
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
              {error}
            </div>
          </div>
        )}

        <div className="my-4" />

        <StatsCards stats={stats} loading={loading} />

        <ActivityCharts dailyCommits={daily} topRepos={topRepos} />

        {!raw && (
          <section className="mx-auto max-w-6xl px-4 py-8">
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
              Paste a GitHub curl that returns commits for a repository to see insights. For example: https://api.github.com/repos/vercel/next.js/commits?per_page=50
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
