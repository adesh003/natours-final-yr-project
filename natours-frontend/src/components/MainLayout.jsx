import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet wo jagah hai jahan tumhare pages (Home, Tours etc) render honge */}
      <Outlet />
    </>
  );
};

export default MainLayout;