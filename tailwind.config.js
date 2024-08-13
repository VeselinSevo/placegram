// tailwind.config.js
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
        },
    },
    plugins: [],
};
