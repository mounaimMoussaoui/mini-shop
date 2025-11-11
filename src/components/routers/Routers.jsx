import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import {Cart} from "../../pages/Cart.jsx";
import {Home} from "../../pages/Home.jsx";
import {Profile} from "../../pages/Profile.jsx";
import {NotFound} from "../../pages/NotFound.jsx";
import {Login} from "../../pages/Login.jsx";
import {Signup} from "../../pages/Signup.jsx";
import {MainLayout} from "../../layouts/MainLayout.jsx";
import {ProtectRouter} from "../../hooks/ProtectRouter.jsx";
// import {Form} from "../../pages/FormFormik.jsx";


export const AppRouterProvider = React.memo(() => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                  path: '/login',
                  element: <Login/>
                },
                {
                  path: '/signup',
                  element: <Signup />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                // {
                //     path: "/formFormik",
                //     element: <Form />
                // },
                {
                    path: "/profile",
                    element: <ProtectRouter> <Profile /> </ProtectRouter>
                }
            ]
        },
        {
            path: "/*",
            element: <NotFound />
        }
    ]);

    return <RouterProvider router={router} />;
});




