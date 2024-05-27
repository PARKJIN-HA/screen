import React from 'react';
import {createBrowserRouter, redirect, useFetcher, useRouteLoaderData} from 'react-router-dom';
import {AuthProvider} from "./hooks/useAuth";
import App from './app.js';
import TodoList from '@pages/todo';
import MyCalendar from "./pages/calendar";
import Main from "@pages/main";
import Gantt from "@pages/gantt";
import LogoutPage from "@pages/logout";
import LoginPage from "@pages/login";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        loader() {
            return {user: AuthProvider.isAuthenticated ? AuthProvider.user : null};
        },
        element: <App/>,
        children: [
            {
                index: true,
                path: "/",
                element: <Main />,
                loader: protectedLoader,
            },
            {
                path: "/login",
                element: <LoginPage />,
                action: loginAction,
                loader: loginLoader,
            },
            {
                path: "/logout",
                element: <LogoutPage/>,
            },
            {
                path: "todo",
                element: <TodoList/>,
                loader: protectedLoader,
            },
            {
                path: "calendar",
                element: <MyCalendar/>,
                loader: protectedLoader,
            },
            {
                path: "gantt",
                element: <Gantt/>,
                loader: protectedLoader,
            },
        ],
    }
]);

async function loginAction({}) {
    try {
        console.log("loginAction");
        await AuthProvider.signIn();
    } catch (error) {
        return {
            error: "Invalid login attempt",
        };
    }

    return redirect("/");
}

async function loginLoader() {
    if (AuthProvider.isAuthenticated) {
        return redirect("/");
    }
    return null;
}

function protectedLoader({request}) {
    if (!AuthProvider.isAuthenticated) {
        return redirect("/login");
    }
    return null;
}

export default router;
