export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary-500 opacity-75"></div>
          <div className="absolute inset-0 rounded-full border-2 border-primary-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-primary-alpha"></div>
          <div className="absolute inset-4 rounded-full bg-primary-600/40"></div>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-400">SH</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">School Hub</h2>
        <p className="text-neutral-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );
}
