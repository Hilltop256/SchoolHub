'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@sh.ug');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'admin', label: 'Admin', email: 'admin@sh.ug', password: 'admin', desc: 'Full access' },
    { id: 'teacher', label: 'Teacher', email: 'teacher@sh.ug', password: 'teacher', desc: 'Class management' },
    { id: 'accountant', label: 'Bursar', email: 'bursar@sh.ug', password: 'bursar', desc: 'Finance' },
    { id: 'parent', label: 'Parent', email: 'parent@sh.ug', password: 'parent', desc: 'Student viewing' },
  ];

  const [selectedRole, setSelectedRole] = useState('admin');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    localStorage.setItem('schoolHubAuth', JSON.stringify({
      email,
      role: selectedRole,
      loggedInAt: new Date().toISOString(),
    }));

    router.push('/dashboard');
  };

  const selectRole = (role: any) => {
    setSelectedRole(role.id);
    setEmail(role.email);
    setPassword(role.password);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">School Hub</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-neutral-400 mb-8">Sign in to access your dashboard</p>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => selectRole(role)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedRole === role.id
                    ? 'bg-primary-600 border-primary-500 text-white'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="text-sm font-semibold">{role.label}</div>
                <div className="text-xs opacity-70">{role.desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="admin@sh.ug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-neutral-800/50 border border-neutral-700 rounded-xl">
            <p className="text-sm text-neutral-400 mb-2">Demo credentials:</p>
            <div className="space-y-1 text-sm">
              <p className="text-neutral-300"><span className="text-neutral-500">Admin:</span> admin@sh.ug / admin</p>
              <p className="text-neutral-300"><span className="text-neutral-500">Teacher:</span> teacher@sh.ug / teacher</p>
              <p className="text-neutral-300"><span className="text-neutral-500">Bursar:</span> bursar@sh.ug / bursar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
          <ul className="space-y-4">
            {[
              'Student enrollment and management',
              'Fee tracking and payment processing',
              'Real-time attendance monitoring',
              'Academic report cards',
              'SMS notifications to parents',
              'Role-based access control',
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
