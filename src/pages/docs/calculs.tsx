import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "totalPopulation()",
    signature: "galsenify.totalPopulation(): number",
    example: `import galsenify from 'galsenify'

const total = galsenify.totalPopulation()
console.log(total) // 17763163`,
  },
  {
    name: "totalSuperficie()",
    signature: "galsenify.totalSuperficie(): number",
    example: `import galsenify from 'galsenify'

const total = galsenify.totalSuperficie()
console.log(total) // 196722`,
  },
  {
    name: "density(name)",
    signature: "galsenify.density(name: string): number",
    example: `import galsenify from 'galsenify'

const d = galsenify.density('Dakar')
console.log(d) // 5704 hab/km²

const d2 = galsenify.density('Tambacounda')
console.log(d2) // 12 hab/km²`,
  },
  {
    name: "densityDepartment(name)",
    signature: "galsenify.densityDepartment(name: string): number",
    example: `import galsenify from 'galsenify'

const d = galsenify.densityDepartment('Pikine')
console.log(d)

const d2 = galsenify.densityDepartment('Tambacounda')
console.log(d2)`,
  },
  {
    name: "nationalDensity()",
    signature: "galsenify.nationalDensity(): number",
    example: `import galsenify from 'galsenify'

const d = galsenify.nationalDensity()
console.log(d) // environ 90 hab/km²`,
  },
];

export default function CalcsDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.calculs.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.calculs.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.calculs.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.calculs.intro}</p>
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
