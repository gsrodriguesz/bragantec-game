import { Routes, Route } from 'react-router-dom';
import './App.css'
import { GameProvider } from './Components/GameSystem';
import { GameUI } from './Components/GameUI';
import { Header } from './Components/Header'
import { Projetos } from './pages/Projetos'
import { Curso } from './pages/Curso'
import { Scratch } from './pages/Scratch'
import { Footer } from './Components/Footer'
import { Homepage } from './pages/Homepage';
import { AdminPanel } from './Components/AdminPanel';

function App() {


  return (
    <GameProvider>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/*" element={
          <>
            <Header />
            <GameUI />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/curso" element={<Curso />} />
              <Route path="/scratch" element={<Scratch />} />
            </Routes>
            {/* <Footer /> */}
          </>
        } />
      </Routes>
    </GameProvider>

  )
}

export default App
