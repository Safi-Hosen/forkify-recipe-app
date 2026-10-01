import "./App.css";
import Home from "./pages/home";
import Details from "./pages/details";
import Favorites from "./pages/favorites";
import Navbar from "./components";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="">
        <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details-item/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
