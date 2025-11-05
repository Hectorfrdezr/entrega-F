import { createBrowserRouter, Navigate } from "react-router-dom";
import { AboutPage, CellPhones, HomePage, CellPhonePage, Loginpage, Registro, OrdersUserPage,CheckoutPage, ThankyouPage,DashboardProductsPage,DashboardNewProductPage, DashboardProductSlug} from "../pages";
import { ClientLayout, RootLayout,DashboardLayout} from "../layouts";
import OrderUserPage from "../pages/OrderUserPage";

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
                },
                {
                    path: 'pedidos/:id',
                    element:<OrderUserPage/>
                }
            ] 
        },
        
    ],
    },
    {
            path: 'checkout',
            element: <CheckoutPage/>
    },
    {
        path: '/checkout/:id/thank-you',
        element: <ThankyouPage/>
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children:[
            {
                index: true,
                element:<Navigate to='/dashboard/productos'/>,
            },
            {
                path: 'productos',
                element: <DashboardProductsPage/>,
            },
            {
                path: 'productos/new',
                element: <DashboardNewProductPage/>,
            },
            {
                path: 'productos/editar/:slug',
                element: <DashboardProductSlug/>
            }
        ],
    }
]);