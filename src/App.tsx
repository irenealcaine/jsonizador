import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './components/home/Home';
import Validator from './components/validator/Validator';
import Viewer from './components/viewer/Viewer';
import Creator from './components/creator/Creator';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/validator" element={<Validator />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/creator" element={<Creator />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
