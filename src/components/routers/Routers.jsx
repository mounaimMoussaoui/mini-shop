import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import {Cart} from "../../pages/Cart.jsx";
import {Home} from "../../pages/Home.jsx";
import {Profile} from "../../pages/Profile.jsx";
import {NotFound} from "../../pages/NotFound.jsx";
import {Login} from "../../pages/Login.jsx";
import {Signup} from "../../pages/Signup.jsx";
import {MainLayout} from "../../layouts/MainLayout.jsx";
import {ProtectRouter} from "../../utilities/ProtectRouter.jsx";
import {CheckoutForm} from "../../pages/CheckoutForm.jsx";
import {SuccessPageCheckout} from "../../pages/SuccessPageCheckout.jsx";
// import {FormFormik} from "../../pages/FormFormik.jsx";


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
                {
                    path: "/checkoutForm",
                    element: <ProtectRouter> <CheckoutForm /> </ProtectRouter>
                },
                {
                    path: "/successfullyCheckoutPage",
                    element: <ProtectRouter> <SuccessPageCheckout /> </ProtectRouter>
                },
                // {
                //     path: "/formFormik",
                //     element: <FormFormik />
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




