import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20"></div>
          <div className="absolute inset-4 rounded-xl bg-neutral-800 flex items-center justify-center">
            <span className="text-6xl font-bold text-red-500">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-neutral-400 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Go to Dashboard
          </Link>
          <Link href="/login" className="block bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium py-3 px-6 rounded-lg border border-neutral-700 transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
