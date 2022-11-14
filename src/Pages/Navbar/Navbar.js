import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const user = useAuthState(auth)
    const logout = () => {
        signOut(auth)
        // localStorage.removeItem("accessToken")
    }
    console.log(user);
    const manuItems = <>
        <li><NavLink className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : undefined
        } to='/home'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : undefined
        } to='/about'>About</NavLink></li>

        <li><NavLink className={({ isActive }) =>
            isActive ? "underline underline-offset-8" : undefined
        } to='/dashboard'>Dashboard</NavLink></li>

        {/* <li>{user[0] === 'null' ? <button onClick={logout} className="btn btn-ghost">Sign Out</button> : <Link to='/login'>Login</Link>}</li> */}
        {/* <li><Link to='/login'>Login</Link></li> */}
        <li>{user[0] !== null ? <button onClick={logout} className="btn btn-ghost">Log Out</button> : <Link to='/login'>Login</Link>}</li>
        {/* <li></li> */}
    </>


    return (
        <div className="navbar bg-[#323548] drop-shadow-2xl text-white lg:px-12 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#323548] rounded-box w-52">
                        {manuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">COMPLAIN BOX</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {manuItems}
                </ul>
            </div>
            <div className="navbar-end lg:hidden">
                <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>

            </div>
        </div>
    );
};

export default Navbar;