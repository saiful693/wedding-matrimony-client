import { Sidebar } from "flowbite-react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { TbFileLike, TbLogout2 } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/main-logo.png'
import useAuth from "../hooks/useAuth";
import { GiBigDiamondRing } from "react-icons/gi";
import useUser from "../hooks/useUser";
import { MdOutlineContactEmergency, MdOutlineManageAccounts, MdOutlineWorkspacePremium } from "react-icons/md";



const Dashboard = () => {
    const { logOut } = useAuth();
    const [userDb] = useUser();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(console.error())
    }
    return (
        <div className="flex flex-col gap-5 lg:gap-2 lg:flex-row max-w-screen-xl mx-auto">
            {/* side bar */}
            <div className="lg:w-64 p-4 lg:p-0 flex justify-center md:min-h-screen">
                <div className="">
                    <div className="flex">
                        <img src={logo} className="h-16 bg-transparent" alt="wedding matrimony logo" />
                        <span className="self-center whitespace-nowrap text-xl font-bold text-indigo-800">Niqah</span>
                    </div>
                    <div className="w-full lg:w-64 lg:flex-shrink-0">
                        <Sidebar aria-label="Sidebar with content separator example">
                            <Sidebar.Items>
                                {/* userDb.role === 'admin' */}
                                {userDb.role === 'admin' ?
                                    <Sidebar.ItemGroup>
                                        <NavLink to="/dashboard/adminDashboard">
                                            <Sidebar.Item icon={FaHome}>
                                                Admin Dashboard
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to="/dashboard/manage">
                                            <Sidebar.Item icon={MdOutlineManageAccounts}>
                                                Manage User
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to="/dashboard/approvedPremium">
                                            <Sidebar.Item icon={MdOutlineWorkspacePremium}>
                                                Approved Premium
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to="/dashboard/approvedContactRequest">
                                            <Sidebar.Item icon={MdOutlineContactEmergency}>
                                                Approved Request
                                            </Sidebar.Item>
                                        </NavLink>
                                        <button onClick={handleLogOut}>
                                            <Sidebar.Item icon={TbLogout2}>
                                                Logout
                                            </Sidebar.Item>
                                        </button>

                                    </Sidebar.ItemGroup>
                                    :
                                    <Sidebar.ItemGroup className="space-y-3">
                                        <NavLink to="/dashboard/editUser">
                                            <Sidebar.Item icon={FaUserEdit}>
                                                Edit Biodata
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to="/dashboard/viewBiodata">
                                            <Sidebar.Item icon={AiOutlineFileSearch}>
                                                View Biodata
                                            </Sidebar.Item>
                                        </NavLink>

                                        <NavLink to="/dashboard/contactRequest">
                                            <Sidebar.Item icon={RiContactsFill}>
                                                My Contact Request
                                            </Sidebar.Item>
                                        </NavLink>

                                        <NavLink to="/dashboard/favouriteBiodata">
                                            <Sidebar.Item icon={TbFileLike}>
                                                Favourites Biodata
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to="/dashboard/gotMarried">
                                            <Sidebar.Item icon={GiBigDiamondRing}>
                                                Got Married
                                            </Sidebar.Item>
                                        </NavLink>

                                        <button onClick={handleLogOut}>
                                            <Sidebar.Item icon={TbLogout2}>
                                                Logout
                                            </Sidebar.Item>
                                        </button>
                                    </Sidebar.ItemGroup>
                                }


                                <Sidebar.ItemGroup>
                                    <NavLink to="/">
                                        <Sidebar.Item icon={FaHome}>
                                            Home
                                        </Sidebar.Item>
                                    </NavLink>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                    </div>
                </div>
            </div>
            {/* dashboard content */}
            <div className="lg:flex-1 p-10">

                <Outlet></Outlet>
            </div>
        </div >

    );
};

export default Dashboard;


















