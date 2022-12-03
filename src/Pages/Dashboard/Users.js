import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
    const [searchedUser, setUser] = useState([])

    const { data: users, isLoading, refetch } = useQuery('alltools', () => fetch('http://localhost:5000/alluser', {
        method: 'GET',

    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }

    const handleSearch = (event) => {
        console.log(event.target.name.value)
        // const filtered = users.filter(user => user.name.includes(text) || user.email.includes(text))
        // setUser(filtered)
    }

    return (
        <div className='mt-24'>
            <div className="form-control w-full max-w-xs my-5">
                <label className="label">
                    <span className="label-text text-xl font-semibold">Search User</span>
                </label>
                <input onChange={handleSearch} name='search' type="text" placeholder="Search here" className="input input-bordered border border-[#323548] w-full max-w-xs" />

            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <thead>

                    </thead> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <UserRow key={user._id} user={user} index={index} refetch={refetch} setUser={setUser}></UserRow>)
                        }

                    </tbody>
                </table>
            </div>
            {/* {
                user && <DeleteModal
                    setUser={setUser}
                    user={user}
                    refetch={refetch}
                ></DeleteModal>
            } */}
        </div >
    );
};

export default Users;