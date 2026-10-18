
import { useTheme } from "./ThemeProvider";
import { useEffect, useRef } from "react";

const keywords = new Set([
  "abstract","assert","async","await","break","case","catch","class","const",
  "continue","default","def","delete","do","else","enum","extends","false",
  "final","finally","for","from","function","if","implements","import","in",
  "instanceof","interface","let","native","new","null","of","package","pass",
  "private","protected","public","return","static","super","switch","this",
  "throw","throws","true","try","typeof","var","void","while","with","yield",
  "lambda","print"
]);

const types = new Set([
  "boolean","byte","char","double","float","int","long","short","String",
  "Integer","Long","Double","Float","Character","Boolean","Object","void",
  "ArrayList","LinkedList","HashMap","HashSet","List","Map","Set","Node",
  "Iterator","NoSuchElementException"
]);

function tokenize(text, dark) {
  const pattern = /(\/\/.*|\/\*.*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b\d+(?:\.\d+)?\b|@[A-Za-z_$][\w$]*|\b[A-Za-z_$][\w$]*\b|[+\-*/%=!<>|&^~?:]+/g;
  const tokens = [];
  let last = 0;

  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    const value = match[0];

    if (start > last) tokens.push({ text: text.slice(last, start), cls: "" });

    let cls = "";
    if (/^(\/\/|\/\*)/.test(value))
  cls = dark ? "text-gray-400 italic" : "text-gray-600 italic";
else if (/^["'`]/.test(value))
  cls = dark ? "text-orange-300" : "text-orange-700";
else if (/^\d/.test(value))
  cls = dark ? "text-purple-300" : "text-purple-800";
else if (value.startsWith("@"))
  cls = dark ? "text-cyan-300" : "text-cyan-800";
else if (keywords.has(value))
  cls = dark ? "text-red-400 font-bold" : "text-red-700 font-bold";
else if (types.has(value))
  cls = dark ? "text-sky-300 font-semibold" : "text-blue-700 font-semibold";
else if (/^[A-Z][A-Za-z0-9_$]*$/.test(value))
  cls = dark ? "text-green-300 font-semibold" : "text-green-700 font-semibold";
else if (/^[A-Za-z_$]/.test(value) && /^\s*\(/.test(text.slice(start + value.length)))
  cls = dark ? "text-yellow-300" : "text-amber-700";
else if (/^[+\-*/%=!<>|&^~?:]+$/.test(value))
  cls = dark ? "text-gray-300" : "text-gray-700";

    tokens.push({ text: value, cls });
    last = start + value.length;
  }

  if (last < text.length) tokens.push({ text: text.slice(last), cls: "" });
  return tokens;
}

function getIteratorScopeLines(lines) {
  const scoped = new Set();
  let inside = false;
  let depth = 0;

  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];

    if (!inside && /\bnew\s+Iterator\s*<[^;]*?>\s*\(\s*\)\s*\{/.test(text)) {
      inside = true;
      depth = 0;
    }

    if (!inside) continue;

    const code = text
      .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "")
      .replace(/\/\/.*$/, "")
      .replace(/\/\*.*?\*\//g, "");

    for (const char of code) {
      if (char === "{") depth++;
      else if (char === "}") depth--;
    }

    scoped.add(i);

    if (depth <= 0) inside = false;
  }

  return scoped;
}

function Editor({ content = "", line = 0 }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const lineRefs = useRef({});
  const containerRef = useRef(null);
  const lines = content.split("\n");
  const iteratorScopeLines = getIteratorScopeLines(lines);

  useEffect(() => {
    const activeLine = lineRefs.current[line];
    const container = containerRef.current;
    if (!activeLine || !container) return;

    container.scrollTo({
      top: activeLine.offsetTop - container.clientHeight / 3 + activeLine.offsetHeight / 2,
      behavior: "smooth"
    });
  }, [line, content]);

  const copyCode = () => navigator.clipboard.writeText(content);

  return (
    <div
      ref={containerRef}
      className={`relative h-full overflow-auto border ${
        dark ? "border-gray-700 bg-gray-950 text-gray-100" : "border-gray-300 bg-gray-50 text-gray-900"
      }`}
    >
      <div className={`sticky top-0 z-10 flex items-center justify-between border-b px-3 py-2 ${
        dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      }`}>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <button
          onClick={copyCode}
          className={`rounded border px-3 py-1 text-xs ${
            dark ? "border-gray-600 bg-gray-800 hover:bg-gray-700" : "border-gray-300 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Copy
        </button>
      </div>

      <pre className="min-h-full p-4 font-mono text-sm leading-6">
        {lines.map((text, index) => {
          const lineNumber = index + 1;
          const highlighted = line === lineNumber;
          const iteratorLine = iteratorScopeLines.has(index);

          return (
            <div
              key={index}
              ref={(el) => { lineRefs.current[lineNumber] = el; }}
              className={`min-h-6 whitespace-pre ${
                highlighted
                  ? dark ? "bg-cyan-400/15 ring-1 ring-inset ring-cyan-400/30" : "bg-cyan-100 ring-1 ring-inset ring-cyan-300"
                  : ""
              }`}
            >
              <span className={`mr-4 inline-block w-8 select-none text-right ${
                highlighted
                  ? dark ? "text-cyan-300" : "text-cyan-700"
                  : dark ? "text-gray-600" : "text-gray-400"
              }`}>
                {lineNumber}
              </span>
              {text
                ? tokenize(text, dark).map((token, i) => (
                    <span
                      key={i}
                      className={iteratorLine
                        ? dark ? "text-sky-400" : "text-sky-600"
                        : token.cls}
                    >
                      {token.text}
                    </span>
                  ))
                : " "}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

export default Editor;
