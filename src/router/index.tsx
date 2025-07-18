import { createBrowserRouter, Navigate } from "react-router-dom";
import { AboutPage, CellPhones, HomePage, CellPhonePage, Loginpage, Registro, OrdersUserPage} from "../pages";
import { ClientLayout, RootLayout } from "../layouts";

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
        {
            path: 'account',
            element: <ClientLayout/>,
            children: [
                {
                    path: '',
                    element: <Navigate to='/account/pedidos' />,
                },
                {
                path: 'pedidos',
                element: <OrdersUserPage/>
            }
        ] 
        },
    ]
}]);