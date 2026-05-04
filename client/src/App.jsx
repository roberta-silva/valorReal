import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Sidenav from './Components/Sidenav';
import Home from './Components/Home';

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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
