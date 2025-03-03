import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { Link } from "react-router";

const HotelCard = (props) => {
  const [num, setNum] = useState(1);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <Link to={`/hotels/${props.hotel._id}`} key={props.hotel._id} className="relative block group">
      <div className="aspect-[4/3] overflow-hidden rounded-xl">
        <img
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={props.hotel.image}
          alt={props.hotel.name}
        />
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="text-lg font-semibold">{props.hotel.name}</h3>
        <div className="flex items-center text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-1 lucide lucide-map-pin"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p>{props.hotel.location}</p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 lucide lucide-star fill-primary text-primary"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
          </svg>
          <span className="ml-1 font-medium">{props.hotel?.rating ?? "No rating"}</span>
          <span className="ml-1 text-muted-foreground">
            {`(${props.hotel?.reviews?.toLocaleString() ?? "No"} Reviews)`}
          </span>
        </div>
        <div className="text-xl font-bold">${props.hotel.price}</div>
      </div>
    </Link>
  );
};

export default HotelCard;
