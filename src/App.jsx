import './css/App.css'
import Favorites from './pages/favorites';
import Home from './pages/home';
import {Routes, Route} from "react-router-dom"
import { MovieProvider } from './contexts/movieContext';
import NavBar from "./components/NavBar";

function App() {

  return (
    <MovieProvider>
    <NavBar></NavBar>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/favorites" element={<Favorites />}/>
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App 
