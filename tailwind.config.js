/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "rgb(56 189 248 / var(--tw-text-opacity))",
                bgDark: "rgb(15 23 42)",
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                slideOut: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            animation: {
                slideIn: "slideIn 300ms ease-out",
                slideOut: "slideOut 300ms ease-in",
            },
            backgroundImage: {
                "light-glow":
                    "linear-gradient(45deg, #ffffff 0%, #ffffff 65%, #c1e6ed 66%, #f5c6f2 67%, #ffffff 79%, #9db1f7 80%, #7f9bf5 81%, #6285f6 82%, #ffffff 85%, #ffffff 100%)",
                "dark-glow":
                    "linear-gradient(45deg, #0f172a 0%, #0f172a 65%, #18c3c4 66%, #189ac4 67%, #0f172a 79%, #5a18c4 80%, #c816d9 81%, #f309dd 82%, #0f172a 85%, #0f172a 100%)",
            },
        },
    },
    plugins: [],
};
