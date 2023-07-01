export const About = () => {
    return (
        <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 mx-8 px-8 py-8">
            <img alt="Nature"
                src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" className="h-32 w-full object-cover md:h-full rounded-md"
            />
            <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                <p className="text-sm font-semibold uppercase tracking-widest dark:text-slate-200">
                    Powered By React
                </p>

                <h2 className="mt-6 font-black uppercase">
                    <span className="text-4xl font-black sm:text-5xl lg:text-6xl dark:text-slate-200">
                        Movie API by TMDB
                    </span>

                    <span className="mt-4 block text-sm dark:text-slate-200">Explore Millions of movies, TV shows and people to discover</span>
                </h2>

                <p className="mt-8 inline-block max-w-sm rounded bg-black dark:bg-white p-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                    Get Your API Key Today
                </p>

                <p className="mt-6 text-xs font-medium uppercase text-gray-400">
                    Powered By React
                </p>
            </div>
        </section>
    );
}
