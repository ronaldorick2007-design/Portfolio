import { BrowserRouter, Routes, Route } from "react-router-dom";

import FruitDetails from "./CodeDisplay";
import Home from "./pages/Home";
import Header from "./components/Header";
import Codes from "./codes";
import ProblemDetails from "./problemDetails";
import ParserTest from "./test";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codes" element={<FruitDetails />} />
        <Route path="/fields" element={<Codes />} />
        <Route
    path="/codes/:id"
    element={<ProblemDetails />}
  />

      </Routes>
    </BrowserRouter>
  // <ParserTest />
  );
}

export default App;