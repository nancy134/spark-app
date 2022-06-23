import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <GoogleOAuthProvider
        clientId="389870691386-o5t70t7qgfn3du6pdutokjq1ftv9g8o8.apps.googleusercontent.com"
    >
        <App />
    </GoogleOAuthProvider>
    , 
    document.getElementById('root')
);

