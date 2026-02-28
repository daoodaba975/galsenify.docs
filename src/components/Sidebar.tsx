import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sidebar() {
  const router = useRouter();
  const { t } = useLanguage();

  const sections = [
    { label: t.sidebar.pays, href: "/docs/pays" },
    { label: t.sidebar.regions, href: "/docs/regions" },
    { label: t.sidebar.departments, href: "/docs/departments" },
    { label: t.sidebar.telecom, href: "/docs/telecom" },
    { label: t.sidebar.search, href: "/docs/search" },
    { label: t.sidebar.calculs, href: "/docs/calculs" },
    { label: t.sidebar.tri, href: "/docs/tri" },
  ];

  return (
    <aside className="w-60 shrink-0 hidden md:block">
      <div className="sticky top-14 pt-6 pb-8 pr-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-3">
          {t.sidebar.header}
        </p>
        <nav className="flex flex-col gap-0.5">
          {sections.map(({ label, href }) => {
            const isActive = router.pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
