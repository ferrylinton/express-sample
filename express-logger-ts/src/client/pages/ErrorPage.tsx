import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <div className="container">
                <h1>Error</h1>
                <h2>{error.status || 500}</h2>
                <code>{ error?.error?.message || error?.message || 'Unexpected error has occurred'}</code>
            </div>
        </div>
    );
}