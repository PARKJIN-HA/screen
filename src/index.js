import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18에서는 이렇게 import 합니다.
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app.js';
import TodoList from '@pages/todo.js';
import MyCalendar from "./pages/calendar";
import Main from "@pages/main";
import Gantt from "@pages/gantt";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          index: true,
          element: <Main/>,
        },
      ],
    },
    {
        path: "/calendar",
        element: <App/>,
        children: [
            {
                index: true,
                element: <MyCalendar/>,
            }
        ]
    },
    {
        path: "/todo",
        element: <App/>,
        children: [
            {
                index: true,
                element: <TodoList/>,
            }
        ]
    },
    {
        path: "/gantt",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Gantt/>,
            }
        ]
    }
  ]);

// 루트 DOM 요소를 선택합니다.
const container = document.getElementById('root');
// createRoot로 앱의 루트를 생성합니다.
const root = createRoot(container);

// RouterProvider와 앱을 루트에 렌더링합니다.
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
