import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Optimizer from "./pages/Optimizer";
import Gear from "./pages/Gear";
import Upgrade from "./pages/Upgrade";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/optimizer" element={<Optimizer />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}