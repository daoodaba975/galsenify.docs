import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "regionsByPopulation(order?)",
    signature:
      "galsenify.regionsByPopulation(order?: 'asc' | 'desc'): Region[]",
    example: `import galsenify from 'galsenify'

const sorted = galsenify.regionsByPopulation()
console.log(sorted.map(r => r.nom))
// ['Dakar', 'Thiès', 'Diourbel', ...]

const sortedAsc = galsenify.regionsByPopulation('asc')
console.log(sortedAsc[0].nom) // 'Kédougou'`,
  },
  {
    name: "regionsBySuperficie(order?)",
    signature:
      "galsenify.regionsBySuperficie(order?: 'asc' | 'desc'): Region[]",
    example: `import galsenify from 'galsenify'

const sorted = galsenify.regionsBySuperficie()
console.log(sorted[0].nom) // 'Tambacounda'

const sortedAsc = galsenify.regionsBySuperficie('asc')
console.log(sortedAsc[0].nom) // 'Dakar'`,
  },
  {
    name: "regionsByDensity(order?)",
    signature: "galsenify.regionsByDensity(order?: 'asc' | 'desc'): Region[]",
    example: `import galsenify from 'galsenify'

const sorted = galsenify.regionsByDensity()
console.log(sorted[0].nom) // 'Dakar'

const sortedAsc = galsenify.regionsByDensity('asc')
console.log(sortedAsc[0].nom) // 'Tambacounda'`,
  },
  {
    name: "departmentsByPopulation(order?)",
    signature:
      "galsenify.departmentsByPopulation(order?: 'asc' | 'desc'): Department[]",
    example: `import galsenify from 'galsenify'

const sorted = galsenify.departmentsByPopulation()
console.log(sorted[0].nom) // 'Pikine'

const sortedAsc = galsenify.departmentsByPopulation('asc')
console.log(sortedAsc[0].nom)`,
  },
  {
    name: "departmentsByRegion(code)",
    signature: "galsenify.departmentsByRegion(code: string): Department[]",
    example: `import galsenify from 'galsenify'

const depts = galsenify.departmentsByRegion('TH')
console.log(depts.map(d => d.nom))
// ['Mbour', 'Thiès', 'Tivaouane']

const depts2 = galsenify.departmentsByRegion('DK')
console.log(depts2.map(d => d.nom))
// ['Dakar', 'Guédiawaye', 'Pikine', 'Rufisque']`,
  },
  {
    name: "randomRegion()",
    signature: "galsenify.randomRegion(): Region",
    example: `import galsenify from 'galsenify'

const region = galsenify.randomRegion()
console.log(region.nom) // ex: 'Louga'
console.log(region.code) // ex: 'LG'

const autre = galsenify.randomRegion()
console.log(autre.nom) // ex: 'Ziguinchor'`,
  },
  {
    name: "randomDepartment()",
    signature: "galsenify.randomDepartment(): Department",
    example: `import galsenify from 'galsenify'

const dept = galsenify.randomDepartment()
console.log(dept.nom) // ex: 'Bambey'

const autre = galsenify.randomDepartment()
console.log(autre.nom) // ex: 'Kaffrine'`,
  },
];

export default function TriDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.tri.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.tri.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.tri.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.tri.intro}</p>
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
