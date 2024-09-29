// src/pages/ErrorPage.js
import { useRouteError } from "react-router-dom";
import PageWrapper from "../components/ui/PageWrapper";
import Fallback from "../components/ui/Fallback";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <PageWrapper>
            <Fallback>
                <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
                <p>Sorry, an error occurred while loading the page.</p>
                {error && (
                    <p className="text-sm text-gray-600">
                        <i>{error.statusText || error.message}</i>
                    </p>
                )}
            </Fallback>
        </PageWrapper>
    );
}
