import React from 'react';
import toast from 'react-hot-toast';

const DeleteModal = ({ complain }) => {

    const handleDelete = (id) => {
        console.log(id);
        const url = `http://localhost:5000/deletecomplain/${id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {

                toast.success("Complain Deleted Successfully")
                console.log(data);
            })

    }

    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className='m-4'>
                        <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    </div>
                    <h3 className="font-bold text-lg text-error">Are you sure you want to delete your complain?</h3>
                    <h2 className="py-4">Department: {complain.department}</h2>
                    <p>Description: {complain.description}</p>
                    <p>Address: {complain.address}</p>
                    <p>Token No: {complain.token}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn btn-accent" onClick={() => handleDelete(complain._id)}>Confirm</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;