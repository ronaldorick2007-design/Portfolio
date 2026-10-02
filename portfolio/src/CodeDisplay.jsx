import { useState } from "react";
import { Link } from "react-router-dom";

import ScopeVisual from "./ScopeVisual";
import Editor from "./editor";
import { parseJavaScript } from "./parser-test.js";

const initialCode = `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}

function main() {
  const nums = [2, 7, 11, 15];
  const target = 9;

  const result = twoSum(nums, target);

  console.log(result);
}`;

function FruitDetails() {
  const [content, setContent] = useState(initialCode);
  const [originalCode, setOriginalCode] = useState(initialCode);

  const [isParsed, setIsParsed] = useState(false);
  const [generator, setGenerator] = useState(null);
  const [error, setError] = useState("");

  // Editor changes
  function handleContentChange(newContent) {
    setContent(newContent);

    // Previous generator is no longer valid.
    setGenerator(null);
  }

  // PARSE
  function handleParse() {
    try {
      setError("");

      if (isParsed) {
        throw new Error(
          "Code is already parsed. Unparse before parsing again."
        );
      }

      const parsedCode = parseJavaScript(content);

      // Save normal code for Unparse.
      setOriginalCode(content);

      // Replace editor content with parsed code.
      setContent(parsedCode);

      setIsParsed(true);
      setGenerator(null);
    } catch (err) {
      setError(err?.stack || String(err));
    }
  }

  // UNPARSE
  function handleUnparse() {
    setContent(originalCode);

    setIsParsed(false);
    setGenerator(null);
    setError("");
  }

  // RUN
  function handleRun() {
    try {
      setError("");
      setGenerator(null);

      if (!isParsed) {
        throw new Error(
          "Parse the code before running the visualizer."
        );
      }

      /*
       * Execute the parsed code in a new function scope.
       *
       * We do not add main() to the source.
       * We only retrieve the existing main function.
       */
      const factory = new Function(`
        ${content}

        return main;
      `);

      const main = factory();

      if (typeof main !== "function") {
        throw new Error(
          "main() was not found in the code."
        );
      }

      /*
       * Verify that main is actually a generator.
       *
       * ScopeVisual expects a generator function,
       * not a regular function.
       */
      if (main.constructor.name !== "GeneratorFunction") {
        throw new Error(
          "main() is not a generator. Check the parser output."
        );
      }

      /*
       * React interprets a function passed directly
       * to a state setter as an updater.
       *
       * Therefore, wrap main in another function.
       */
      setGenerator(() => main);

    } catch (err) {
      setError(err?.stack || String(err));
    }
  }

  return (
    <main className="p-24">
      <Link to="/">← Back</Link>

      <div className="h-full flex gap-4 mt-4">

        {/* LEFT: PROBLEM */}
        <div className="w-1/2 bg-amber-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Two Sum
          </h2>

          <p className="mb-4">
            Given an array of integers and a target value,
            return the indices of two numbers that add up
            to the target.
          </p>

          <h3 className="font-semibold mb-2">
            Example
          </h3>

          <pre className="bg-white p-3 rounded">
{`Input:
nums = [2, 7, 11, 15]
target = 9

Output:
[0, 1]`}
          </pre>
        </div>

        {/* RIGHT: EDITOR */}
        <div className="w-1/2 h-[500px]">
          <Editor
            content={content}
            setContent={handleContentChange}
            onParse={handleParse}
            onUnparse={handleUnparse}
            onRun={handleRun}
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <pre className="mt-4 p-4 bg-red-100 text-red-700 rounded whitespace-pre-wrap">
          {error}
        </pre>
      )}

      {/* VISUALIZER */}
      {generator && (
        <ScopeVisual generator={generator} />
      )}
    </main>
  );
}

export default FruitDetails;