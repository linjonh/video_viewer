export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center w-full mt-auto py-6 px-4  bg-black/30 backdrop-blur-md border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Video Viewer</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="text-gray-400">All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Made with</span>
            <span className="text-red-400 animate-pulse">♥Jaysen</span>
            <span className="text-gray-400">by Developer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
