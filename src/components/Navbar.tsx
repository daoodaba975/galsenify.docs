import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.203 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-gray-900 hover:opacity-80 transition-opacity"
        >
          Galsenify
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            v1.2.0
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/docs/regions"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.nav.docs}
          </Link>
          <Link
            href="/examples"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t.nav.examples}
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/daoodaba975/galsenify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.npmjs.com/package/galsenify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NPM"
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <NpmIcon />
            </a>
          </div>

          {/* Language toggle */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "fr" | "en")}
            className="text-sm border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 hover:border-gray-300 focus:outline-none cursor-pointer"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-3">
          <Link
            href="/docs/regions"
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.docs}
          </Link>
          <Link
            href="/examples"
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.examples}
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/daoodaba975/galsenify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.npmjs.com/package/galsenify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NPM"
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <NpmIcon />
            </a>
          </div>
          {/* Mobile lang toggle */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "fr" | "en")}
            className="text-sm border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 focus:outline-none cursor-pointer w-fit"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>
      )}
    </nav>
  );
}
