import { Outlet } from "react-router";
import auth from "../firebase/firebase.init";

const AdminLayout = () => {
    console.log(auth);
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayout;