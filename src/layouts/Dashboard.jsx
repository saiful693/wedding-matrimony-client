import { Sidebar } from "flowbite-react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { HiViewBoards } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";
import { TbFileLike, TbLogout2 } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/main-logo.png'
import useAuth from "../hooks/useAuth";
import { GiBigDiamondRing } from "react-icons/gi";
import useUser from "../hooks/useUser";



const Dashboard = () => {
    const isAdmin = false;
    const { logOut } = useAuth();
    const [userDb] = useUser();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(console.error())
    }
    return (
        <div className="flex max-w-screen-xl mx-auto">
            {/* side bar */}
            <div className="w-64 min-h-screen">
                <div className="flex ">
                    <img src={logo} className="h-16 bg-transparent" alt="wedding matrimony logo" />
                    <span className="self-center whitespace-nowrap text-xl font-bold text-indigo-800">Niqah</span>
                </div>
                <Sidebar aria-label="Sidebar with content separator example">
                    <Sidebar.Items>
                        {isAdmin ?
                            <Sidebar.ItemGroup>
                                <Sidebar.Item href="#" icon={FaHome}>
                                    <NavLink to="/dashboard/editUser">Edit Biodata</NavLink>
                                </Sidebar.Item>
                                <Sidebar.Item href="#" icon={HiViewBoards}>
                                    Kanban
                                </Sidebar.Item>
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
            {/* dashboard content */}
            <div className="flex-1 p-10">

                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Dashboard;


















