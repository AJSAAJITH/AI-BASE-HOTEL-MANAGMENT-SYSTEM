import CreateBookingHotelForm from '@/components/CreateHotelBookingForm'
import React from 'react'

function BookingHotels() {
    return (
        <main className='container min-h-screen px-4 py-8 mx-auto'>
            <h1 className='text-2xl font-bold'>Booding</h1>
            <CreateBookingHotelForm />
        </main>
    )
}

export default BookingHotels