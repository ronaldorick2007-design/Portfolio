import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeProvider";
import Terminal from "../components/Terminal";
import RippleField from "../components/RippleField";

export default function Home() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const card = `
    flex
    flex-1
    flex-col
    justify-center
    border-2
    p-5
    text-center
    text-xl
    font-medium
    transition-all
    duration-300
    ease-in-out
    hover:scale-95
    ${
      dark
        ? "bg-black text-white border-white hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[10px_10px_0_var(--accent)]"
        : "bg-[var(--accent)] text-black border-black hover:bg-[var(--accent)] hover:border-black hover:shadow-[10px_10px_0_#000]"
    }
  `;

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-white text-black"
      }
    >
      {/* Intro */}
      <div className="relative grid h-[calc(100vh-88px)] w-full grid-cols-2 overflow-hidden">
        {/* LEFT HALF */}
        <div className="relative h-full w-full">
          {/* BIG TRIANGLE */}
          <div className="absolute inset-0 bg-red-600 [clip-path:polygon(0_0,100%_0,0_100%)]" />
          {/* SMALL TRIANGLE */}
          <div className="absolute inset-0 bg-red-600 [clip-path:polygon(0_50%,0_100%,50%_100%)]" />
          {/* INTRO CONTENT LATER */}
        </div>

        {/* RIGHT HALF */}
        <div className="h-full w-full pt-40">
          <Terminal />
        </div>
      </div>

      <main className="px-20">
        {/* Zigzag About / Learning */}
        <section className="py-10 sm:py-14">
          <div className="space-y-16">
            {/* ABOUT : ARROW — 2:1 */}
            <div className="flex items-center gap-8 md:gap-12">
              <article
                style={{ "--accent": "#f8ff2b" }}
                className={`${card} min-h-[300px] flex-[2] gap-6 text-left`}
              >
                <h2 className="text-3xl font-bold after:content-['|'] after:animate-blink">
                  About Me
                </h2>
                <p className="text-base leading-relaxed">
                  Hello! I’m Ronald, a Computer Science student who enjoys
                  building software and learning how systems work behind the
                  scenes.
                </p>
                <p className="text-base leading-relaxed">
                  I like turning ideas into practical projects, exploring
                  algorithms, and experimenting with interface design.
                </p>
              </article>

              <div className="hidden flex-1 items-center justify-center md:flex">
                <RippleField
                  touch={false}
                  size={18}
                  gap={12}
                  maxRadius={5}
                  speed={200}
                  color={dark ? "#52525b" : "#d4d4d8"}
                  activeColor="#f8ff2b"
                  matrix={`
00000
01000
11111
01000
00000`}
                  className="h-[138px] w-[138px] shrink-0"
                />
              </div>
            </div>

            {/* RING : LEARNING — 1:2 */}
            <div className="flex items-center gap-8 md:gap-12">
              <div className="hidden flex-1 items-center justify-center md:flex">
                <RippleField
                  touch={false}
                  size={18}
                  gap={12}
                  maxRadius={5}
                  speed={200}
                  color={dark ? "#52525b" : "#d4d4d8"}
                  activeColor="#36deff"
                  matrix={`
01110
10001
10001
10001
01110`}
                  className="h-[138px] w-[138px] shrink-0"
                />
              </div>

              <article
                style={{ "--accent": "#36deff" }}
                className={`${card} min-h-[300px] flex-[2] gap-6 text-left`}
              >
                <h2 className="text-3xl font-bold after:content-['|'] after:animate-blink">
                  Currently Learning
                </h2>
                <ul className="space-y-3 text-base">
                  <li>— Data Structures and Algorithms</li>
                  <li>— JavaScript, Python &amp; C</li>
                  <li>— React &amp; Tailwind CSS</li>
                  <li>— Node.js, SQL &amp; Databases</li>
                  <li>— Git &amp; GitHub</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Current project */}
        <section className="pb-14 sm:pb-20">
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              03 / Current project
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              What I’m building<span className="text-red-500">.</span>
            </h2>
          </div>

          {/* FIXED: Link instead of <a href>, no /Portfolio prefix (basename adds it) */}
          <Link
            to="/codes"
            style={{ "--accent": "#89fc00" }}
            className={`${card} min-h-[260px] gap-6 text-left no-underline`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] opacity-60">
                  Featured project
                </p>
                <h3 className="text-4xl font-black sm:text-5xl">JavaLens</h3>
              </div>
              <span aria-hidden="true" className="text-3xl text-red-500">
                ↗
              </span>
            </div>
            <p className="max-w-3xl text-base leading-relaxed">
              A Java execution visualizer that helps make program behavior
              easier to understand by exploring variables, objects, references,
              and data structures step by step.
            </p>
            <span className="mt-auto inline-flex w-fit items-center border-2 border-current px-4 py-3 text-sm font-bold">
              Explore JavaLens{" "}
              <span className="ml-3" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}