import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner"; // Import toast for notifications
import { format } from "date-fns"; // Import date-fns for date formatting
import { useCreateBookingMutation } from "@/lib/api";

// Define the form schema
const formSchema = z.object({
    checkIn: z.date().min(new Date(), { message: "Check-in date must be in the future" }),
    checkOut: z.date().min(new Date(), { message: "Check-out date must be in the future" }),
    roomNumber: z.number().min(1, { message: "Room number must be at least 1" }),
});

function CreateBookingHotelForm() {

    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const location = useLocation();
    const { hotelId } = location.state || {};

    // Initialize the form with default values
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            checkIn: new Date(), // Default to today's date
            checkOut: new Date(new Date().setDate(new Date().getDate() + 1)), // Default to tomorrow's date
            roomNumber: 101, // Automatically set the room number
        },
    });

    // Handle form submission
    const handleSubmit = async (data) => {
        const { checkIn, checkOut, roomNumber } = data;

        try {
            toast.loading("Booking in progress...");

            await createBooking({
                hotelId: hotelId,
                checkIn: checkIn,
                checkOut: checkOut,
                roomNumber: roomNumber
            }).unwrap()
            toast.success("Booking creation successfully");
        } catch (error) {
            toast.error("Booking creation failed");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-1/2 space-y-6">
                {/* Check-In Date Field */}
                <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Check-In Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    placeholderText="Select check-in date"
                                    className="w-full p-2 border rounded"
                                    minDate={new Date()} // Disable past dates
                                />
                            </FormControl>
                            <FormDescription>
                                Select your check-in date.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Check-Out Date Field */}
                <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Check-Out Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    placeholderText="Select check-out date"
                                    className="w-full p-2 border rounded"
                                    minDate={new Date()} // Disable past dates
                                />
                            </FormControl>
                            <FormDescription>
                                Select your check-out date.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Room Number Field (Automatically Selected) */}
                <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Number</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    disabled // Disable editing since it's automatically selected
                                />
                            </FormControl>
                            <FormDescription>
                                Room number is automatically assigned.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default CreateBookingHotelForm;