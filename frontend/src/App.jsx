
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [colorMode] = useState("white");
  return (
    <div>
      <Navbar colorMode={colorMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;