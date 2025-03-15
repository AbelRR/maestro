"use client";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center mb-4">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <rect width="32" height="32" rx="6" fill="#000000" stroke="#FFFFFF" strokeWidth="2"/>
              <path d="M10 8H22M10 16H22M10 24H22" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-semibold">Delphi</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Your path to digital immortality & infinite scalability.</p>
          <p className="text-gray-500 text-xs">© 2024 Delphi AI, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
