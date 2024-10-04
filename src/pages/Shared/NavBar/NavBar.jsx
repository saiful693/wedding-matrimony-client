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
import Swal from "sweetalert2";


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
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Premium Member Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
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
                <div className="flex font-semibold md:order-2">
                    {<Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <IoMdNotificationsOutline className="text-4xl" />
                        }
                    >


                        <Dropdown.Header>
                            <div className="overflow-y-auto h-32">
                                {
                                    notificationData.map((notification) => <Link onClick={() => markAsUnread(notification._id)} to={`/bioDataDetails/${notification.bioDataId}`} key={notification._id} className={`block border-t text-black text-sm p-5 ${notification.markAsRead ? '' : 'bg-gray-100'}`}>{`${notification?.bioDataId} is approved by Admin`}</Link>)
                                }
                            </div>
                        </Dropdown.Header>
                    </Dropdown>
                    }
                    <Navbar.Toggle />
                </div>



                <div className="flex font-semibold md:order-2">
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