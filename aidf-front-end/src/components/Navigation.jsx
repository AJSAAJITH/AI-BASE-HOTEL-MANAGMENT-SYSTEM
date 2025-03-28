import { Button } from "@/components/ui/button.jsx";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
const Navigation = () => {

  // const user = useSelector((state)=> state.user);
  // console.log(user);

  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between p-4 px-8 py-4 text-white bg-black">
      <div className="flex items-center justify-between h-9">
        <Link to="/" className="text-2xl font-bold">
          Horizone
        </Link>
        <div className="ml-8 font-medium">
          <Link to="/" className="transition-colors">Home</Link>
        </div>
        {user?.publicMetadata?.role === "admin" && (
          <div className="flex">

            <div className="ml-8 font-medium">
              <Link to={"/admin/hotels/create"} className="transition-colors">
                Create Hotel
              </Link>
            </div>
          </div>
        )}


      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-sm font-semibold">
          <Globe className="w-5 h-5 mr-2" /> EN
        </Button>
        <SignedOut>
          <Button variant="ghost" className="text-sm font-semibold" asChild>
            <Link to="/sign-in">Log In</Link>
          </Button>
          <Button className="text-sm font-semibold" asChild>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <Button className="text-sm font-semibold" asChild>
            <Link to="/account">My Account</Link>
          </Button>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
