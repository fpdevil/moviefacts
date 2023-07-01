import { useSearchParams } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { useTitle } from "../hooks/useTitle";

import { Card } from "../components";

export const Search = ({ apiPath }) => {
    // handle the query parameter terms
    const [searchParams] = useSearchParams();
    const queryTerm = searchParams.get("q");

    const { data: movies } = useFetch(apiPath, queryTerm);

    // set movie title in the page title
    useTitle(`Search Results for ${queryTerm}`);

    return (
        <main>
            <section className="py-6">
                <p className="text-3xl text-gray-700 dark:text-slate-100">
                    {movies.length === 0 ? `No match found for '${queryTerm}'` : `Found match for '${queryTerm}'`}
                </p>
            </section>

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
