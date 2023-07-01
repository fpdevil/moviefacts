import { FaFilm, FaImdb } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export const ExternalMovieInfo = ({ imdb, website }) => {
    return (
        <div className="flex flex-wrap items-center font-bold max-w-2xl my-4 content-start sm:content-end md:content-center lg:content-between xl:content-around">
            {/* External IMDB Link for the movie */}
            {!imdb ? null : (
                <a href={`https://www.imdb.com/title/${imdb}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                >
                    <p className="mb-1 text-slate-600 dark:text-slate-400">IMDB</p>
                    <IconContext.Provider value={{ style: { fontSize: '30px', color: "rgb(255,179,71)" } }}>
                        <FaImdb size={40} className='text-base' />
                    </IconContext.Provider>
                </a>
            )}

            {/* External Movie Link from the producers */}
            {website === '' || website === undefined ? null : (
                <a href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                >
                    <p className="mb-1 text-slate-600 dark:text-slate-400">Movie</p>
                    <IconContext.Provider value={{ style: { fontSize: '30px', color: "rgb(245, 203, 167)" } }}>
                        <FaFilm size={40} className='text-base' />
                    </IconContext.Provider>
                </a>
            )}
        </div>
    );
}
