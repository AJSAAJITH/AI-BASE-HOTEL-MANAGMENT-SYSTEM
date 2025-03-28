import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { submit } from "@/lib/features/searchSlice";

export default function Hero() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    console.log(searchQuery);

    dispatch(submit(searchQuery));
  };

  return (
    <div className="">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 pt-32 pb-32 text-white">
        <h1 className="mb-8 text-4xl font-bold text-center md:text-6xl">
          Find Your Best Staycation
        </h1>
        <p className="max-w-2xl mb-12 text-xl text-center">
          Describe your dream destination and experience, and we'll find the
          perfect place for you.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-3xl p-2 rounded-full bg-black/10 backdrop-blur-md lg:h-16"
        >
          <Input
            type="text"
            name="search"
            placeholder="Describe your destination, experience, or hotel..."
            className="flex-grow text-white bg-transparent border-none outline-none lg:text-lg placeholder:text-white/50 focus:border-none focus:outline-none focus-visible:ring-0"
          />
          <Button
            type="submit"
            className="flex items-center w-48 rounded-full gap-x-2 lg:h-12"
          >
            <Sparkles
              style={{ width: "20px", height: "20px" }}
              className="mr-2  animate-pulse text-sky-400"
            />
            <span className="lg:text-lg">AI Search</span>
          </Button>
        </form>
      </div>
    </div>
  );
}