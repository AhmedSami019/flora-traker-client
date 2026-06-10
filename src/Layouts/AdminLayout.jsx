import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-base-300">
      <nav className="bg-base-100 mb-1 sticky top-0 z-50">
        <Navbar></Navbar>
      </nav>
      <main className="flex gap-5 md:pr-10">
        <Sidebar></Sidebar>
        <div className="mt-5 w-full">
          <Outlet></Outlet>
        </div>
      </main>
      {/* for toast message */}
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
