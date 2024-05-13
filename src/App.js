import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/home/Navbar";
import Login from "./components/user/Login";
import Register from "./components/user/Register";


function App() {
  return (


    <BrowserRouter>
      <Navbar />
      <div className="pt-20 md:pt-0 md:pl-14 lg:pl-72">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autentificare" element={<Login />} />
          <Route path="/inregistrare" element={<Register />} />

        </Routes>
      </div>

    </BrowserRouter>

  );
}

export default App;
