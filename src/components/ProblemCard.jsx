import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

function ProblemCard({ problem }) {
  const { appTheme } = useTheme();

  return (
    <Link
      to={`/codes/${problem.id}`}
      style={{ "--accent": "#ef4444" }}
      className={`
        block
        border
        p-6
        no-underline
        ${appTheme.base}
        ${appTheme.hover}
        ${appTheme.transition}
      `}
    >
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-xl font-bold">
          {problem.title}
        </h2>

        <span className="border px-2 py-1 text-xs">
          {problem.difficulty}
        </span>
      </div>

      <p className="mb-6 text-sm">
        {problem.gist}
      </p>

      <div className="text-xs font-bold uppercase tracking-wider">
        {problem.category}
      </div>
    </Link>
  );
}

export default ProblemCard;