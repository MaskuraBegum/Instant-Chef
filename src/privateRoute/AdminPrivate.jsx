import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../provider/Auth_provider'; // Make sure this is your Auth context
import AdminHome from '../admin/AdminHome';

const AdminPrivate = ({ children }) => {
  const { user, isAdmin, loading } = useContext(AuthContext); // Use context to get the user and isAdmin status
  console.log('User:', user);
  console.log('Is Admin:', isAdmin);
  console.log("loading", loading)
  if(loading){
    return <div>content is loading</div>
  }
  // Check if the user is authenticated and an admin, otherwise redirect
  if (!isAdmin) {
    console.log("here1")
    return <Navigate to="/error" />; 
   
  }
  return children;
  // If user is admin, render the children (i.e., the AddRecipe component)
  // Redirect to /admin page if not admin
}


export default AdminPrivate;

