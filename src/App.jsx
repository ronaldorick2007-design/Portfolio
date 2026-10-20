import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Codes from "./pages/Codes";
import ProblemDetails from "./components/ProblemDetails";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename = "/Portfolio">
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codes" element={<Codes />} />
        <Route path="/codes/:id" element={<ProblemDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;