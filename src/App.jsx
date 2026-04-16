import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './Pages/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './Components/NavBar';
import MoviesPage from './Pages/MoviesPage';
import PeoplesPage from './Pages/PeoplesPage';
import PeoplePage from './Pages/PeoplePage';
import MoviePage from './Pages/MoviePage';
import GenrePage from './Pages/GenrePage';
import FavoritePage from './Pages/FavoritePage';
import WatchlistPage from './Pages/WatchListPage';
import SearchPage from './Pages/SearchPage';
import Footer from './Components/Footer';


function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <div className="theme-switch">
        <button onClick={toggleTheme} className="btn btn-primary">
          {theme === 'dark' ? '🌙 Modalità Notte' : '🌞 Modalità Giorno'}
        </button>
      </div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/peoples' element={<PeoplesPage />} />
          <Route path='/people/:id' element={<PeoplePage />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/genre/:id' element={<GenrePage />} />
          <Route path='/favorite' element={<FavoritePage />} />
          <Route path='/watchlist' element={<WatchlistPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
