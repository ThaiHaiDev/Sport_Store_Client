import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.scss';
import './assets/css/theme.scss';
import './assets/css/index.scss';

import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './contexts/usersContext';
import { SearchProvider } from './contexts/searchContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <SearchProvider>
            <UserProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </UserProvider>
        </SearchProvider>
    </React.StrictMode>,
);

reportWebVitals();
