import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
//import App from './App';
import Down from './Down';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider
        clientId="389870691386-o5t70t7qgfn3du6pdutokjq1ftv9g8o8.apps.googleusercontent.com"
    >
    <CookiesProvider>
        <Down />
    </CookiesProvider>
    </GoogleOAuthProvider>
);

