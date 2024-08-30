import { Avatar, Dropdown, Navbar } from "flowbite-react";
"use client";
import logo from '../../../assets/images/main-logo.png'
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import './NavBar.css'

const NavBar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(console.error())
    }

    return (

        <div className="max-w-screen-xl  mx-auto border-indigo-800">
            <Navbar fluid rounded >
                <Navbar.Brand href="/">
                    <img src={logo} className="h-16" alt="wedding matrimony logo" />
                    <span className="self-center whitespace-nowrap text-xl font-bold text-indigo-800">Niqah</span>
                </Navbar.Brand>
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