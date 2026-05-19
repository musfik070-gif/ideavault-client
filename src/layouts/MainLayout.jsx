import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
