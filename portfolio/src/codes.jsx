import { useState } from "react";
import { useTheme } from "../src/components/ThemeProvider";
import problems from "./problems";
import ProblemCard from "./problemCard";

function Codes() {
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const dark = theme === "dark";

  const categories = [
    "All",
    ...new Set(problems.map((problem) => problem.category)),
  ];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      problem.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main
      className={`min-h-screen p-8 md:p-12 ${
        dark
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-6 text-3xl font-bold">
          DSA Problems
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`mb-4 w-full rounded-none border px-4 py-3 outline-none ${
            dark
              ? "border-white bg-black text-white placeholder:text-white focus:border-red-500"
              : "border-black bg-white text-black placeholder:text-black focus:border-red-500"
          }`}
        />

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-none border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-red-500 bg-red-500 text-white"
                    : dark
                      ? "border-white bg-black text-white hover:border-red-500 hover:text-red-500"
                      : "border-black bg-white text-black hover:border-red-500 hover:bg-red-500 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Problems */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

export default Codes;