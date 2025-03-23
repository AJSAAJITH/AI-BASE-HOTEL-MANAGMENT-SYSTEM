import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router'

function AdminProtectedLayout() {
    const { user } = useUser();
    if (user.publicMetadata?.role !== "admin") {
        return <Navigate to="/" />
    }
    return <Outlet />
}

export default AdminProtectedLayout