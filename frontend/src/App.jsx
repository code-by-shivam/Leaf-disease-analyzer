import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
import Analyzer from "./pages/Analyzer";
import Results from "./pages/Results";
import Pipeline from "./pages/Pipeline";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
