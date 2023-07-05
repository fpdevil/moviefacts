import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";

import { Card } from "../components";

export const MoviesList = ({ apiPath, title }) => {
    // fetch movie information using the custom hook useFetch.
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
