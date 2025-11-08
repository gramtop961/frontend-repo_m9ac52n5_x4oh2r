import React from 'react';
import { Github, BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-900 text-white">
            <Github size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">GitHub Activity Dashboard</h1>
            <p className="text-sm text-gray-500">Insights on users, repos, and organizations</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-600">
          <BarChart3 size={18} />
          <span className="text-sm">Daily-ready views</span>
        </div>
      </div>
    </header>
  );
}
