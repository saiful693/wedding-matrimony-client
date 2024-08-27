import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import WebFooter from "../pages/Shared/WebFooter/WebFooter";
const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-screen-xl mx-auto">
                <Outlet></Outlet>
            </div>
            <WebFooter></WebFooter>
        </div>
    );
};

export default Main;