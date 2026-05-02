import { useState, useEffect } from 'react';

// Reusable UI Components
const UButton = ({ children, onClick, variant = 'primary', className = '' }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all ${variant === 'primary' ? 'bg-primary-600 hover:bg-primary-700 text-white' : variant === 'secondary' ? 'bg-neutral-700 hover:bg-neutral-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-white'} ${className}`}
  >
    {children}
  </button>
);

const UInput = ({ value, onChange, placeholder, type = 'text', className = '' }: any) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white ${className}`}
  />
);

const USelect = ({ value, onChange, options, className = '' }: any) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 text-white ${className}`}
  >
    {options.map((opt: any) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const UCard = ({ children, className = '' }: any) => (
  <div className={`bg-neutral-800 rounded-xl border border-neutral-700 p-6 ${className}`}>
    {children}
  </div>
);

const UModal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const UStatCard = ({ title, value, icon, trend }: any) => (
  <UCard className="hover:border-primary-500 transition-colors">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-neutral-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trend > 0 ? 'text-success-500' : 'text-danger-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </UCard>
);

const UDataTable = ({ columns, data, className = '' }: any) => (
  <UCard className={className}>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-700">
        <thead className="bg-neutral-900">
          <tr>
            {columns.map((column: any) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-700 bg-neutral-800">
          {data.map((row: any) => (
            <tr key={row.id} className="hover:bg-neutral-700">
              {columns.map((column: any) => (
                <td
                  key={`${row.id}-${column.accessor}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-neutral-100"
                >
                  {typeof column.cell === 'function' ? column.cell(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </UCard>
);

// Login Component Interface
interface LoginProps {
  onLogin: () => void;
}

// Login Component
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email === 'admin@example.com' && password === 'password') {
        // In a real app, you would redirect to dashboard
        alert('Login successful!');
        onLogin();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              start a trial
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <UInput
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={error ? 'border-red-500' : ''}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <UInput
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={error ? 'border-red-500' : ''}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <UButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </UButton>
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Start a trial
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

// AppLayout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-semibold text-primary-400">SchoolHub</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-400 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-primary-500">
                    Dashboard
                  </a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-400 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-primary-500">
                    Students
                  </a>
                  <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-400 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-primary-500">
                    Payments
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-neutral-400">Admin</span>
                  <UButton variant="secondary" size="sm" className="ml-2">
                    Profile
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

// Dashboard Component Interface
interface DashboardProps {
  onLogout: () => void;
}

// Dashboard Component
const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [stats, setStats] = useState([
    { title: 'Total Students', value: '1,245', icon: '👥', trend: 12 },
    { title: 'Monthly Revenue', value: '$45,200', icon: '💰', trend: 8 },
    { title: 'Attendance Rate', value: '94.2%', icon: '📊', trend: 5 },
    { title: 'Upcoming Events', value: '12', icon: '📅', trend: -3 }
  ]);

  const [recentStudents, setRecentStudents] = useState([
    { id: 1, name: 'John Doe', grade: '10th', status: 'Active' },
    { id: 2, name: 'Jane Smith', grade: '11th', status: 'Active' },
    { id: 3, name: 'Bob Johnson', grade: '9th', status: 'Inactive' }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <UStatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <UCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Students</h2>
              <UButton variant="secondary" size="sm">
                View All
              </UButton>
            </div>
            <UDataTable
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Grade', accessor: 'grade' },
                { header: 'Status', accessor: 'status', cell: (row: any) => (
                  <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                    {row.status}
                  </span>
                )}
              ]}
              data={recentStudents}
            />
          </UCard>
        </div>
        
        <div>
          <UCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Payment Overview</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  💳
                </div>
                <div className="ml-4">
                  <p className="text-neutral-400 text-sm">Outstanding Fees</p>
                  <p className="text-2xl font-bold">$8,450</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-success-600/20 rounded-lg flex items-center justify-center">
                  ✅
                </div>
                <div className="ml-4">
                  <p className="text-neutral-400 text-sm">Collected This Month</p>
                  <p className="text-2xl font-bold">$22,300</p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  );
};

// Main SchoolHubApp Component
const SchoolHubApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('authToken');
    return !!token;
  });
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>(() => {
    const token = localStorage.getItem('authToken');
    return !!token ? 'dashboard' : 'login';
  });

  useEffect(() => {
    // Listen for storage changes to handle logout in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        setIsAuthenticated(!!e.newValue);
        setCurrentView(!!e.newValue ? 'dashboard' : 'login');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    localStorage.setItem('authToken', 'fake-token');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
    localStorage.removeItem('authToken');
  };

  return (
    <>
      {!isAuthenticated && currentView === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      
      {isAuthenticated && (
        <AppLayout>
          {currentView === 'dashboard' && <Dashboard onLogout={handleLogout} />}
        </AppLayout>
      )}
    </>
  );
};

export default SchoolHubApp;