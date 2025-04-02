import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";
export default function HotelListings() {
  const searchValue = useSelector((state) => state.search.value);

  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery(
    searchValue,
  );

  const locations = ["ALL", "France", "Italy", "Australia", "Japan"];
  const [selectedLocation, setSelectedLocation] = useState("ALL");

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => {
            return (
              <LocationTab
                key={i}
                selectedLocation={selectedLocation}
                name={location}
                onClick={handleSelectedLocation}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => {
            return (
              <LocationTab
                key={i}
                selectedLocation={selectedLocation}
                name={location}
                onClick={handleSelectedLocation}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-4">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  const filteredHotels =
    selectedLocation === "ALL"
      ? hotels
      : hotels.filter(({ hotel }) => {
        return hotel.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());
      });

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => {
          return (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredHotels.map(({ hotel, confidence }) => {
          return <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />;
        })}
      </div>
    </section>
  );
}