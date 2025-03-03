import { useCreateHotelMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CreateHotelForm from "@/components/CreateHotelForm";

export default function CreateHotelPage() {
  return (
    <main className="container min-h-screen px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold">Create a Hotel</h1>
      <CreateHotelForm />
    </main>
  );
}