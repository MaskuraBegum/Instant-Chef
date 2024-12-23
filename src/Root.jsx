import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Root = () => {
    const links = (
        <>
            <li><NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Homepage</NavLink></li>
            <li><NavLink to='/profile' className={({ isActive }) => isActive ? 'text-blue-700' : ''}>Profile</NavLink></li>
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
                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>

                {/* Responsive Menu for Small Screens */}
                <div className="navbar-center lg:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-[1]">
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
