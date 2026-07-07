import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Book from './pages/Book';
import SalesIdentity from './pages/SalesIdentity';
import Athletes from './pages/Athletes';
import SalesCulture from './pages/SalesCulture';
import Lawyers from './pages/Lawyers';
import JuryAnalysis from './pages/JuryAnalysis';
import WitnessIdentity from './pages/WitnessIdentity';
import DepositionIdentity from './pages/DepositionIdentity';
import FreeBlueprints from './pages/FreeBlueprints';
import ForCeos from './pages/ForCeos';
import AiManager from './pages/AiManager';
import Trader from './pages/Trader';
import TraderThankYou from './pages/TraderThankYou';
import PftThirtyDay from './pages/PftThirtyDay';
import PftSixtyDay from './pages/PftSixtyDay';
import PftNinetyDay from './pages/PftNinetyDay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/for-ceos" element={<ForCeos />} />
        <Route path="/ai-manager" element={<AiManager />} />
        <Route path="/trader" element={<Trader />} />
        <Route path="/trader/thank-you" element={<TraderThankYou />} />
        {/* Private, unlisted product pages — NOT linked from nav/footer/sitemap; noindex,nofollow set per page */}
        <Route path="/trader/pft-30day" element={<PftThirtyDay />} />
        <Route path="/trader/pft-60day" element={<PftSixtyDay />} />
        <Route path="/trader/pft-90day" element={<PftNinetyDay />} />
        <Route path="/book" element={<Book />} />
        <Route path="/sales-identity" element={<SalesIdentity />} />
        <Route path="/athletes" element={<Athletes />} />
        <Route path="/free-blueprints" element={<FreeBlueprints />} />
        <Route path="/sales-culture" element={<SalesCulture />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/lawyers/jury-analysis" element={<JuryAnalysis />} />
        <Route path="/lawyers/witness-identity" element={<WitnessIdentity />} />
        <Route path="/lawyers/deposition-identity" element={<DepositionIdentity />} />
      </Routes>
    </Router>
  );
};

export default App;
