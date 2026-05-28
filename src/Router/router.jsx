import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Shop from "../Pages/Shop/Shop";

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
}
])

export default router