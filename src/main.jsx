import {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root.jsx';
import Home from './Home/Home.jsx';
import Error from './Error.jsx';
import About from './About.jsx';
import RecipeDetails from './Home/RecipeDetails.jsx';
//import Login from './Profile/Login.jsx';
import LoginForm from './Profile/LoginForm.jsx';
import RegisterForm from './Profile/RegisterForm.jsx'
import Auth_provider from './provider/Auth_provider.jsx';
import Favorite from './Favorite.jsx';
import AdminPrivate from './privateRoute/AdminPrivate.jsx';
import AdminHome from './admin/AdminHome.jsx'
import AddRecipe from './privateRoute/AddRecipe.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/recipe/:id",
        element:<RecipeDetails></RecipeDetails>
      },
      {
        path: "/profile",
        //element: <LoginForm></LoginForm>,
        element: <RegisterForm></RegisterForm>
      },
      { 
        path: "/login",
        element: <LoginForm /> 
      },
      {
        path: "/register",
        element: <RegisterForm></RegisterForm>
      },
      {
        path: "/favorite",
        element: <Favorite></Favorite>
      },
      
    ]
  },
  {
    path: "/admin/add",
    element: (
        <AdminPrivate>
            <AddRecipe></AddRecipe>
        </AdminPrivate>
    ),
},
{
    path: "/admin",
    element: (
        <AdminPrivate>
            <AdminHome></AdminHome>
        </AdminPrivate>
    ),
},
    
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth_provider>
      <RouterProvider router={router} />
    </Auth_provider>
    
  </StrictMode>,
)
