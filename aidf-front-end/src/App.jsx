import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HotelListings from "./components/HotelListings";
import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "./pages/sign-in.page";

const App = () => {
  return (
    <>
      <Navigation />
      <div className="relative h-screen">
        <Hero />
        <img
          src="assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 object-cover w-full h-full -z-10"
        />
      </div>
      <HotelListings />


    </>
  );
};

export default App;
