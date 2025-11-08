import React from 'react';
import { Users, GitCommit, GitBranch, Building2 } from 'lucide-react';

export default function StatsCards({ stats, loading }) {
  const { users = 0, commits = 0, repos = 0, orgs = 0 } = stats || {};
  const Card = ({ icon: Icon, label, value, accent }) => (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold mt-1">{loading ? '—' : value.toLocaleString()}</p>
      </div>
      <div className={`p-3 rounded-lg ${accent}`}>
        <Icon className="text-white" size={20} />
      </div>
    </div>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card icon={Users} label="Users" value={users} accent="bg-indigo-600" />
      <Card icon={GitCommit} label="Commits" value={commits} accent="bg-emerald-600" />
      <Card icon={GitBranch} label="Repositories" value={repos} accent="bg-blue-600" />
      <Card icon={Building2} label="Organizations" value={orgs} accent="bg-rose-600" />
    </section>
  );
}
