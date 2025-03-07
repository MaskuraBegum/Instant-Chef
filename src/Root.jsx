import React, { useContext } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { AuthContext } from './provider/Auth_provider';

const Root = () => {
    const { logout, user } = useContext(AuthContext);

    const logOut = () => {
        console.log("logout is clicked");
        logout()
            .then(() => {
                console.log('done');
                alert('Signed out successfully');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const links = (
        <>
            <li><NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Homepage</NavLink></li>
            <li><NavLink to='/favorite' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Favorite</NavLink></li>
            <li><NavLink to='/profile' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Sign up</NavLink></li>
            <li><NavLink to='/about' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>About</NavLink></li>
            
        </>
    );

    return (
        <div className='ml-10 mr-10 mt-5'>
            <div className="navbar bg-base-100">
                {/* Left Corner: Instant Chef */}
                <div className="navbar-start">
                    <a className="text-3xl font-bold text-red-800">Instant Chef</a>
                </div>

                {/* Center: Navigation Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-4 text-xl font-semibold">{links}</ul>
                </div>

                {/* Right Corner: Buttons */}
                <div className="navbar-end">
                    {user?.email === "admin.chef15@gmail.com" && (
                        <Link to='/admin' className="mx-0 lg:mx-8 text-center text-xl text-green-950 font-semibold">Dashboard</Link>
                    )}
                    {user ? (
                        <div className="flex flex-col items-end">
                            <div className='p-0 lg:p-2'>
                                <div className='text-xs lg:text-sm p-2 border-2 rounded-2xl'>{user.email}</div>
                            </div>
                            <button onClick={logOut} className="mx-0 lg:mx-8 btn text-lg bg-purple-300 text-purple-950">LogOut</button>
                        </div>
                    ) : (
                        <div className="navbar-end">
                            <Link to='/login' className="mx-0 lg:mx-8 btn text-sm lg:text-lg bg-purple-400 text-purple-950">LogIn</Link>
                        </div>
                    )}
                </div>

                {/* Responsive Menu for Small Screens */}
                <div className='navbar-center lg:hidden'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Root;
