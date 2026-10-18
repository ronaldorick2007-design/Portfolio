import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import problems from "../scripts/problems.js";
import Editor from "./Editor";
import JavaVisual from "./JavaVisual";
import { useTheme } from "./ThemeProvider";

function ProblemDetails() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const { id } = useParams();

  const problem = problems.find(
    (problem) => problem.id === Number(id)
  );

  const [line, setLine] = useState(0);

  if (!problem) {
    return (
      <main className="min-h-screen p-2">
        <h1 className="text-2xl font-bold">Problem not found</h1>
        <Link
          to="/codes"
          className="mt-2 inline-block hover:text-red-500"
        >
          ← Back
        </Link>
      </main>
    );
  }

  const panel = dark
    ? "border-white bg-black"
    : "border-black bg-white";

  return (
    <main
      className={`min-h-screen px-20  ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="mx-auto w-full max-w-none">
        <Link
          to="/codes"
          className="inline-block text-sm hover:text-red-500"
        >
          ← Back
        </Link>

        {/* Problem description — full width */}
        <section className={`mt-1 border p-2 ${panel}`}>
          <h1 className="mb-1 text-2xl font-bold">
            {problem.title}
          </h1>

          <p className="mb-1 text-sm">
            {problem.category} · {problem.difficulty}
          </p>

          <p className="leading-6">{problem.description}</p>

          {problem.example && (
            <div className="mt-2">
              <h3 className="mb-1 font-bold">Example</h3>
              <pre
                className={`overflow-auto border p-2 font-mono text-sm ${panel}`}
              >
                {problem.example}
              </pre>
            </div>
          )}
        </section>

        {/* Editor | JavaVisual — side by side */}
        <div className="mt-2 grid grid-cols-1 items-start gap-2 lg:grid-cols-2">
          <section className="min-w-0 h-[600px] overflow-hidden">
            <Editor
              content={problem.code || ""}
              line={line}
            />
          </section>

          <section className="min-w-0">
            <JavaVisual
              setLine={setLine}
              snapshots={problem.snapshots}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProblemDetails;