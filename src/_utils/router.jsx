import { createBrowserRouter } from "react-router-dom";
import Default from "../_components/Default";

const routes = [];

const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: 'child',
                element: <div>Child Component</div>
            }
        ]
    }
]);

export default router;