import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const HomeLayout = () => {
    return (
        <div>
            <nav className="bg-base-100 shadow-sm mb-10">
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