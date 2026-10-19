import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";
import problems from "../scripts/problems";
import ProblemCard from "../components/ProblemCard";
import RippleField from "../components/RippleField";

const GUIDE = {
  install: {
  label: "Installation",
  eyebrow: "01 / Download & install",
  title: "Get JavaLens for your PC.",
  description:
    "Download the version of JavaLens built for your operating system from the official GitHub Releases page.",
  steps: [
    {
      title: "Open the releases page",
      detail: "Click the download link below to visit the official JavaLens GitHub Releases page.",
    },
    {
      title: "Choose your version",
      detail: "Under Assets, download the installer for your operating system: Windows, macOS, or Linux.",
    },
    {
      title: "Install and launch",
      detail: "Open the downloaded installer and follow the installation instructions for your operating system.",
    },
  ],
  note: "Java visualization requires a compatible JDK installed on your system.",
},
  start: {
    label: "Quick start",
    eyebrow: "02 / First run",
    title: "Follow one execution.",
    description:
      "Each example is a small, scenario-based Java program. Open a demo and move through its recorded execution to see how state changes.",
    steps: [
      { title: "Choose a demo", detail: "Start with Bubble Sort, then explore stacks, linked lists, maps, trees, or graphs." },
      { title: "Read the code", detail: "The gist gives you the goal; the description explains the scenario, structures, and expected result." },
      { title: "Inspect each step", detail: "Follow the current line and compare scopes, heap objects, and the visual panel." },
    ],

  },
  visuals: {
    label: "Visual guide",
    eyebrow: "03 / What you see",
    title: "Make runtime state visible.",
    description:
      "JavaLens connects source code to a view of the data structures and references that change while a program runs.",
    steps: [
      { title: "Scopes", detail: "Inspect local variables, values, types, and the method scope they belong to." },
      { title: "Heap", detail: "Inspect arrays and objects, their fields, and references between objects." },
      { title: "Visual + point", detail: "visual(...) registers a structure for visualization; point(...) highlights relevant nodes, array slots, or graph elements." },
    ],
    
  },
  contribute: {
  label: "Contribute",
  eyebrow: "04 / Open source",
  title: "Help make JavaLens better.",
  description:
    "Found a bug or have an idea? Contributions are welcome. Feel free to explore the issues and contribute to the project.",
  steps: [
    {
      title: "Find an issue",
      detail: "Browse the project's GitHub Issues and find a bug or improvement you'd like to work on.",
    },
    {
      title: "Make your changes",
      detail: "Fork the repository, create a branch, and implement your fix or feature.",
    },
    {
      title: "Submit a contribution",
      detail: "Open a pull request describing your changes and how you tested them.",
    },
  ],
  note: "Every contribution, big or small, is appreciated.",
},
  
};

