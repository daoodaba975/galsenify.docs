import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CodeBlock from "@/components/CodeBlock";
import galsenify from "galsenify";
import { useLanguage } from "@/contexts/LanguageContext";

type SearchResult = {
  type: "region" | "department";
  nom: string;
  data: object;
};

/* ------------------------------------------------------------------ */
/* Exemple 1 - Tableau des régions                                      */
/* ------------------------------------------------------------------ */
const tableCode = `import galsenify from 'galsenify'

const regions = galsenify.rg()
// Affiche nom, code, population, superficie dans un tableau`;

function TableExample() {
  const { t } = useLanguage();
  const regions = galsenify.rg() as any[];
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            {t.examples.table.headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {regions.map((r: any) => (
            <tr key={r.code} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2.5 font-medium text-gray-900">{r.nom}</td>
              <td className="px-4 py-2.5">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                  {r.code}
                </span>
              </td>
              <td className="px-4 py-2.5 text-gray-600">
                {r.population?.toLocaleString("fr-FR")}
              </td>
              <td className="px-4 py-2.5 text-gray-600">
                {r.superficie?.toLocaleString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exemple 2 - Select région → population                              */
/* ------------------------------------------------------------------ */
const selectCode = `import galsenify from 'galsenify'

const regions = galsenify.regions()
const pop = galsenify.population(selectedRegion)`;

function SelectExample() {
  const { t } = useLanguage();
  const regions = galsenify.regions() as string[];
  const [selected, setSelected] = useState(regions[0]);
  const pop = galsenify.population(selected) as number;
  const sup = galsenify.superficie(selected) as number;

  return (
    <div className="flex flex-col gap-4">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {regions.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <div className="flex gap-4 flex-wrap">
        <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 min-w-[140px]">
          <div className="text-xs text-green-600 font-semibold uppercase mb-1">
            {t.examples.select.labelPop}
          </div>
          <div className="text-2xl font-bold text-green-800">
            {pop?.toLocaleString("fr-FR")}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 min-w-[140px]">
          <div className="text-xs text-blue-600 font-semibold uppercase mb-1">
            {t.examples.select.labelArea}
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {sup?.toLocaleString("fr-FR")} km²
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exemple 3 - Départements par région (radio)                         */
/* ------------------------------------------------------------------ */
const radioCode = `import galsenify from 'galsenify'

const regions = galsenify.regions()
const depts = galsenify.departments(selectedRegion)`;

function RadioExample() {
  const { t } = useLanguage();
  const regions = galsenify.regions() as string[];
  const [selected, setSelected] = useState(regions[0]);
  const depts = galsenify.departments(selected) as string[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {regions.map((r) => (
          <label key={r} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="region"
              value={r}
              checked={selected === r}
              onChange={() => setSelected(r)}
              className="accent-green-600"
            />
            <span className="text-sm text-gray-700">{r}</span>
          </label>
        ))}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
          {t.examples.radio.depsOf} {selected} ({depts.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {depts.map((d) => (
            <span
              key={d}
              className="bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exemple 4 - Recherche                                               */
/* ------------------------------------------------------------------ */
const searchCode = `import galsenify from 'galsenify'

const results = galsenify.search(query)`;

function SearchExample() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(galsenify.search(query));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.examples.search.placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {query.length >= 2 && (
        <div className="text-sm">
          {results.length === 0 ? (
            <span className="italic text-gray-500">
              {t.examples.search.noResult} « {query} »
            </span>
          ) : (
            <div className="flex flex-col gap-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-3"
                >
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                    {r.type}
                  </span>
                  <span className="font-medium text-gray-900">{r.nom}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exemple 5 - Opérateur par numéro                                    */
/* ------------------------------------------------------------------ */
const telecomCode = `import galsenify from 'galsenify'

const op = galsenify.findOperateurByNumber(number)`;

function TelecomExample() {
  const { t } = useLanguage();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const op = galsenify.findOperateurByNumber(number);
    if (op) {
      setResult(op);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center flex-wrap">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={t.examples.telecom.placeholder}
          maxLength={9}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
        >
          {t.examples.telecom.btn}
        </button>
      </div>
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
          <span className="font-semibold text-green-800">
            {t.examples.telecom.operateur} :{" "}
          </span>
          <span className="text-green-700">{result.nom}</span>
          {result.type && (
            <span className="ml-2 text-green-600 text-xs">({result.type})</span>
          )}
        </div>
      )}
      {notFound && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          {t.examples.telecom.notFound}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exemple 6 - Région aléatoire                                        */
/* ------------------------------------------------------------------ */
const randomCode = `import galsenify from 'galsenify'

const region = galsenify.randomRegion()`;

function RandomExample() {
  const { t } = useLanguage();
  const [region, setRegion] = useState<any>(null);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setRegion(galsenify.randomRegion())}
        className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors w-fit"
      >
        {t.examples.random.btn}
      </button>
      {region && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 flex flex-wrap gap-6">
          {[
            {
              label: t.examples.random.labelRegion,
              value: region.nom,
              color: "text-gray-900",
            },
            {
              label: t.examples.random.labelCode,
              value: region.code,
              color: "text-green-700",
            },
            {
              label: t.examples.random.labelPop,
              value: region.population?.toLocaleString("fr-FR"),
              color: "text-gray-700",
            },
            {
              label: t.examples.random.labelArea,
              value: `${region.superficie?.toLocaleString("fr-FR")} km²`,
              color: "text-gray-700",
            },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="text-xs text-gray-400 uppercase font-semibold mb-1">
                {label}
              </div>
              <div className={`text-xl font-bold ${color}`}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page principale                                                      */
/* ------------------------------------------------------------------ */
export default function ExamplesPage() {
  const { t } = useLanguage();

  const examples = [
    {
      id: "table",
      code: tableCode,
      Component: TableExample,
      title: t.examples.table.title,
      desc: t.examples.table.desc,
    },
    {
      id: "select",
      code: selectCode,
      Component: SelectExample,
      title: t.examples.select.title,
      desc: t.examples.select.desc,
    },
    {
      id: "radio",
      code: radioCode,
      Component: RadioExample,
      title: t.examples.radio.title,
      desc: t.examples.radio.desc,
    },
    {
      id: "search",
      code: searchCode,
      Component: SearchExample,
      title: t.examples.search.title,
      desc: t.examples.search.desc,
    },
    {
      id: "telecom",
      code: telecomCode,
      Component: TelecomExample,
      title: t.examples.telecom.title,
      desc: t.examples.telecom.desc,
    },
    {
      id: "random",
      code: randomCode,
      Component: RandomExample,
      title: t.examples.random.title,
      desc: t.examples.random.desc,
    },
  ];

  return (
    <Layout title={t.examples.title}>
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.examples.title}
          </h1>
          <p className="text-gray-500 text-lg">{t.examples.intro}</p>
        </div>

        <div className="flex flex-col gap-14">
          {examples.map(({ id, title, desc, code, Component }, i) => (
            <motion.section
              key={id}
              id={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
              <p className="text-gray-500 text-sm mb-4">{desc}</p>
              <div className="mb-4">
                <CodeBlock code={code} language="js" />
              </div>
              <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-4">
                  {t.examples.liveDemo}
                </p>
                <Component />
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
