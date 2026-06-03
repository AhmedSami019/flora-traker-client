import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Shop from "../Pages/Shop/Shop";
import AdminLayout from "../Layouts/AdminLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
{
    path: '/', 
    Component: HomeLayout, 
    children: [
        {
            index: true, 
            Component: Home
        }, 
        {
            path: '/about', 
            Component: About
        },
        {
            path: "/shop",
            Component: Shop
        }
    ]
},
{
    path: "/dashboard",
    Component: AdminLayout,
    children: [
        {
            path: "register",
            Component: Register 
        },
        {
            path: "login",
            Component: Login
        }
    ]
}
])

export default router