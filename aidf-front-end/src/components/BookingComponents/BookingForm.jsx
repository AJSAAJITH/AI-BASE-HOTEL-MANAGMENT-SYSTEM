"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLocation, useParams } from "react-router"
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api"
import { toast } from "sonner"


const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

const formSchema = z.object({
    customer_name: z.string().min(2, "Name must be at least 2 characters."),

    phone: z
        .string()
        .min(1, "Phone number is required.")
        .regex(/^\+?\d{10,15}$/, "Invalid phone number. Include country code."),

    room_count: z
        .number({ invalid_type_error: "Room count must be a number." })
        .min(1, "Must book at least 1 room."),

    checkin: z
        .string()
        .refine((date) => date >= today, "Check-in date cannot be in the past."),

    checkout: z
        .string()
        .refine((date) => date > today, "Check-out must be after check-in.")
});

export function BookingForm() {


    const [createBooking, isLoading] = useCreateBookingMutation();
    const { id } = useParams();

    const { data: hotel } = useGetHotelByIdQuery(id);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customer_name: "",
            phone: "",
            room_count: 1,
            checkin: today,
            checkout: tomorrow,
        },
    });

    const checkinDate = form.watch("checkin", today);
    const checkoutDate = form.watch("checkout", tomorrow);
    const getTotalNights =
        (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24);

    const onSubmit = async (data) => {
        const { customer_name, phone, room_count, checkin, checkout } = data;
        try {
            const toastId = toast.loading("Booking in Progress...");
            await createBooking({
                hotelId: id,
                checkIn: checkin,
                checkOut: checkout,
                customer_name: customer_name,
                phone: phone,
                rooms_count: room_count
            }).unwrap()
            toast.dismiss(toastId);
            toast.success("Booking created successfully!");
            cleardata();
        } catch (error) {
            toast.error("Booking creation failed. Please try again.");
        }
        // console.log(data)
    }

    const cleardata = () => {
        form.reset({
            customer_name: "",
            phone: "",
            room_count: 1,
            checkin: today,
            checkout: tomorrow,
        });
    }

    const roomCount = form.watch("room_count", 1);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <FormField
                        control={form.control}
                        name="customer_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        country={"lk"} // Default country (Sri Lanka: +94)
                                        value={field.value}
                                        onChange={(value) => field.onChange(value)}
                                        inputClass="!w-full !h-10 !text-black"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="room_count"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rooms</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Room Count"
                                        min={1}
                                        value={field.value} // Ensure it's controlled
                                        onChange={(e) => {
                                            const value = Number(e.target.value); // Convert to number
                                            field.onChange(isNaN(value) ? 1 : value); // Prevent NaN issues
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-row w-3/4 gap-6 ">
                        <FormField
                            control={form.control}
                            name="checkin"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Check-In</FormLabel>
                                    <FormControl>
                                        <Input type="date" min={new Date().toISOString().split("T")[0]} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="checkout"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Check-Out</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Tomorrow's date
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* summery */}

                    <div className="flex flex-row w-full gap-6 p-4 mt-4 text-xs border-2 rounded-md border-zinc-400 bg-neutral-100">
                        <div className="flex flex-col w-full">
                            <p className="">Stay Summary*</p>
                            <div className="flex flex-row justify-between w-full">
                                <p>Rooms:</p>
                                <p>{roomCount}</p>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <p>Nights:</p>
                                <p>{getTotalNights} {getTotalNights > 1 ? "Nights" : "Night"}</p>
                            </div>

                            <div className="flex flex-row justify-between w-full">
                                <p>Total:</p>
                                <p>${roomCount * getTotalNights * (hotel?.price ?? 0)}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </Form>
    )
}
