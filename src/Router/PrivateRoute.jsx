import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import Loading from "../Pages/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
    const location = useLocation()

    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <Loading></Loading>
    }
    if(user && user.email){
        return children
    }
    return <Navigate to={'/dashboard/login'} state={location.pathname}></Navigate>
};

export default PrivateRoute;