import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";
import SignUp from "../pages/Shared/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import EditBiodata from "../pages/Dashboard/EditBiodata/EditBiodata";
import ViewData from "../pages/Dashboard/ViewData/ViewData";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user route
            {
                path: 'editUser',
                element: <EditBiodata></EditBiodata>
            },
            {
                path: 'viewBiodata',
                element: <ViewData></ViewData>
            }
            // admin user route
        ]
    }
]);

