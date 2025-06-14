import { useState, useEffect } from "react";

export function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return width;
}

export function useIsMobile(breakpoint = 1200) {
    const width = useWindowWidth();
    return width <= breakpoint;
}