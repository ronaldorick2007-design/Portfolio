import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Codes from "./pages/Codes";
import ProblemDetails from "./components/ProblemDetails";
import "./index.css";

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codes" element={<Codes />} />
        <Route path="/codes/:id" element={<ProblemDetails />}/>
      </Routes>
    </>
  );
}

export default App;