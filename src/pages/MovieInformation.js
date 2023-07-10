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
        return rating.toFixed(1) + '/10';
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
                    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left mt-4">
                        <svg aria-hidden="true" className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Movie ratings</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <p className="ml-2 text-sm font-bold text-slate-800 dark:text-white">{parseRating(movie.vote_average)}</p>
                        <span className="w-1 h-1 mx-4 bg-gray-500 rounded-full dark:bg-gray-400">
                        </span>
                        <span className="text-sm font-bold text-slate-800 hover:underline dark:text-slate-100">
                            {movie.vote_count} reviews
                        </span>
                    </div>

                    {/* enumerate through the movie genres */}
                    {
                        movie.genres && (
                            <div className="my-4 flex flex-wrap gap-4 sm:justify-start justify-evenly">
                                {movie.genres.map((genre) => (
                                    <span className="px-4 py-1 text-sm font-semibold border-2 border-slate-200 rounded-lg dark:border-slate-200 dark:text-amber-100" key={genre.id}>
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )
                    }


                    {/* for the movie information like data, time etc., */}
                    <div className="flex flex-wrap my-4 justify-evenly gap-4 sm:justify-start">
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

                    {/* Movie Overview information */}
                    <p className="mt-4 mb-1 text-slate-600 font-bold text-center lg:text-left dark:text-slate-400">
                        Overview
                    </p>
                    <p className="text-base text-justify indent-8 my-4">
                        {movie.overview}
                    </p>

                    {/* Movie financials */}
                    <div className="flex flex-wrap items-center font-bold max-w-2xl my-4 content-start sm:content-end md:content-center lg:content-between xl:content-around">
                        {/* for the movie budget information */}
                        <div className="flex-1">
                            <p className="mb-1 text-slate-600 dark:text-slate-400">
                                Budget
                            </p>
                            <p className="text-sm font-medium">
                                {parseCurrency(movie.budget)}
                            </p>
                        </div>

                        {/* for the movie revenue information */}
                        <div className="flex-1">
                            <p className="mb-1 text-slate-600 dark:text-slate-400">
                                Revenue
                            </p>
                            <p className="text-sm font-medium">
                                {parseCurrency(movie.revenue)}
                            </p>
                        </div>
                    </div>

                    {/* for the movie IMDB ID information */}
                    <ExternalMovieInfo imdb={movie.imdb_id} website={movie.homepage} />
                </div>
            </section>
        </main>
    );
}
