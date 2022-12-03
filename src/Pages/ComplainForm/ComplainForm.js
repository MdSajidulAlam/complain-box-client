import React from 'react';
import { useForm } from 'react-hook-form';
import banner from '../../assets/banner.jpg'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import toast from 'react-hot-toast';
import { useState } from 'react';

const ComplainForm = () => {
    const [others, setOthers] = useState(false)

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    // const [user] = useAuthState(auth)
    console.log(others)
    const handleOthers = () => {
        setOthers(true)
        console.log(others);
    }

    const slots = ['Police', 'City Corporation', 'WASA', 'BPDB', 'DPDC', 'DESCO', 'Palli Bidyut', 'Karnaphuli Gas', 'Titas Gas', 'Bashundhara LP Gas',]

    const imageStorageKey = '02edd5c413d22a736d8b7acfa51c03ac'

    const onSubmit = (data) => {
        // e.preventDefault()
        // console.log(e.target.address.value);

        const name = data.name
        const number = data.number
        const department = data.department
        const address = data.address
        const description = data.description
        const image = data.image[0]
        const token = Math.floor(Math.random() * 100000)

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const img = result.data.url
                    const complain = {
                        name,
                        number,
                        department,
                        address,
                        description,
                        img,
                        token
                    }
                    // send to database

                    fetch(`http://localhost:5000/post-complain`, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            // "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(complain)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.acknowledged) {
                                toast.success(`Post a complain successfully and your token number is ${token}`, { duration: 5000 })
                                reset()
                            }
                            else {
                                toast.error("Failed to post complain")
                            }
                        })
                }
            })

    }

    return (
        <section className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-8'>
            <div>
                <img src={banner} alt="" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-secondary">Complain for: </h3>
                {/* <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                    <input type="text" className="input input-bordered w-full max-w-xs" placeholder='Name' name='name' />
                    <select name='slot' className="select select-bordered w-full max-w-xs">
                        {
                            slots.map((slot, index) => <option
                                key={index}
                                value={slot}
                            >{slot}</option>)
                        }

                    </select>
                    <input type="text" name='address' className="input input-bordered w-full max-w-xs" placeholder='Address' />

                    <textarea name="description" id="" cols="30" rows="10" className='input input-bordered w-full max-w-xs' placeholder='Description'></textarea>

                    <input type="text" name='instruction' className="input input-bordered w-full max-w-xs" placeholder='Special Instruction' />

                    <input type="number" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />

                    <input type="file" name="" id="" className='input input-bordered w-full max-w-xs' />

                    <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                </form> */}


                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name")}
                        />

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Number</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Your Number"
                            className="input input-bordered w-full max-w-xs"
                            {...register("number")}
                        />

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Department</span>
                        </label>
                        {others ? <input className='input input-bordered w-full max-w-xs' /> : <select

                            className="input input-bordered w-full max-w-xs"
                            {...register("department", {
                                required: {
                                    value: true,
                                    message: "Department is required"
                                }
                            })}
                        >
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>}
                        <label className="label">
                            {errors.department?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                        </label>
                    </div>

                    <div className='flex'>
                        <button onClick={() => setOthers(!false)}> <input type="checkbox" className="toggle" /></button>
                        <div className=' ml-3'>
                            <h1><span className="label-text">Other</span></h1>
                        </div>
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Address"
                            className="input input-bordered w-full max-w-xs"
                            {...register("address")}
                        />
                        {/* <label className="label">
                            {errors.address?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                        </label> */}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Description"
                            className="input input-bordered w-full max-w-xs"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description is required"
                                }

                            })}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="file"
                            className="input  w-full max-w-xs"
                            {...register("image")}
                        />
                        {/* <label className="label">
                            {errors.image?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.image.message}</span>}

                        </label> */}
                    </div>
                    <input className='btn w-full max-w-xs' type="submit" value="Place Complain" />
                </form>
            </div >
        </section >
    );
};

export default ComplainForm;