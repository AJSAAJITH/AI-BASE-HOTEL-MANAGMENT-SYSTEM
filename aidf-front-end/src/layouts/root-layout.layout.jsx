import { Outlet } from "react-router";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster/>
    </>
  );
};

export default RootLayout;
