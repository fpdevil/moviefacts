import { Routes, Route } from "react-router-dom";
import { MoviesList, MovieInformation, Search, PageNotFound, About, Contact } from '../pages';

export const AllRoutes = () => {
    return (
        <div className="dark:bg-darkbg">
            <Routes>
                <Route path="" element={<MoviesList apiPath="movie/now_playing" title="Home" />} />
                <Route path="movie/:id" element={<MovieInformation />} />
                <Route path="movies/popular" element={<MoviesList apiPath="movie/popular" title="Popular" />} />
                <Route path="movies/top" element={<MoviesList apiPath="movie/top_rated" title="Top Rated" />} />
                <Route path="movies/upcoming" element={<MoviesList apiPath="movie/upcoming" title="UpComing" />} />
                <Route path="search" element={<Search apiPath="search/movie" />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound title="Page Not Found" />} />
            </Routes>
        </div>
    );
}
