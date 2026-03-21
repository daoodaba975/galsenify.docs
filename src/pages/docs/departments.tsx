import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "allDepartments()",
    signature: "galsenify.allDepartments(): string[]",
    example: `import galsenify from 'galsenify'

const depts = galsenify.allDepartments()
console.log(depts)
// ['Bambey', 'Birkelane', 'Bignona', 'Bounkiling', 'Dakar', ...]
console.log(depts.length) // 46`,
  },
  {
    name: "arrondissements(name)",
    signature: "galsenify.arrondissements(name: string): string[]",
    example: `import galsenify from 'galsenify'

const arr = galsenify.arrondissements('Dakar')
console.log(arr)
// ['Dakar Plateau', 'Grand Dakar', 'Biscuiterie', 'Gueule Tapée-Fass-Colobane']`,
  },
  {
    name: "populationDepartment(name)",
    signature: "galsenify.populationDepartment(name: string): number",
    example: `import galsenify from 'galsenify'

const pop = galsenify.populationDepartment('Pikine')
console.log(pop) // 1170791

const pop2 = galsenify.populationDepartment('Mbour')
console.log(pop2) // 796952`,
  },
  {
    name: "superficieDepartment(name)",
    signature: "galsenify.superficieDepartment(name: string): number",
    example: `import galsenify from 'galsenify'

const sup = galsenify.superficieDepartment('Tambacounda')
console.log(sup) // 15083

const sup2 = galsenify.superficieDepartment('Dakar')
console.log(sup2) // 82`,
  },
];

export default function DepartmentsDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.departments.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.departments.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.departments.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.departments.intro}</p>
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
