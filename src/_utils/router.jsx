import { createBrowserRouter } from "react-router-dom";
import Default from "../_components/Default";
import PrivateChat from "../_components/_chats/PrivateChat";
import CustomChat from "../_components/_chats/CustomChat";
import ErrorFallback from "../_components/ErrorFallback";
import GeneralChat from "../_components/_chats/GeneralChat";

const routes = [
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '',
                element: <GeneralChat />
            },
            {
                path: '/test',
                element: <div>Test Component</div>
            },
            {
                path: '/private',
                element: <PrivateChat />
            },
            {
                path: '/custom',
                element: <CustomChat />
            },
            {
                path: '*',
                element: <ErrorFallback />
            }
        ]
    }
];

const router = createBrowserRouter(routes);

export default router;