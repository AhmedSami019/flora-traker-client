import { Outlet } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-base-300 min-h-screen">
      <nav className="bg-base-100 mb-1 sticky top-0 z-50">
        <Navbar></Navbar>
      </nav>
      <main className="flex items-start gap-5 md:pr-10">
        <div className="fixed top-18 left-0 w-64 h-[calc(100vh-4rem)] z-40 bg-base-100 border-r border-base-200">
          <Sidebar></Sidebar>
        </div>
        <div className="mt-5 w-full pl-85 ">
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
