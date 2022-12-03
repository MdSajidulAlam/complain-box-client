import React from 'react';

const ComplainRow = ({ complain, index }) => {
    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td><img className='w-12 rounded-full' src={complain.img} alt="" /></td>
                <td>{complain.name}</td>
                <td>{complain.number}</td>
                <td>{complain.department}</td>
                <td>{complain.address}</td>
                <td>{complain.description}</td>
                {/* <td>{user.role !== 'admin' && <button onClick={() => makeAdmin(user.email)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                <td><label
                    for="delete-modal"
                    className="btn modal-button  btn-xs btn-error"
                    onClick={() => setUser(user)}
                >Delete</label></td> */}
                {/* <td><button className='btn btn-xs btn-primary'>Make Admin</button></td>
                <td><button className='btn btn-xs btn-success'>Make Authority</button></td>
                <td><button className='btn btn-xs btn-error'>Delete</button></td> */}

            </tr>
        </>
    );
};

export default ComplainRow;