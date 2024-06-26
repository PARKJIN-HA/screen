import React from 'react';
import {createBrowserRouter, redirect, useFetcher, useRouteLoaderData} from 'react-router-dom';
import App from './app.js';
import TodoList from '@pages/todo';
import MyCalendar from "./pages/calendar";
import Main from "@pages/main";
import Gantt from "@pages/gantt";
import LoginPage from "@pages/login";
import {Cookies} from "react-cookie";

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Main />,
                loader: protectedLoader,
            },
            {
                path: "login",
                element: <LoginPage />,
                loader: loginLoader,
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

async function loginLoader() {
    console.log('loginLoader')
    const cookies = new Cookies();
    const response = await fetch("http://localhost:9000/api/userinfo", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (response.status === 401) {
        cookies.remove('USERNAME', { path: '/' });
        return null;
    }

    if (!response.ok) {
        cookies.remove('USERNAME', { path: '/' });
        return null;
    }

    const data = await response.json();
    if (data.username) {
        cookies.set('USERNAME', data.username, { path: '/' });
        cookies.set('email', data.email, { path: '/' });
        return redirect("/");
    }
    return null;
}

async function protectedLoader() {
    console.log('protectedLoader')
    const cookies = new Cookies();
    const response = await fetch("http://localhost:9000/api/userinfo", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        cookies.remove('USERNAME', { path: '/' });
        return redirect("/login");
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (!data.username) {
        return redirect("/login");
    }
    return null;
}

export default router;
