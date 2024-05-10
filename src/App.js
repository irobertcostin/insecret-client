import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/home/Navbar";
import Home from "./components/home/Home";


function App() {
  return (


    <BrowserRouter>
      <Navbar />
      <div className="pt-20 md:pt-0 md:pl-14 lg:pl-72">
        <Routes>

        </Routes>
      </div>

    </BrowserRouter>

  );
}

export default App;
