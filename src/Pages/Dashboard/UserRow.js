import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const UserRow = ({ user, index, refetch, setUser }) => {
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate(`/manageauthority/${id}`)
    }
    const makeAdmin = (email) => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        }).then(res => {
            if (res.status === 403) {
                toast.error('Failed to make an admin')
            }
            return res.json()
        })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Successfully made an admin`)
                }
            })
    }

    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{(user.role !== 'admin' && !user.authority) && <button onClick={() => makeAdmin(user.email)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                {/* <td><label
                    for="delete-modal"
                    className="btn modal-button  btn-xs btn-error"
                    onClick={() => setUser(user)}
                >Delete</label></td> */}
                {/* <td><button className='btn btn-xs btn-primary'>Make Admin</button></td> */}
                {user.authority ? <td>{user.authority}</td> : <td> <button onClick={() => handleNavigate(user._id)} className='btn btn-xs btn-success'>Make Authority</button></td>}
                <td><button className='btn btn-xs btn-error'>Delete</button></td>

            </tr>
        </>
    );
};

export default UserRow;