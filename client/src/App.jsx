import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Sidenav from './Components/Sidenav';
import Home from './Pages/Home';
import Calculadora from './Pages/Calculadora';
import Historico from './Pages/Historico';
import Categorias from './Pages/Categorias';
import ComoFunciona from './Pages/ComoFunciona';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="estrutura">
          <Sidenav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="calculadora" element={<Calculadora />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="historico" element={<Historico />} />
              <Route path="como-funciona" element={<ComoFunciona />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
