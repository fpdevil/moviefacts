import { Link } from "react-router-dom";
import Backup from "../assets/images/backup.png";

export const Card = ({ movie }) => {
    const { id, original_title, overview, poster_path } = movie;
    const image = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup;

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
            <Link to={`/movie/${id}`}>
              <img className="rounded-t-lg opacity-100 transition duration-300 ease-in-out hover:opacity-90" src={image} alt="" />
            </Link>
            <div className="p-5">
                <Link to={`/movie/${id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {original_title}
                    </h5>
                </Link>
                <p className="mb-3 font-normal text-justify text-gray-700 dark:text-gray-400">
                    {overview}
                </p>
                <Link to={`/movie/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd">
                        </path>
                    </svg>
                </Link>
            </div>
        </div>
    );
}
