import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Codes from "./codes";
import ProblemDetails from "./problemDetails";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/codes" element={<FruitDetails />} /> */}
        <Route path="/codes" element={<Codes />} />
        <Route path="/codes/:id" element={<ProblemDetails />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



//{initially i this was cooler, but now it mid, so lets leave it for now...but here is the code for Home page leave the Termial or Ripplerfiled untouch for now let it be, but modify what is below, }