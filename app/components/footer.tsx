export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center w-full mt-auto py-6 px-4  bg-black/30 backdrop-blur-md border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Video Viewer&Player</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="text-gray-400">所有权利保留</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="text-gray-400">由</span>
            <span className="text-red-400 animate-pulse">♥Jaysen</span>
            <span className="text-gray-400">开发</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="text-gray-400 text-center">免责声明：本站使用第三方接口，视频内容皆为第三方数据，请勿轻易相信影片及视频里的广告内容。
              本站不存在存储视频和录制视频的行为。</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
