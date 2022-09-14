import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from 'react-router-dom'
import FullAnimeBlock from './pages/FullAnimeBlock';
import NotFound from './pages/NotFound';

function App() {
  const { pathname } = useLocation()

  return (
    <div className="App">
      {pathname === '/' && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/anime/:id' element={<FullAnimeBlock />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {pathname === '/' && <Footer />}
    </div>
  );
}

export default App;
