import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookingForm } from "./BookingForm"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router"


export function BookingDialog() {
    const { isSignedIn } = useUser();
    const navigae = useNavigate();


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-60 bg-zinc-950 hover:bg-zinc-900 hover:text-zinc-50 text-zinc-50">Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Booking</DialogTitle>
                    <DialogDescription>
                        A seamless hotel booking platform for hassle-free reservations.
                    </DialogDescription>
                </DialogHeader>

                {/* Booking Form */}
                <BookingForm />
            </DialogContent>
        </Dialog>
    )
}
