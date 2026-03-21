import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "rg()",
    signature: "galsenify.rg(): Region[]",
    example: `import galsenify from 'galsenify'

const regions = galsenify.rg()
console.log(regions)
// [
//   { nom: 'Dakar', code: 'DK', population: 3137196, superficie: 550, departments: [...] },
//   { nom: 'Thiès', code: 'TH', ... },
//   ...
// ]`,
  },
  {
    name: "regions()",
    signature: "galsenify.regions(): string[]",
    example: `import galsenify from 'galsenify'

const regions = galsenify.regions()
console.log(regions)
// ['Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack',
//  'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis',
//  'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor']`,
  },
  {
    name: "codes()",
    signature: "galsenify.codes(): string[]",
    example: `import galsenify from 'galsenify'

const codes = galsenify.codes()
console.log(codes)
// ['DK', 'DB', 'FK', 'KF', 'KL', 'KD', 'KO', 'LG', 'MT', 'SL', 'SD', 'TC', 'TH', 'ZG']`,
  },
  {
    name: "departments(regionName)",
    signature: "galsenify.departments(regionName: string): string[]",
    example: `import galsenify from 'galsenify'

const depts = galsenify.departments('Dakar')
console.log(depts)
// ['Dakar', 'Guédiawaye', 'Pikine', 'Rufisque']`,
  },
  {
    name: "population(regionName)",
    signature: "galsenify.population(regionName: string): number",
    example: `import galsenify from 'galsenify'

const pop = galsenify.population('Dakar')
console.log(pop) // 3137196

const pop2 = galsenify.population('Thiès')
console.log(pop2) // 1793038`,
  },
  {
    name: "superficie(regionName)",
    signature: "galsenify.superficie(regionName: string): number",
    example: `import galsenify from 'galsenify'

const sup = galsenify.superficie('Tambacounda')
console.log(sup) // 42706

const sup2 = galsenify.superficie('Dakar')
console.log(sup2) // 550`,
  },
];

export default function RegionsDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.regions.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.regions.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.regions.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.regions.intro}</p>
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
