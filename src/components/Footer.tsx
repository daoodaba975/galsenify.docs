import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 mt-16 py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span>
          © {new Date().getFullYear()} - {t.footer.copyright}
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/daoodaba975/galsenify"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/galsenify"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors"
          >
            NPM
          </a>
        </div>
      </div>
    </footer>
  );
}
