import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";

import { Card } from "../components";

export const MoviesList = ({ apiPath, title }) => {
    // fetch movie information using the custom hook useFetch.
    // "https://api.themoviedb.org/3/movie/now_playing?api_key=31ec74143f2dc41bdd1f3e95576eff57"
    const { data: movies } = useFetch(apiPath);

    // set movie title in the page title
    useTitle(`${title}`);

    return (
        <main>
            <section className="max-w-7xl mx-auto py-7">
                <div className="flex flex-wrap justify-start other:justify-evenly">
                    {movies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </main>
    );
}
