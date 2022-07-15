import "./App.css";
import React from "react";
import Coin from "./features/coin/coin";
import { Link, Route, Routes } from "react-router-dom";
import { Api } from "./features/Api component/Api";

function App() {
  return (
    <div className="App">
      <Link to={"/"} exact="true">
        {" "}
        Coin{" "}
      </Link>
      <br />
      <Link to={"/api"}> API </Link>
      <Routes>
        <Route path="/" element={<Coin></Coin>} />
        <Route path="/api" element={<Api />} />
      </Routes>
    </div>
  );
}

export default App;
