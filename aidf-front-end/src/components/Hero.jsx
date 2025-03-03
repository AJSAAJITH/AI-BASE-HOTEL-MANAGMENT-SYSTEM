import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div>
      <div className="py-32 px-8">
        <h1 className="text-white text-6xl font-bold mb-8 text-center">
          Find Your Best Staycation
        </h1>
        <p className="text-white text-xl font-medium mb-12 max-w-2xl mx-auto text-center">
          Describe your dream destination and experience, and we'll find the
          perfect place for you.
        </p>
        <div className="flex justify-center">
          <form
            action=""
            className="flex p-2 rounded-full max-w-3xl items-center w-full bg-black/10 backdrop-blur-md shadow-lg"
          >
            <Input
              placeholder="Describe your destination, experience, or hotel..."
              className="bg-transparent border-none outline-none text-white placeholder:text-white/50 placeholder:text-lg placeholder:font-medium text-lg font-bold w-full"
            />
            <Button
              variant="default"
              className="flex items-center justify-center px-4 text-white text-lg font-semibold w-48 h-12 rounded-full"
            >
              <Sparkles
                style={{ width: "20px", height: "20px" }}
                className="mr-2 animate-pulse text-sky-400"
              ></Sparkles>
              <div>AI Search</div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
