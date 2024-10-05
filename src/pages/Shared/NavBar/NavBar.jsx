import { Avatar, Dropdown, Navbar } from "flowbite-react";
"use client";
import logo from '../../../assets/images/main-logo.png'
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import './NavBar.css'
import { IoMdNotificationsOutline } from "react-icons/io";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Badge } from "@mui/material";



const NavBar = () => {

    const { user, logOut } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: notificationData = [], refetch } = useQuery({
        queryKey: ['notificationData', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contact/${user?.email}`);
            console.log(res.data)
            return res.data;
        },
        enabled: false,
    })

    useEffect(() => {
        if (user?.email) {
            refetch();
        }
    }, [user?.email, refetch]);





    // approved
    const approved = notificationData.filter((notification) => notification.status === 'Approved')


    // unread notification
    const unread = approved.filter((notification) => notification.markAsRead === false)



    const handleLogOut = () => {
        logOut()
            .then()
            .catch(console.error())
    }

    const markAsUnread = (id) => {
        console.log(id)
        axiosPublic.patch(`/contacts/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {

                    // const userInfo = {
                    //     name: contactReq.name,
                    //     email: data.email
                    // }
                    // axiosPublic.post('/users', userInfo)

                    refetch();
                }
            })
        // todo
    }

    return (

        <div className="max-w-screen-xl  mx-auto border-indigo-800">
            <Navbar fluid rounded >
                <Navbar.Brand href="/">
                    <img src={logo} className="h-16" alt="wedding matrimony logo" />
                    <span className="self-center whitespace-nowrap text-xl font-bold text-indigo-800">Niqah</span>
                </Navbar.Brand>


                <div className="flex gap-3 items-center font-semibold md:order-2">
                    <div className="flex gap-3 items-center font-semibold md:order-2">
                        {user ? <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={user?.photoURL} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user?.displayName}</span>
                            </Dropdown.Header>
                            <Dropdown.Item><Link to="/dashboard">Dashboard</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
                        </Dropdown>
                            :
                            <ul>
                                <NavLink to="/login" className="text-lg text-indigo-800">Login</NavLink>
                            </ul>
                        }
                        <Navbar.Toggle />
                    </div>

                    {/* notifications */}
                    <div className="flex gap-3 items-center font-semibold md:order-2">
                        {user && <Dropdown
                            arrowIcon={false}
                            inline
                            label={

                                <Badge badgeContent={unread?.length} className="text-red-600" color="primary">
                                    <IoMdNotificationsOutline className="text-4xl" />
                                </Badge>
                            }
                        >


                            <Dropdown.Header>
                                <div className="overflow-y-auto h-40">
                                    {
                                        approved.length ?
                                            approved.map((notification) => <Link
                                                onClick={() => markAsUnread(notification._id)}
                                                to={`/bioDataDetails/${notification.bioDataId}`}
                                                key={notification._id}
                                                className={`py-4 px-6 block rounded-lg shadow-lg transition-all duration-300 text-sm font-semibold ${notification.markAsRead ? 'bg-slate-100 text-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'} hover:shadow-xl hover:-translate-y-1`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    {/* Add an Icon (Optional) */}
                                                    <span className="mr-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.686-1.14 1.157-2.03L13.91 4.243a1.5 1.5 0 00-2.828 0L4.926 17.97c-.53.89.103 2.03 1.157 2.03z" />
                                                        </svg>
                                                    </span>

                                                    {/* Notification Text */}
                                                    <span>{`${notification?.bioDataName} Contact Request is Approved`}</span>

                                                    {/* Add a small status dot (optional) */}
                                                    {!notification.markAsRead && (
                                                        <span className="inline-block h-3 w-3 bg-red-500 rounded-full"></span>
                                                    )}
                                                </div>
                                            </Link>)
                                            :
                                            <p className="pt-10 text-red-500">No Notification Found</p>
                                    }
                                </div>
                            </Dropdown.Header>
                        </Dropdown>
                        }

                    </div>




                </div>



                <Navbar.Collapse className="font-medium">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/biodatas">Biodatas</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/contact">Contact Us</NavLink>

                </Navbar.Collapse>
            </Navbar>
        </div>

    );
};

export default NavBar;