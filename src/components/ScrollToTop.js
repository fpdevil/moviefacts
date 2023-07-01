import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    // extracts the pathname property (key) from an object
    const { pathname } = useLocation();

    // automatically scrolls to the top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
