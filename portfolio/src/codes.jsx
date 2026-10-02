import { useState } from "react";
import problems from "./problems";
import ProblemCard from "./problemCard";

function Codes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
    <main className="p-12">

      <h1 className="text-3xl font-bold mb-6">
        DSA Problems
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* Categories */}
      <div className="flex gap-2 mb-8">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className="px-4 py-2 border rounded-lg"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
          />
        ))}
      </div>

    </main>
  );
}

export default Codes;