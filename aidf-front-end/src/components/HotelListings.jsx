import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useGetHotelsQuery } from "@/lib/api";

const HotelListings = () => {
  // Fetch hotels data using Redux Toolkit Query
  const { data: hotelsResponse, isLoading, isError, error } = useGetHotelsQuery();

  const { user, loading } = useSelector((state) => state.userinfor);
  const dispatch = useDispatch();

  const locations = ["All", "France", "Italy", "Australia", "Japan"];
  const [selectedLocation, setSelectedLocation] = useState("All");

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  // Extract the `data` property from the API response
  const hotels = hotelsResponse?.data || [];

  // Filter hotels based on the selected location
  const filteredHotels =
    selectedLocation === "All"
      ? hotels // Use the extracted array
      : hotels.filter((hotel) =>
          hotel.location
            .toLocaleLowerCase()
            .includes(selectedLocation.toLocaleLowerCase())
        );

  if (isLoading) {
    return <p className="">Loading</p>;
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-4">
        <p className="text-red-500">
          Error: {error?.data?.message || "An error occurred"}
        </p>
      </div>
    );
  }

  return (
    <section className="mx-8 my-16">
      <div className="mb-12">
        {/* {loading && <p>Hello, {user.name}</p>}

        <Button
          onClick={() => {
            dispatch(setUser({ name: "A J A Saajith" }));
          }}
        >
          Click me
        </Button> */}
        <h2 className="mb-4 text-4xl font-bold ">
          Top trending hotels worldwide
        </h2>

        <p className="text-lg font-medium text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="flex mb-4 item-center gap-x-4">
        {locations.map((location) => {
          return (
            <LocationTab
              key={location}
              name={location}
              selectedLocation={selectedLocation}
              onClick={handleSelectLocation}
            />
          );
        })}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {filteredHotels.map((hotel) => {
            return <HotelCard key={hotel._id} hotel={hotel} />;
          })}
        </div>
      )}
    </section>
  );
};

export default HotelListings;