import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import TopicsPage from './pages/TopicsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="topics" element={<TopicsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
