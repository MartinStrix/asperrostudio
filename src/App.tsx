import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { VideoPage } from './pages/VideoPage';
import { GrafikaPage } from './pages/GrafikaPage';
import { SocialPage } from './pages/SocialPage';
import { KontaktPage } from './pages/KontaktPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/grafika" element={<GrafikaPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
      </Routes>
    </Router>
  );
}

export default App;
