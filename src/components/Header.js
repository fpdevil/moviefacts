import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Logo from '../assets/logo.png';

export const Header = () => {
    // by default hidden is false
    const [hidden, setHidden] = useState(true);

    // setting dark mode of tailwind css
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

    // handle search results with navigation (not re-rendering)
    const navigate = useNavigate();

    // handling the dark mode settings and persisting
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // styling for active and inactive mode
    const activeClass = "text-base block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
    const inActiveClass = "text-base block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

    // how to handle on clicking submit in Search
    const handleSubmit = (event) => {
        event.preventDefault();
        const queryTerm = event.target.search.value;
        event.target.reset();

        return navigate(`/search?q=${queryTerm}`);
    };

    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-white border-b-2 border-gray-200 px-2 py-2 sm:px-4 dark:bg-gray-900 dark:border-b-1 dark:border-gray-900">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    {/* What to do when Logo on top left is clicked */}
                    <Link to="/" className="flex items-center">
                        <img src={Logo} className="h-8 mr-4 rounded-lg sm:h-9" alt="MovieFacts Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            MovieFacts
                        </span>
                    </Link>

                    <div id='mobile-nav-links' className="flex md:order-2">
                        {/* Dark mode theme toggle switch */}
                        <button onClick={() => setDarkMode(!darkMode)}
                            data-tooltip-target="tooltip-toggle"
                            className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">

                            {darkMode ?
                                <svg aria-hidden="true" id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg> :
                                <svg aria-hidden="true" id="theme-toggle-light-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd">
                                    </path>
                                </svg>
                            }
                        </button>

                        {/* Search field handling for small screens */}
                        <button onClick={() => setHidden(!hidden)} type="button"
                            data-collapse-toggle="navbar-search"
                            aria-controls="navbar-search" aria-expanded="false"
                            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                                </path>
                            </svg>
                            <span className="sr-only">
                                Search
                            </span>
                        </button>

                        {/* Show the Search field on button click */}
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                                    </path>
                                </svg>
                                <span className="sr-only">
                                    Search icon
                                </span>
                            </div>

                            {/* Submitting the Search parameter */}
                            <form onSubmit={handleSubmit}>
                                <input type="text" id="search-navbar" name="search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                            </form>
                        </div>

                        {/* Regular screen Search field button */}
                        <button onClick={() => setHidden(!hidden)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">
                                Open menu
                            </span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <div id='nav-links' className={`${hidden ? "hidden" : ""} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <input type="text" id="mobile-search-navbar" name="search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                            </form>
                        </div>

                        {/* Handling Top clickable fields */}
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inActiveClass} end>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies/popular" className={({ isActive }) => isActive ? activeClass : inActiveClass}>
                                    Popular
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies/top" className={({ isActive }) => isActive ? activeClass : inActiveClass}>
                                    Top Rated
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies/upcoming" className={({ isActive }) => isActive ? activeClass : inActiveClass}>
                                    Upcoming Movies
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
