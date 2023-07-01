import { useEffect } from "react";

export const useTitle = (title) => {
    // set movie title in the page title
    useEffect(() => {
        document.title = `${title}`;
    });

    return null;
}
