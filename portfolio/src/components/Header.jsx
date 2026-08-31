import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { themes } from "../styles/themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className={themes.Header[theme]}>
      
      <h1 className="text-white text-4xl">
        <span id="logo" className="text-4xl font-bold text-cyan-400">
        Ronald
      </span>
         Portfolio</h1>
      <nav className="flex gap-5">
        <Link
          to="/"
          className="border border-white px-2.5 py-1 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Home
        </Link>
        <Link
          to="/codes"
          className="border border-white px-2.5 py-1 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Codes
        </Link>
        <Link
          to="/fields"
          className="border border-white px-2.5 py-1 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Fields
        </Link>
        <a
          href="#"
          className="border border-white px-2.5 py-1 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Home
        </a>
        <a
        className="border border-white px-2.5 py-1 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
        onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
      >
        {theme}
      </a>
      </nav>
    </header>
  );
}