// src/components/ScopeVisual.jsx

import {
  useRef,
  useState,
  useEffect
} from "react";

import useScope from "./useScope";
import useIndication from "./useIndication";
import useVisual from "./useVisual";
import { useTheme } from "../src/components/ThemeProvider";

/* =========================================================
   USE BOX
========================================================= */

function useBox(generator) {
  const { grid, write, addScope, removeScope, clear } = useScope();
  const { flashSpot, indications, indicate, clearIndication, clearAll } = useIndication();
  const { visuals, visual, clearVisual } = useVisual();

  const [logs, setLogs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const gen = useRef(null);

  const createGenerator = () => {
    gen.current = generator();
  };

  useEffect(() => {
    createGenerator();

    return () => {
      gen.current = null;
    };
  }, [generator]);

  const processResult = (result) => {
    if (result.done) {
      stop();
      return false;
    }

    const data = Array.isArray(result.value) ? result.value : [result.value];

    for (const event of data) {
      if (!event) continue;

      if (event.action === "log") {
        setLogs((prev) => [event.message]);
        continue;
      }

      if (event.type === "function-add") {
        addScope(event.scope);
        continue;
      }

      if (event.type === "function-rm") {
        removeScope(event.scope);
        continue;
      }

      if (event.action === "indicate") {
        indicate(event.name, event.value, event.array, event.color);
        continue;
      }

      if (event.action === "clear-indicate") {
        clearIndication(event.name);
        continue;
      }

      if (event.action === "visual") {
        visual(event.element, event.type, event.value);
        continue;
      }

      write(event.scope, event.name, event.value, event.type);
    }

    return true;
  };

  const next = () => {
    if (!gen.current) createGenerator();
    const result = gen.current.next();
    processResult(result);
  };

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      if (!gen.current) createGenerator();

      const result = gen.current.next();
      processResult(result);
    }, 500);

    return () => clearInterval(interval);
  }, [playing]);

  const play = () => {
    setPlaying((prev) => !prev);
  };

  const stop = () => {
    setPlaying(false);
    gen.current = generator();

    clear();
    clearAll();
    clearVisual();
    setLogs([]);
  };

  return { next, play, stop, playing, grid, visuals, flashSpot, indications, clearIndication, clearVisual, clearAll, logs };
}

/* =========================================================
   DISPLAY VALUE
========================================================= */

