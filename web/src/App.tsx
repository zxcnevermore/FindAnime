import React from 'react';
import Home from './pages/Home';
import { Routes, Route} from 'react-router-dom'
import FullAnimeBlock from './pages/FullAnimeBlock';
import NotFound from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/anime/:id' element={<FullAnimeBlock />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
