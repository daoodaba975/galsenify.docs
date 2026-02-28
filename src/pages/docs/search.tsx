import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "search(query)",
    signature: "galsenify.search(query: string): SearchResult[]",
    example: `import galsenify from 'galsenify'

const results = galsenify.search('Mbour')
console.log(results)
// [{ type: 'department', nom: 'Mbour', data: { ... } }]

const results2 = galsenify.search('Saint')
console.log(results2.map(r => r.nom))
// ['Saint-Louis']

const results3 = galsenify.search('xyznotfound')
console.log(results3) // []`,
  },
  {
    name: "findByCode(code)",
    signature: "galsenify.findByCode(code: string): Region | null",
    example: `import galsenify from 'galsenify'

const region = galsenify.findByCode('DK')
console.log(region)
// { nom: 'Dakar', code: 'DK', population: 3137196, superficie: 550, ... }

const region2 = galsenify.findByCode('zg')
console.log(region2?.nom) // 'Ziguinchor'

const region3 = galsenify.findByCode('XX')
console.log(region3) // null`,
  },
];

export default function SearchDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.search.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.search.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.search.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.search.intro}</p>
        </motion.div>
        <div className="flex flex-col gap-12">
          {methods.map((m) => (
            <motion.section
              key={m.name}
              id={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">{m.name}</h2>
              <code className="text-sm text-green-700 bg-green-50 px-2 py-1 rounded mb-3 inline-block">
                {m.signature}
              </code>
              <p className="text-gray-600 mb-3">{m.desc}</p>
              <CodeBlock code={m.example} language="js" />
            </motion.section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
