import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {CookiesProvider} from "react-cookie";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <CookiesProvider>
            <GoogleOAuthProvider
                clientId="711179595342-nkfve6rbulc846pmhdqteint0fch7jt5.apps.googleusercontent.com">
                <RouterProvider router={router}/>
            </GoogleOAuthProvider>
        </CookiesProvider>
    </React.StrictMode>
);
