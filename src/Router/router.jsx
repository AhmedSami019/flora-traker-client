import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Shop from "../Pages/Shop/Shop";
import AdminLayout from "../Layouts/AdminLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import MyPlants from "../Pages/MyPlants/MyPlants";
import PlantDetails from "../Pages/PlantDetails/PlantDetails";
import Error from "../Pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/shop",
        Component: Shop,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: AdminLayout,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "myPlants",
        element: (
          <PrivateRoute>
            <MyPlants></MyPlants>
          </PrivateRoute>
        ),
      },
      {
        path: "myPlant/:id",
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/plants/${params.id}`);
        },
        element: (
          <PrivateRoute>
            <PlantDetails></PlantDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
