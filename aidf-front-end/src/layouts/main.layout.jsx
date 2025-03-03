import { Outlet } from "react-router";
import Navigation from "@/components/Navigation";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default MainLayout;
