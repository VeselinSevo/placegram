import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxRuntime: "automatic",
        }),
    ],
    build: {
        outDir: "dist", // Ensure this matches the Dockerfile COPY command
    },
});
