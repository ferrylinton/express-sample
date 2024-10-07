import { createBrowserRouter } from "react-router-dom";
import { AddFormPage } from '../pages/AddFormPage';
import { DetailPage } from '../pages/DetailPage';
import ErrorPage from "../pages/ErrorPage";
import { HomePage } from '../pages/HomePage';
import Layout from './Layout';


export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/detail/:id",
                element: <DetailPage />
            },
            {
                path: "/add",
                element: <AddFormPage />
            },
        ],
    },
]);
