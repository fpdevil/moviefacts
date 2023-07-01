import { Link, NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="p-6 bg-white shadow dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 <Link to="/" className="hover:underline">MovieFacts™</Link>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <NavLink to="/about" className="link mr-4 hover:underline md:mr-6">About</NavLink>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/eventhorizon" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">YouTube</a>
                    </li>
                    <li>
                        <a href="https://github.com/fpdevil" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">Github</a>
                    </li>
                    <li>
                        <NavLink to="/contact" className="link mr-4 hover:underline md:mr-6">Contact</NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
