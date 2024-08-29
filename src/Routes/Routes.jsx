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
import FavouriteBios from "../pages/Dashboard/user/FavouriteBios/FavouriteBios";
import AdminHome from "../pages/Dashboard/admin/AdminHome/AdminHome";
import ManageUser from "../pages/Dashboard/admin/ManageUser/ManageUser";
import ApprovePremium from "../pages/Dashboard/admin/ApprovePremium/ApprovePremium";
import ApproveContactReq from "../pages/Dashboard/admin/ApproveContactReq/ApproveContactReq";

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
            },
            {
                path: 'favouriteBiodata',
                element: <FavouriteBios></FavouriteBios>
            },



            // admin user route
            {
                path: 'adminDashboard',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'manage',
                element: <ManageUser></ManageUser>
            },
            {
                path: 'approvedPremium',
                element: <ApprovePremium></ApprovePremium>
            },
            {
                path: 'approvedContactRequest',
                element: <ApproveContactReq></ApproveContactReq>
            }
        ]
    }
]);

