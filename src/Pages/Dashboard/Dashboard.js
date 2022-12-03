import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here --> */}
                {/* <h2 className='text-3xl font-bold text-primary text-center mt-24'>Welcome to your Dashboard</h2> */}
                <Outlet />

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Profile</Link></li>
                    <li><Link to='/dashboard/users'>All Users</Link></li>

                    <li><Link to='/dashboard/mycomplains'>My Complains</Link></li>
                    <li><Link to='/dashboard/allcomplain'>All Complains</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;