function Codes() {
  const { appTheme,theme } = useTheme();
  const dark = theme === "dark";
  const [activeGuide, setActiveGuide] = useState("install");
  const guide = GUIDE[activeGuide];
  const shell = dark ? "bg-black text-white" : "bg-white text-black";
  const muted = dark ? "text-white/65" : "text-black/65";
  const panel = dark ? "border-white/20 bg-white/[0.025]" : "border-black/15 bg-black/[0.02]";

  return (
    <main className={`min-h-screen px-5 py-6 md:px-8 md:py-8 ${shell}`}>
  <div className="mx-auto max-w-7xl">
    

<header className="relative mb-8 flex min-h-[80vh] items-center overflow-hidden p-4 md:p-6">
  <div className="relative mx-auto w-full max-w-[1500px]">
    <div className="mb-8 flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center border-2 border-red-500 font-black text-red-500">
        J
      </span>

      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em]">
          JavaLens
        </p>
        <p className={`text-[10px] uppercase tracking-[0.18em] ${muted}`}>
          Java execution visualizer
        </p>
      </div>
    </div>

    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:gap-10">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          Understand code from the inside out
        </p>

        <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
          See what your Java code is doing.
        </h1>

        <p className={`mt-5 max-w-2xl text-sm leading-7 md:text-base ${muted}`}>
          Step through practical programs and inspect variables, object
          references, collections, and data structures as execution unfolds.
        </p>

        <a
  href="#examples"
  style={{ "--accent": "#ef4444" }}
  className={`
    mt-7 inline-flex items-center border px-5 py-3
    text-sm font-bold no-underline
    ${appTheme.base}
    ${appTheme.hover}
    ${appTheme.transition}
  `}
>
  Explore examples
  <span className="ml-3" aria-hidden="true">↓</span>
</a>
      </div>

      <div className="flex min-h-[380px] items-center justify-center md:translate-x-[-12px]">
  <RippleField
    touch={false}
    size={24}
    gap={10}
    maxRadius={5}
    speed={125}
    color={dark?"#bf7676":"#fecaca"}
    activeColor="#ef4444"
    className="shrink-0"
    style={{ width: 330, height: 330 }}
  />
</div>
    </div>
  </div>
</header>



        <section id="examples" className="mb-16 scroll-mt-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">01 / Example library</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Learn by seeing.</h2>
            </div>
            <p className={`max-w-xl text-sm leading-6 ${muted}`}>Six scenario-based Java programs, from array sorting to graph traversal. Each card gives you a quick gist and a fuller problem description.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {problems.map((problem, index) => (
              <div key={problem.id} className="relative min-w-0">
                
                <ProblemCard problem={problem} />
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-red-500/40 pt-10 md:pt-14">
          <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500">02 / Setup & field guide</p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Wanna try it yourself?</h2>
            <p className={`mt-3 max-w-2xl text-sm leading-6 ${muted}`}>A compact, tabbed guide for getting started and understanding the visualizer. Select a section to switch the instructions.</p>
          </div>

          <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
            <nav aria-label="JavaLens setup guide" className={`flex gap-2 overflow-x-auto border p-2 md:flex-col md:gap-0 md:p-0 ${panel}`}>
              {Object.entries(GUIDE).map(([key, item], index) => (
                <button key={key} type="button" onClick={() => setActiveGuide(key)} aria-pressed={activeGuide === key}
                  className={`flex shrink-0 items-center gap-3 border px-4 py-3 text-left text-sm font-bold transition md:border-0 md:border-b ${activeGuide === key ? "border-red-500 bg-red-500 text-white" : "border-transparent hover:border-red-500 hover:text-red-500"}`}>
                  <span className="font-mono text-[10px] opacity-70">0{index + 1}</span>{item.label}
                </button>
              ))}
            </nav>

            <article aria-live="polite" className={`min-h-[390px] border border-t-0 p-5 md:border-l-0 md:border-t md:p-8 ${panel}`}>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">{guide.eyebrow}</p>
              <h3 className="text-2xl font-black md:text-3xl">{guide.title}</h3>
              <p className={`mt-3 max-w-2xl text-sm leading-6 ${muted}`}>{guide.description}</p>
              <ol className="mt-7 space-y-5">
                {guide.steps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center border border-red-500 font-mono text-xs font-bold text-red-500">{index + 1}</span>
                    <div><h4 className="text-sm font-bold">{step.title}</h4><p className={`mt-1 text-sm leading-6 ${muted}`}>{step.detail}</p></div>
                  </li>
                ))}
                <a
  href="https://github.com/ronaldorick2007-design/JavaLens/releases/tag/v0.1.0"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-flex border border-red-500 bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
>
  Download JavaLens
  <span className="ml-2" aria-hidden="true">↗</span>
</a>
              </ol>
              
              <p className={`mt-4 border-l-2 border-red-500 pl-3 text-xs leading-5 ${muted}`}>{guide.note}</p>
              {activeGuide === "start" && problems.length > 0 && (
                <Link to={`/codes/${problems[0].id}`} className="mt-6 inline-flex border border-red-500 bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600">Open first demo <span className="ml-2" aria-hidden="true">↗</span></Link>
              )}
            </article>
          </div>
        </section>

        <footer className={`mt-14 flex flex-col gap-3 border-t border-red-500/30 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between ${muted}`}>
          <p>JavaLens · Understand Java from the inside out.</p>
          <a href="#examples" className="font-bold text-red-500 transition hover:text-red-400">Back to examples ↑</a>
        </footer>
      </div>
    </main>
  );
}

export default Codes;
