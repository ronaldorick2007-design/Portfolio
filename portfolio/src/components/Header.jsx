import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, setTheme, appTheme } = useTheme();

  const dark = theme === "dark";

  const headerStyle = dark
    ? "bg-white text-black"
    : "bg-black text-white";

  return (
    <header
      className={`flex items-center justify-between p-6 ${headerStyle}`}
    >
      <h1 className="text-4xl">
        <span className="font-bold text-cyan-400">
          Ronald
        </span>{" "}
        Portfolio
      </h1>

      <nav className="flex gap-5">
        <Link
          to="/"
          style={{ "--accent": "#22d3ee" }}
          className={`
            border
            px-2.5
            py-1
            ${appTheme.transition}
            ${appTheme.base}
            ${appTheme.hover}
          `}
        >
          Home
        </Link>

        <Link
          to="/codes"
          style={{ "--accent": "#22d3ee" }}
          className={`
            border
            px-2.5
            py-1
            ${appTheme.transition}
            ${appTheme.base}
            ${appTheme.hover}
          `}
        >
          Codes
        </Link>

        <Link
          to="/fields"
          style={{ "--accent": "#22d3ee" }}
          className={`
            border
            px-2.5
            py-1
            ${appTheme.transition}
            ${appTheme.base}
            ${appTheme.hover}
          `}
        >
          Fields
        </Link>

        <button
          onClick={() =>
            setTheme(
              theme === "light"
                ? "dark"
                : "light"
            )
          }
          style={{ "--accent": "#22d3ee" }}
          className={`
            border
            px-2.5
            py-1
            ${appTheme.transition}
            ${appTheme.base}
            ${appTheme.hover}
          `}
        >
          {theme}
        </button>
      </nav>
    </header>
  );
}