import { BrowserRouter, Routes, Route } from "react-router-dom";

import FruitDetails from "./CodeDisplay";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fruits/:id" element={<FruitDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;