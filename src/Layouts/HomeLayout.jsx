import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const HomeLayout = () => {
    return (
        <div className="bg-base-300">
            <nav className="bg-base-100 shadow-sm mb-5">
                <Navbar></Navbar>
            </nav>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>

            </footer>
        </div>
    );
};

export default HomeLayout;