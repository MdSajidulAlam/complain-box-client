import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ManageAuthority = () => {
    const slots = ['Police', 'City Corporation', 'WASA', 'BPDB', 'DPDC', 'DESCO', 'Palli Bidyut', 'Karnaphuli Gas', 'Titas Gas', 'Bashundhara LP Gas',]
    const [user, setUser] = useState([])
    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:5000/user/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id])

    const handleAuthority = (e) => {
        e.preventDefault()
        const authority = e.target.department.value

        fetch(`http://localhost:5000/authority?email=${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ authority: authority })
        }).then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div className='flex justify-center items-center mt-12'>
            <form action="" onSubmit={handleAuthority}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input

                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        value={user.email}
                        readOnly
                    />

                </div>
                <div className="form-control w-full max-w-xs">

                    <label className="label">
                        <span className="label-text">Department</span>
                    </label>
                    <select
                        name='department'
                        className="input input-bordered w-full max-w-xs"

                    >
                        {
                            slots.map((slot, index) => <option
                                key={index}
                                value={slot}
                            >{slot}</option>)
                        }
                    </select>

                </div>
                <input className='btn w-full max-w-xs mt-4' type="submit" value="Make Authority" />
            </form>
        </div>
    );
};

export default ManageAuthority;