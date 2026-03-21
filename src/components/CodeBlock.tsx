import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CodeBlockProps {
  code: string;
  language?: string;
}

/* ------------------------------------------------------------------ */
/* Tokenizer                                                            */
/* ------------------------------------------------------------------ */

interface Token {
  type: string;
  text: string;
}

const TOKEN_COLORS: Record<string, string> = {
  keyword: "#569cd6", // blue
  string: "#ce9178", // orange
  comment: "#6a9955", // green
  number: "#b5cea8", // light green
  function: "#dcdcaa", // yellow
  builtin: "#4ec9b0", // teal
  plain: "#d4d4d4", // default
};

const JS_KEYWORDS = new Set([
  "import",
  "export",
  "from",
  "default",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "new",
  "class",
  "interface",
  "type",
  "async",
  "await",
  "true",
  "false",
  "null",
  "undefined",
  "void",
  "typeof",
  "of",
  "in",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "throw",
  "try",
  "catch",
  "finally",
  "extends",
  "as",
  "readonly",
  "static",
  "public",
  "private",
  "this",
]);

const JS_BUILTINS = new Set([
  "console",
  "Array",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Math",
  "JSON",
  "Promise",
  "Map",
  "Set",
  "Error",
  "Date",
  "log",
  "warn",
  "error",
  "info",
  "galsenify",
]);

function tokenizeJS(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];

    // Line comment
    if (ch === "/" && code[i + 1] === "/") {
      const j = code.indexOf("\n", i);
      const end = j === -1 ? len : j;
      tokens.push({ type: "comment", text: code.slice(i, end) });
      i = end;
      continue;
    }

    // Block comment
    if (ch === "/" && code[i + 1] === "*") {
      const j = code.indexOf("*/", i + 2);
      const end = j === -1 ? len : j + 2;
      tokens.push({ type: "comment", text: code.slice(i, end) });
      i = end;
      continue;
    }

    // Template literal
    if (ch === "`") {
      let j = i + 1;
      while (j < len) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === "`") {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ type: "string", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Quoted string (single or double)
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < len && code[j] !== ch && code[j] !== "\n") {
        if (code[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", text: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Number
    if (/\d/.test(ch)) {
      let j = i;
      while (j < len && /[\d.eExXa-fA-F_n]/.test(code[j])) j++;
      tokens.push({ type: "number", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Identifier / keyword / builtin / function call
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < len && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      // Lookahead past whitespace to detect '('
      let k = j;
      while (k < len && (code[k] === " " || code[k] === "\t")) k++;
      let type: string;
      if (JS_KEYWORDS.has(word)) type = "keyword";
      else if (JS_BUILTINS.has(word)) type = "builtin";
      else if (code[k] === "(") type = "function";
      else type = "plain";
      tokens.push({ type, text: word });
      i = j;
      continue;
    }

    // Anything else (operators, whitespace, punctuation)
    tokens.push({ type: "plain", text: ch });
    i++;
  }

  return tokens;
}

const BASH_COMMANDS = new Set([
  "npm",
  "yarn",
  "npx",
  "node",
  "git",
  "cd",
  "echo",
  "install",
  "run",
  "add",
  "create",
  "init",
  "update",
]);

function tokenizeBash(code: string): Token[] {
  const tokens: Token[] = [];
  const lines = code.split("\n");

  for (let li = 0; li < lines.length; li++) {
    if (li > 0) tokens.push({ type: "plain", text: "\n" });
    const line = lines[li];
    let i = 0;
    const len = line.length;

    // Full-line comment
    if (line.trimStart().startsWith("#")) {
      tokens.push({ type: "comment", text: line });
      continue;
    }

    let wordCount = 0;
    while (i < len) {
      const ch = line[i];

      // Quoted string
      if (ch === '"' || ch === "'") {
        let j = i + 1;
        while (j < len && line[j] !== ch) {
          if (line[j] === "\\") j++;
          j++;
        }
        tokens.push({ type: "string", text: line.slice(i, j + 1) });
        i = j + 1;
        wordCount++;
        continue;
      }

      // Flag (- or -- preceded by space)
      if (ch === "-" && i > 0) {
        let j = i;
        while (j < len && !/\s/.test(line[j])) j++;
        tokens.push({ type: "keyword", text: line.slice(i, j) });
        i = j;
        wordCount++;
        continue;
      }

      // Non-whitespace word
      if (!/\s/.test(ch)) {
        let j = i;
        while (j < len && !/[\s"']/.test(line[j])) j++;
        const word = line.slice(i, j);
        const type =
          wordCount === 0 || BASH_COMMANDS.has(word) ? "builtin" : "plain";
        tokens.push({ type, text: word });
        i = j;
        wordCount++;
        continue;
      }

      // Whitespace
      tokens.push({ type: "plain", text: ch });
      i++;
    }
  }

  return tokens;
}

function tokenize(code: string, language: string): Token[] {
  if (language === "bash" || language === "sh") return tokenizeBash(code);
  return tokenizeJS(code);
}

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export default function CodeBlock({ code, language = "js" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const tokens = tokenize(code, language);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.error("Failed to copy code:", err);
        setCopied(false);
      });
    } else {
      console.error("Clipboard API is not available");
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{language}</span>
        <button onClick={handleCopy} className="code-block-copy">
          {copied ? t.codeBlock.copied : t.codeBlock.copy}
        </button>
      </div>
      <pre className="code-block">
        <code>
          {tokens.map((token, idx) => (
            <span
              key={idx}
              style={{ color: TOKEN_COLORS[token.type] ?? TOKEN_COLORS.plain }}
            >
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
