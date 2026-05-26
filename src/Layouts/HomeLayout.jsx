import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

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
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;