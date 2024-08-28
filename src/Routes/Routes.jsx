import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Shared/Login/Login";
import SignUp from "../pages/Shared/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import EditBiodata from "../pages/Dashboard/EditBiodata/EditBiodata";
import ViewData from "../pages/Dashboard/ViewData/ViewData";
import GotMarried from "../pages/Dashboard/user/GotMarried/GotMarried";
import BioDatas from "../pages/BioDatas/BioDatas";
import BioDataDetails from "../pages/BioDataDetails/BioDataDetails";
import Checkout from "../pages/Checkout/Checkout";
import ContactRequest from "../pages/Dashboard/user/ContactRequest/ContactRequest";

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
                path: '/biodatas',
                element: <BioDatas></BioDatas>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/bioDataDetails/:id',
                element: <BioDataDetails></BioDataDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/biodatas/${params.id}`)
            },
            {
                path: '/checkout/:biodataId',
                element: <Checkout></Checkout>
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
            },
            {
                path: 'gotMarried',
                element: <GotMarried></GotMarried>
            },
            {
                path: 'contactRequest',
                element: <ContactRequest></ContactRequest>
            }
            // admin user route
        ]
    }
]);

