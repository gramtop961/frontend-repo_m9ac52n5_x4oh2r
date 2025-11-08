import React, { useState } from 'react';
import { Search, User, GitBranch, Building2 } from 'lucide-react';

export default function SearchPanel({ onSearch }) {
  const [mode, setMode] = useState('user');
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch({ mode, query: query.trim() });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('user')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${mode==='user' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
              aria-label="User mode"
            >
              <User size={16} /> User
            </button>
            <button
              type="button"
              onClick={() => setMode('repo')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${mode==='repo' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
              aria-label="Repository mode"
            >
              <GitBranch size={16} /> Repo
            </button>
            <button
              type="button"
              onClick={() => setMode('org')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${mode==='org' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}
              aria-label="Organization mode"
            >
              <Building2 size={16} /> Org
            </button>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode==='user' ? 'e.g. torvalds' : mode==='repo' ? 'e.g. vercel/next.js' : 'e.g. microsoft'}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
              />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
              <Search size={16} /> Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
