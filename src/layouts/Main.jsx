import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-screen-xl mx-auto">
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default Main;