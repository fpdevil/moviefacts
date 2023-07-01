import { useEffect, useState } from "react";

export const useFetch = (apiPath, queryTerm = "") => {
    // fetched data state handling
    const [data, setData] = useState([]);

    // api uri handling
    const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}`;

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();

            setData(json.results);
        }

        fetchData();
    }, [url]);

    return { data };
}
