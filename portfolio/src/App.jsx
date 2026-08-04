import "./App.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Codes from "./pages/Codes";

export default function App(){
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/codes" element = {<Codes/>}/>
      </Routes>
    </BrowserRouter>
  );
}