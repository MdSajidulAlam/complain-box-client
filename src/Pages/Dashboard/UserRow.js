import React from 'react';

const UserRow = ({ user, index, refetch, setUser }) => {
    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.role !== 'admin' && <button onClick={() => makeAdmin(user.email)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                <td><label
                    for="delete-modal"
                    className="btn modal-button  btn-xs btn-error"
                    onClick={() => setUser(user)}
                >Delete</label></td> */}
                <td><button className='btn btn-xs btn-primary'>Make Admin</button></td>
                <td><button className='btn btn-xs btn-error'>Delete</button></td>

            </tr>
        </>
    );
};

export default UserRow;