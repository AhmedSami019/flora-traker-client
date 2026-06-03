import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";

const AdminLayout = () => {
    return (
        <div>
            <Outlet></Outlet>

             <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
        </div>
    );
};

export default AdminLayout;