function DisplayValue({ value, type, indications, flashSpot, dark }) {
  if (type === "primitive") {
    return <span>{value?.toString()}</span>;
  }

  if (type === "array") {
    return (
      <div className="flex flex-wrap gap-2 p-1">
        {value.map((item, index) => {
          const arrayIndication = [...flashSpot.values()].find((indication) => indication && indication.array === value && indication.value === index);
          const arrayHighlighted = arrayIndication !== undefined;

          return (
            <div
              key={index}
              className="box-border flex min-h-[50px] min-w-[50px] items-center justify-center rounded-lg border p-1 text-black"
              style={{
                background: arrayHighlighted ? arrayIndication.color : "#bfdbfe",
                borderColor: arrayHighlighted ? arrayIndication.color : "#222",
              }}
            >
              {String(item)}
            </div>
          );
        })}
      </div>
    );
  }

  if (type === "set") {
    return (
      <div className="flex flex-wrap gap-2 p-1">
        {[...value].map((item, index) => (
          <div
            key={index}
            className="box-border flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full border border-[#222] bg-blue-100 p-2 text-black"
          >
            {String(item)}
          </div>
        ))}
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className="flex flex-col gap-2 p-1">
        {[...value.entries()].map(([key, val], index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="rounded-md border border-[#222] bg-blue-100 px-2.5 py-1.5 text-black">
              {String(key)}
            </div>

            <span>→</span>

            <div className="rounded-md border border-[#222] bg-blue-100 px-2.5 py-1.5 text-black">
              {String(val)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "CLASS") {
    return (
      <div className="flex flex-col gap-1.5">
        {Object.keys(value || {}).map((key) => (
          <div
            key={key}
            className={`flex gap-2.5 rounded-md border px-2 py-1.5 ${
              dark
                ? "border-white bg-[#111] text-white"
                : "border-slate-300 bg-slate-50 text-black"
            }`}
          >
            <strong>{key}</strong>
            <span>{String(value[key])}</span>
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(value)}</span>;
}

/* =========================================================
   TREE NODE
========================================================= */

function TreeNode({
  node,
  indications
}) {
  if (!node) {
    return null;
  }

  const indication = [
    ...indications
  ].find(
    value => value === node
  );

  const highlighted =
    indication !== undefined;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15
      }}
    >
      {/* NODE */}

      <div
        style={{
          minWidth: 55,
          minHeight: 55,
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,

          background:
            highlighted
              ? "#fecaca"
              : "#dbeafe",

          color: "#000",

          border:
            highlighted
              ? "1px solid red"
              : "1px solid #222",

          boxSizing: "border-box"
        }}
      >
        {node.data}
      </div>

      {/* CHILDREN */}

      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "flex-start"
        }}
      >
        {/* LEFT */}

        <div>
          {node.left && (
            <TreeNode
              node={node.left}
              indications={indications}
            />
          )}
        </div>

        {/* RIGHT */}

        <div>
          {node.right && (
            <TreeNode
              node={node.right}
              indications={indications}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TREE VISUAL
========================================================= */

function TreeVisual({
  root,
  indications
}) {
  if (!root) {
    return (
      <div>
        Empty tree
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 20,
        overflowX: "auto"
      }}
    >
      <TreeNode
        node={root}
        indications={indications}
      />
    </div>
  );
}

/* =========================================================
   VISUALIZE
========================================================= */

function Visualize({ grid, visuals, indications, flashSpot, dark }) {
  const heap = grid.find((row) => row[0] === "heap");
  const stack = grid.filter((row) => row[0] !== "heap");

  return (
    <div className="grid w-full h-[70vh] grid-cols-[1fr_1fr_1.5fr] items-start gap-5">
      {/* HEAP */}

      <div className={`min-h-[200px] rounded-2xl border p-5 ${dark ? "border-white bg-black text-white" : "border-[#222] bg-white text-black"}`}>
        <div className="mb-[15px] text-lg font-bold">Heap</div>

        <div className="flex flex-wrap gap-3">
          {heap &&
            heap.slice(1).map((variable, index) => {
              const [name, value, type] = variable;
              const indication = [...flashSpot.values()].find((item) => item && item.array === undefined && item.value === value);
              const highlighted = indication !== undefined;

              return (
                <div
                  key={index}
                  className="box-border min-h-[70px] min-w-[100px] rounded-xl p-3 text-black"
                  style={{
                    background: highlighted ? indication.color : "#dbeafe",
                    border: `1px solid ${highlighted ? indication.color : "#222"}`,
                  }}
                >
                  <div className="mb-2 font-bold">{name}</div>

                  <DisplayValue
                    value={value}
                    type={type}
                    indications={indications}
                    flashSpot={flashSpot}
                    dark={dark}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/* FUNCTION STACK */}

      <div className={`rounded-2xl border p-5 ${dark ? "border-white bg-black text-white" : "border-[#222] bg-white text-black"}`}>
        <div className="mb-[15px] text-lg font-bold">Function Stack</div>

        <div className="flex flex-col gap-3">
          {stack
            .slice()
            .reverse()
            .map((row, rowIndex) => {
              const scope = row[0];

              return (
                <div
                  key={rowIndex}
                  className="rounded-xl border border-[#222] bg-blue-100 p-3 text-black"
                >
                  <div className="mb-2.5 font-bold">{scope}</div>

                  <div className="flex flex-wrap gap-2.5">
                    {row.slice(1).map((variable, index) => {
                      const [name, value, type] = variable;
                      const indication = [...flashSpot.values()].find((item) => item && item.array === undefined && item.value === value);
                      const highlighted = indication !== undefined;

                      return (
                        <div
                          key={index}
                          className={`min-w-[100px] rounded-lg border p-2.5 ${
                            highlighted
                              ? "text-black"
                              : dark
                                ? "border-white bg-black text-white"
                                : "border-[#222] bg-white text-black"
                          }`}
                          style={highlighted ? { background: indication.color, borderColor: indication.color } : undefined}
                        >
                          <div className="font-bold">{name}</div>

                          <DisplayValue
                            value={value}
                            type={type}
                            indications={indications}
                            flashSpot={flashSpot}
                            dark={dark}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* VISUALS */}

      <div className={`rounded-2xl border p-5 ${dark ? "border-white bg-black text-white" : "border-[#222] bg-white text-black"}`}>
        <div className="mb-[15px] text-lg font-bold">Visuals</div>

        <div className="flex flex-col gap-5">
          {[...visuals.entries()].map(([element, visual]) => {
            if (visual.type !== "tree") return null;

            return (
              <div
                key={element}
                className="overflow-x-auto rounded-2xl border border-[#222] bg-blue-100 p-[15px] text-black"
              >
                <div className="mb-2.5 font-bold">{element}</div>

                <TreeVisual
                  root={visual.value}
                  indications={indications}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SCOPE VISUAL
========================================================= */

export default function ScopeVisual({ generator }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const { next, play, stop, playing, grid, visuals, flashSpot, indications, clearIndication, clearVisual, clearAll, logs } = useBox(generator);

  return (
    <div className={`w-full box-border p-5 ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="mb-5 flex items-start gap-[15px]">
        <button
          onClick={play}
          className={`shrink-0 cursor-pointer rounded-lg border px-5 py-2.5 text-base ${
            dark
              ? "border-white bg-black text-white"
              : "border-[#222] bg-white text-black"
          }`}
        >
          {playing ? "PAUSE" : "PLAY"}
        </button>

        <button
          onClick={next}
          className={`shrink-0 cursor-pointer rounded-lg border px-5 py-2.5 text-base ${
            dark
              ? "border-white bg-black text-white"
              : "border-[#222] bg-white text-black"
          }`}
        >
          NEXT
        </button>

        <button
          onClick={stop}
          className={`shrink-0 cursor-pointer rounded-lg border px-5 py-2.5 text-base ${
            dark
              ? "border-white bg-black text-white"
              : "border-[#222] bg-white text-black"
          }`}
        >
          STOP
        </button>

        <div className="flex flex-col gap-1 pt-1 font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>

      <Visualize
        grid={grid}
        visuals={visuals}
        indications={indications}
        flashSpot={flashSpot}
        dark={dark}
      />
    </div>
  );
}