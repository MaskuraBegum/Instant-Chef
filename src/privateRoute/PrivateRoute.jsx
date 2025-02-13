import React, { useContext } from 'react';
import { AuthContext } from '../provider/Auth_provider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>; // Show a loading state
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return children;
};

export default PrivateRoute;
