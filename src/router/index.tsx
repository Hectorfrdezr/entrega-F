import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, CellPhones, HomePage } from "../pages";

export const router = createBrowserRouter([{
    path: '/',
    element:<RootLayout/>,
    children: [
        {
            index: true,
            element: <HomePage/>
        },
        {
            path:'producto',
            element: <CellPhones/>
        },
        {
            path:'about',
            element: <AboutPage/>
        },
    ]
}]);