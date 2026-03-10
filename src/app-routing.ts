import { createBrowserRouter } from "react-router";
import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: '',
                lazy: () => import("./Pages/Login/LoginPage/LoginPage").then(module => ({ Component: module.LoginPage }))
            },
            {
                path: 'register',
                lazy: () => import("./Pages/Login/RegisterPage/RegisterPage").then(module => ({ Component: module.RegisterPage }))
            },
            {
                path: 'cards',
                lazy: () => import("./Pages/CardPage/CardPage").then(module => ({ Component: module.CardPage }))
            }
        ]
    },
]);
