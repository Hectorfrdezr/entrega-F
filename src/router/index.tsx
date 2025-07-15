import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, CellPhones, HomePage, CellPhonePage, Loginpage, Registro} from "../pages";

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
            path: 'productos/:slug',
            element: <CellPhonePage/>
        },
        {
            path:'about',
            element: <AboutPage/>
        },
        {
            path:'login',
            element: <Loginpage/>
        },
        {
            path:'registro',
            element: <Registro/>
        },
    ]
}]);