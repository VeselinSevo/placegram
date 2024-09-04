import { useState, useEffect, useRef } from "react";

function useDynamicHeight() {
    const [height, setHeight] = useState("auto");
    const footerRef = useRef(null);
    const navbarRef = useRef(null);

    useEffect(() => {
        function updateHeight() {
            const navbarHeight = navbarRef.current?.offsetHeight || 0;
            const footerHeight = footerRef.current?.offsetHeight || 0;
            setHeight(`calc(100vh - ${navbarHeight}px - ${footerHeight}px)`);
        }

        // Update height on mount and on window resize
        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    return { height, navbarRef, footerRef };
}

export default useDynamicHeight;
