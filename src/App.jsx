import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import CalculatorPage from './pages/CalculatorPage';
import GuidePage from './pages/GuidePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/guide" element={<GuidePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
