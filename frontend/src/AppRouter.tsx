import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BaseView from './views/BaseView';
import ErrorView from './views/ErrorView';
import AgentPage from './views/pages/AgentPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseView />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/',
                element: <AgentPage />
            }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router} />;
}
