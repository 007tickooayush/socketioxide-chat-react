import { createBrowserRouter } from "react-router-dom";
import Default from "../_components/Default";
import PrivateChat from "../_components/PrivateChat";
import CustomChat from "../_components/CustomChat";
import ErrorFallback from "../_components/ErrorFallback";
import GeneralChat from "../_components/GeneralChat";

const routes = [];

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '',
                element: <GeneralChat />
            },
            {
                path: '/child',
                element: <div>Child Component</div>
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
]);

export default router;