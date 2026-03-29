import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { DocsPage } from "./pages/DocsPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ShowcasePage } from "./pages/ShowcasePage";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ShowcasePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
