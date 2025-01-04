import React, { useContext } from 'react';
import { AuthContext } from '../provider/Auth_provider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRout = ({children}) => {
    const {user} = useContext(AuthContext)
    const location = useLocation()
    if(!user){
        return <Navigate to='/login' state={location?.pathname || '/'}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRout;