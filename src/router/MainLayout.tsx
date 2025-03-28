import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setUser as setAuthUser } from '../store/authSlice';
import { setUser as setUserEmail } from '../store/userSlice';
import Navbar from "../components/NavBar.tsx";

const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Restore user state from localStorage
        const email = localStorage.getItem('email');
        const access_token = localStorage.getItem('access_token');
        
        if (email && access_token) {
            // Restore both auth and user state
            dispatch(setAuthUser({ email, name: email.split('@')[0] }));
            dispatch(setUserEmail({ email }));
        }
    }, [dispatch]);

    return (
        <div className="flex h-screen">
            {/* Main Content */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Header */}
                <Navbar />
                {/* Page Content */}
                <div className="flex-1 p-6 overflow-y-auto ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;