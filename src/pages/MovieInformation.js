import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useTitle } from "../hooks/useTitle";

import { ExternalMovieInfo } from '../components/ExternalMovieInfo';

import Backup from '../assets/images/backup.png';
import Iso639 from '../data/iso639.json';

function parseDate(year) {
    if (!year) {
        return 'N/A';
    } else {
        // return year.substring(0, 4);
        return new Date(year).toLocaleDateString(
            'en-us',
            {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }
        );
    }
}

function parseRating(rating) {
    if (rating !== undefined) {
        return rating.toFixed(1);
    } else {
        return 0;
    }
}

function parseRuntime(runtime) {
    if (runtime !== 0 && runtime !== undefined) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return hours + 'h ' + minutes + 'm';
    } else {
        return 'N/A';
    }
}

function parseContent(code, cl) {
    if ((typeof cl !== 'undefined') && (cl.length !== 0)) {
        const results = cl.filter((c) => (c.certification && c.iso_3166_1.toLowerCase() === code.toLowerCase()));
        return results.length !== 0 ? results[0].certification : 'N/A';
    } else {
        return 'N/A';
    }
}

function parseCurrency(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });
    return formatter.format(value);
}

export const MovieInformation = () => {
    // handle path params for the movie id
    const params = useParams();
    // console.log(`movie params: ${JSON.stringify(params)}`);

    // handle the found movie state
    const [movie, setMovie] = useState({});

    // handle movie poster if not available
    const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : Backup;

    // call the TMDB Movie API with the movie ID
    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=releases,credits`);
            const json = await response.json();

            setMovie(json);
        }

        fetchMovie();
    }, [params.id]);


    // react Hook For State Handler - handle the iso639  language code conversion
    const [lang, setLang] = useState({});

    useEffect(() => {
        async function filterLang() {
            setLang(Iso639);
        }

        filterLang();
    }, [lang]);

    // set movie title or name in the page title
    const title = movie.title ? movie.title : movie.original_name || movie.original_title;
    useTitle(`${title}`);

    return (
        <main>
            <section className="flex flex-wrap justify-around py-6">
                {/* for the movie poster */}
                <div className="max-w-sm md:pr-8 md:pl-0 sm:place-content-center">
                    <img className="rounded-md" alt={movie.title} src={image} />
                </div>

                {/* for the movie information */}
                <div className="max-w-2xl text-slate-700 dark:text-slate-100">
                    <h1 className="text-4xl font-bold text-center lg:text-left mt-4 mt-2">
                        {title}
                    </h1>
                    {
                        movie.tagline && (
                            <h2 className="text-xs italic font-light sm:text-sm text-center lg:text-left">
                                {movie.tagline}
                            </h2>
                        )
                    }


                    {/* for the movie rating */}
                    {/* start Component: Basic Rating */}
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <div className="hidden text-sm font-semibold sm:block -space-x-2 overflow-hidden">
                            IMDB Rating
                        </div>
                        <div className="boder-none sm:border-l-2 border-slate-800 dark:border-slate-100 sm:pl-8">
                            <div className="flex justify-center sm:justify-start place-items-baseline">


                                <span className="flex justify-center sm:justify-start place-items-baseline text-amber-400" role="img" aria-label="star rating">
                                    <span aria-hidden="true">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 mr-3">
                                            <title>IMDB Movie Rating</title>
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </span>

                                <span className="tracking-widest font-semibold text-xl text-slate-800 dark:text-white mr-0">{parseRating(movie.vote_average)}</span>
                                <span className="text-sm">/10</span>
                            </div>
                            <div>
                                <h3 className="text-md font-serif text-slate-800 dark:text-slate-100">Based on {movie.vote_count} reviews</h3>
                            </div>
                        </div>
                    </div>
                    {/* end Component: Basic Rating */}

                    {/* enumerate through the movie genres */}
                    {/* start Component: Genre listing */}
                    {
                        movie.genres && (
                            <div className="my-4 flex flex-wrap gap-4 justify-evenly">
                                {movie.genres.map((genre) => (
                                    <span className="px-4 py-1 text-sm font-semibold border-2 border-slate-200 rounded-lg dark:border-slate-200 dark:text-amber-100" key={genre.id}>
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )
                    }
                    {/* end Component: Genre listing */}


                    {/* for the movie information like data, time etc., */}
                    {/* start Component: movie information */}
                    <div className="flex my-4 flex-wrap justify-evenly gap-4 px-2 justify-items-center">
                        {movie.releases && (
                            <div className="flex-1">
                                <p className="mb-1 text-slate-400">
                                    Rated
                                </p>
                                <p className="text-sm font-medium">
                                    {parseContent('US', movie.releases.countries || [])}
                                </p>
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="mb-1 text-slate-400">
                                Runtime
                            </p>
                            <p className="text-sm font-medium">
                                {parseRuntime(movie.runtime)}
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="mb-1 text-slate-400">
                                Language
                            </p>
                            {lang[movie.original_language] && (
                                <p className="text-sm font-medium">
                                    {lang[movie.original_language].name}
                                </p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="mb-1 text-slate-400">Status</p>
                            <p className="text-sm font-medium">
                                {movie.status}
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="mb-1 text-slate-400">
                                Date
                            </p>
                            <p className="text-sm font-medium">
                                {parseDate(movie.release_date)}
                            </p>
                        </div>
                    </div>
                    {/* end Component: movie information */}

                    {/* Movie Overview information */}
                    {/* start Component: movie overview */}
                    <p className="mt-4 mb-1 text-slate-600 font-bold text-center lg:text-left dark:text-slate-400">
                        Overview
                    </p>
                    <p className="text-base text-justify indent-8 my-4">
                        {movie.overview}
                    </p>
                    {/* end Component: movie overview */}

                    {/* Movie budget and finance */}
                    {/* start Component: movie budget and external movie links */}
                    <div className="w-full">
                        <div className="grid w-full grid-cols-2 gap-0">
                            <div className="m-3 mx-auto flex w-32 p-4">
                                {/* for the movie budget information */}
                                <div className="flex-auto">
                                    <p className="mb-1 text-slate-600 dark:text-slate-400">
                                        Budget
                                    </p>
                                    <p className="text-sm font-medium">
                                        {parseCurrency(movie.budget)}
                                    </p>
                                </div>
                            </div>

                            {/* for the movie revenue information */}
                            <div className="m-3 mx-auto flex w-32 p-4">
                                <div className="flex-auto">
                                    <p className="mb-1 text-slate-600 dark:text-slate-400">
                                        Revenue
                                    </p>
                                    <p className="text-sm font-medium">
                                        {parseCurrency(movie.revenue)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end Component: movie budget and external movie links */}

                    {/* for the movie IMDB ID information */}
                    {/* start Component: external movie links */}
                    <ExternalMovieInfo imdb={movie.imdb_id} website={movie.homepage} />
                    {/* end Component: external movie links */}
                </div>
            </section>
        </main>
    );
}
