import { Link } from "react-router-dom";

import { Button } from "../components";
import { useTitle } from "../hooks/useTitle";

import NotFound from "../assets/images/404.jpg";

export const PageNotFound = ({ title }) => {
    // set not found title in the page title
    useTitle(`${title} - MovieFacts`);


    return (
        <main>
            <section className="flex flex-col justify-center px-2">
                <div className="flex flex-col items-center my-5">
                    <h1 className="text-6xl font-bold text-purple-400 my-5 dark:text-slate-100">Whoops!</h1>
                    <div className="max-w-lg">
                        <img className="rounded" alt="404 Page Not Found" src={NotFound} />
                    </div>
                    <p className="text-2xl text-cyan-500 pb-8 px-12 py-4 font-medium dark:text-blue-100">We can't find the page you're looking for.</p>
                </div>
                <div className="flex justify-center">
                    <Link to="/">
                        <Button>Back To Movies</Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
