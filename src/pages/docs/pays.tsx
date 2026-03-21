import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

const METHODS_STATIC = [
  {
    name: "sn()",
    signature: "galsenify.sn(): Country",
    example: `import galsenify from 'galsenify'

const senegal = galsenify.sn()
console.log(senegal)
// {
//   pays: 'Sénégal',
//   capital: 'Dakar',
//   langueOfficielle: 'Français',
//   languesNationales: ['Wolof', 'Pulaar', 'Sérère', ...],
//   monnaie: 'Franc CFA',
//   devise: 'Un Peuple, Un But, Une Foi',
//   codeIso: 'SN',
//   indicatif: 221,
//   habitants: 17763163,
//   surface: 196722,
//   regions: 14,
//   departments: 46
// }`,
  },
  {
    name: "languesNationales()",
    signature: "galsenify.languesNationales(): string[]",
    example: `import galsenify from 'galsenify'

const langues = galsenify.languesNationales()
console.log(langues)
// ['Wolof', 'Pulaar', 'Sérère', 'Mandingue', 'Solinké',
//  'Diola', 'Balante', 'Manjaque', 'Noon', 'Bédik',
//  'Bassari', 'Coniagui', 'Lébou']`,
  },
];

export default function PaysDocs() {
  const { t } = useLanguage();
  const methods = METHODS_STATIC.map((m, i) => ({
    ...m,
    desc: t.docs.pays.methods[i],
  }));

  return (
    <Layout withSidebar title={t.docs.pays.title}>
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.docs.pays.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.docs.pays.intro}</p>
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
