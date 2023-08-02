import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./pages/footer";
import PopularMovies from "./pages/popular";
import Navigation from "./pages/navigation";
import UpcomingMovies from "./pages/upComing";
import TopRatedMovies from "./pages/topRated";
import FilmDetails from "./pages/filmDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route path="/upcomingMovies/:id" element={<FilmDetails />} />
          <Route path="/upcomingMovies" element={<UpcomingMovies />} />
          <Route path="/popular" element={<PopularMovies />} />
          <Route path="/popular/:id" element={<FilmDetails />} />
          <Route path="/topRated" element={<TopRatedMovies />} />
          <Route path="/topRated/id" element={<FilmDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
