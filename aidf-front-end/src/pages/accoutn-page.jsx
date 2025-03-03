import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router';

function AccoutnPage() {

    // provide from clerk - like a hook (Redux)
    const { isLoaded, isSignedIn, user } = useUser();

    // if (!isSignedIn) {
    //     return <Navigate to='/sign-in' />
    // }

    return (
        <main className='container min-h-screen py-8 mx-auto'>
            <h1 className='text-3xl font-bold md:text-4xl'>My Account</h1>
            <div className='mt-8'>
                <h2 className='mb-4 text-xl font-semibold md:text-2xl'>
                    Personal Information
                </h2>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='flex flex-col'>
                        <p className='text-muted-foreground'>Name: {user?.fullName}</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='flex flex-col'>
                        <p className='text-muted-foreground'>Email: {user.emailAddresses[0].emailAddress}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AccoutnPage