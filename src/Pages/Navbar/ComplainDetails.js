import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import DeleteModal from './DeleteModal';

const ComplainDetails = () => {
    // const [complain, setComplain] = useState([])
    const { id } = useParams()
    const complainId = parseInt(id)

    const { data: complain, isLoading, refetch } = useQuery('complain', () => fetch(`http://localhost:5000/complain/${complainId}`, {
        method: 'GET',

    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }
    // useEffect(() => {
    //     fetch(`http://localhost:5000/complain/${complainId}`, {
    //         method: 'GET',
    //         headers: {
    //             'content-type': "application/json"
    //         },
    //     })
    //         .then(res => {
    //             console.log(res);
    //             res.json()
    //         })
    //         .then(data => {

    //             setComplain(data)

    //         })
    // }, [complainId])

    const handleResolved = (id) => {
        if (complain.resolved === true) {
            toast.error("Your complain have been resolved already", { id: 'Sajid' })
        }
        else {
            fetch(`http://localhost:5000/resolved/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': "application/json"
                },
            })
                .then(res => {

                    res.json()
                })
                .then(data => {

                    toast.success("Complain Resolved Successfully")

                })
        }
    }
    return (
        <div>
            <div className='flex justify-center items-center mt-12'>
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Department: {complain.department}</h2>
                        <p>Description: {complain.description}</p>
                        <p>Address: {complain.address}</p>
                        <p>Token No: {complain.token}</p>
                        <div className="avatar border rounded-lg p-4">
                            <label htmlFor="">Document:</label>
                            <div className="w-24 rounded-xl">
                                <img src={complain.img} alt='' />
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={() => handleResolved(complain._id)}>Resolved</button>

                            <label htmlFor="my-modal-6" className="btn btn-error">Delete</label>


                        </div>
                    </div>
                </div>
                <DeleteModal complain={complain} />
            </div>

            {/* {complain.length === 0 && <div className='text-center'>
                <p className='text-2xl text-primary'>You have no complain</p>
            </div>} */}

        </div>
    );
};

export default ComplainDetails;