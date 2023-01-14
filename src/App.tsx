import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route
      path="/now_playing"
      element={<ItemList itemLabel={loadSection[0]} />}
    /> */}
      {/* <Route
      path="/popular"
      element={<ItemList itemLabel={loadSection[1]} />}
    /> */}
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};
export default App;
