import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "operateurs()",
    signature: "galsenify.operateurs(): Operateur[]",
    example: `import galsenify from 'galsenify'

const ops = galsenify.operateurs()
console.log(ops)
// [
//   { nom: 'Orange', type: 'mobile', prefixes: ['77', ...] },
//   { nom: 'Free', type: 'mobile', prefixes: ['76', ...] },
//   ...
// ]`,
  },
  {
    name: "operateursMobiles()",
    signature: "galsenify.operateursMobiles(): Operateur[]",
    example: `import galsenify from 'galsenify'

const mobiles = galsenify.operateursMobiles()
console.log(mobiles.map(op => op.nom))
// ['Orange', 'Free', 'Expresso', 'Saga Africa']`,
  },
  {
    name: "findOperateurByPrefix(prefix)",
    signature:
      "galsenify.findOperateurByPrefix(prefix: string): Operateur | null",
    example: `import galsenify from 'galsenify'

const op = galsenify.findOperateurByPrefix('77')
console.log(op?.nom) // 'Orange'

const op2 = galsenify.findOperateurByPrefix('76')
console.log(op2?.nom) // 'Free'

const op3 = galsenify.findOperateurByPrefix('99')
console.log(op3) // null`,
  },
  {
    name: "findOperateurByNumber(number)",
    signature:
      "galsenify.findOperateurByNumber(number: string): Operateur | null",
    example: `import galsenify from 'galsenify'

const op = galsenify.findOperateurByNumber('771234567')
console.log(op?.nom) // 'Orange'

const op2 = galsenify.findOperateurByNumber('761234567')
console.log(op2?.nom) // 'Free'

const op3 = galsenify.findOperateurByNumber('001234567')
console.log(op3) // null`,
  },
];

export default function TelecomDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.telecom.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.telecom.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.telecom.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.telecom.intro}</p>
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
