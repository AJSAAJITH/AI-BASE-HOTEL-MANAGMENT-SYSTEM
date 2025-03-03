import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

const HomePage = () => {
  return (
    <main>
      <div className="relative h-screen">
        <Hero />
        <img
          src="assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 object-cover w-full h-full -z-10"
        />
      </div>
      <HotelListings />
    </main>
  );
};

export default HomePage;
