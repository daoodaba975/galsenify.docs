import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const installCode = `npm install galsenify
# ou
yarn add galsenify`;

const quickStartCode = `import galsenify from 'galsenify'

// Liste de toutes les régions
const regions = galsenify.regions()
console.log(regions)
// ['Dakar', 'Thiès', 'Saint-Louis', ...]

// Population d'une région
const pop = galsenify.population('Dakar')
console.log(pop) // 3137196

// Recherche
const results = galsenify.search('Mbour')
console.log(results)`;

export default function Home() {
  const { t } = useLanguage();

  const docSections = [
    {
      label: t.sidebar.pays,
      href: "/docs/pays",
      desc: t.home.cardDesc.pays,
    },
    {
      label: t.sidebar.regions,
      href: "/docs/regions",
      desc: t.home.cardDesc.regions,
    },
    {
      label: t.sidebar.departments,
      href: "/docs/departments",
      desc: t.home.cardDesc.departments,
    },
    {
      label: t.sidebar.telecom,
      href: "/docs/telecom",
      desc: t.home.cardDesc.telecom,
    },
    {
      label: t.sidebar.search,
      href: "/docs/search",
      desc: t.home.cardDesc.search,
    },
    {
      label: t.sidebar.calculs,
      href: "/docs/calculs",
      desc: t.home.cardDesc.calculs,
    },
    {
      label: t.sidebar.tri,
      href: "/docs/tri",
      desc: t.home.cardDesc.tri,
    },
  ];

  return (
    <Layout title="Accueil">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-6"
        >
          <span>{t.home.badgeNew}</span>
          <span className="font-bold">v1.2.0</span>
          <span>{t.home.badgeAvailable}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
        >
          Galsenify
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto mb-8"
        >
          {t.home.taglinePre}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          <Link
            href="/docs/regions"
            className="bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            {t.home.ctaDocs}
          </Link>
          <Link
            href="/examples"
            className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {t.home.ctaExamples}
          </Link>
        </motion.div>
      </section>

      {/* Install */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 mb-14"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {t.home.installTitle}
        </h2>
        <CodeBlock code={installCode} language="bash" />
      </motion.section>

      {/* Quick start */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 mb-16"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {t.home.quickstartTitle}
        </h2>
        <CodeBlock code={quickStartCode} language="js" />
      </motion.section>

      {/* Doc cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-xl font-bold text-gray-900 mb-6"
        >
          {t.home.exploreTitle}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docSections.map(({ label, href, desc }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={href}
                className="group border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-sm transition-all block h-full"
              >
                <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
                  {label}
                </div>
                <div className="text-sm text-gray-500">{desc}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
