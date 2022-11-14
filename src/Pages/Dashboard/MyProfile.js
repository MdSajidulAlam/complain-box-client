import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyProfile = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth)

    const imageStorageKey = '02edd5c413d22a736d8b7acfa51c03ac'

    const onSubmit = (data) => {
        const name = user.displayName
        const phone = data.phone
        const education = data.education
        const address = data.address
        const image = data.image[0]

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
                    const updatedUser = {
                        name,
                        img,
                        phone,
                        education,
                        address,
                    }
                    // send to database

                    fetch(`http://localhost:5000/updateduser?email=${user.email}`, {
                        method: "PUT",
                        headers: {
                            'content-type': 'application/json',

                        },
                        body: JSON.stringify(updatedUser)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.acknowledged) {
                                toast.success("Updated Profile successfully")
                                reset()
                            }
                            else {
                                toast.error("Failed to update")
                            }
                        })
                }
            })


    }

    const { data: displayUser, isLoading } = useQuery('user', () => fetch(`http://localhost:5000/user?email=${user.email}`, {
        method: "GET",
        headers: {
            // "authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "content-type": "application/json"
        },
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }


    // console.log(displayUser)
    console.log(user?.photoURL);
    // if (isLoading) {
    //     return <Loading />
    // }

    return (
        <div className='grid sm:grid-cols-1 lg:grid-cols-2'>
            <div className=' mt-12 bg-slate-100 shadow-lg rounded-lg'>
                <div className="avatar mt-8 flex justify-center items-center">
                    <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 my-5">
                        <img src={user?.photoURL} alt='' />
                    </div>
                </div>
                <div className='p-5'>
                    <h2 className='text-xl'><span className='font-semibold'>Name:</span> {user?.displayName}</h2>
                    <h2 className='text-xl'><span className='font-semibold'>Email:</span> {user?.email}</h2>
                    <h2 className='text-xl'><span className='font-semibold'>Address:</span> {displayUser?.address}</h2>
                    <h2 className='text-xl'><span className='font-semibold'>Phone:</span> {displayUser?.phone}</h2>
                    <h2 className='text-xl'><span className='font-semibold'>Education:</span> {displayUser?.education}</h2>
                </div>

            </div>
            {/* <div className="divider lg:divider-horizontal"></div> */}
            <div className='p-10'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Number</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Your Number"
                            className="input input-bordered w-full max-w-xs"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Number is required"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Address"
                            className="input input-bordered w-full max-w-xs"
                            {...register("address", {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                }

                            })}
                        />
                        <label className="label">
                            {errors.address?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Last Education"
                            className="input input-bordered w-full max-w-xs"
                            {...register("education", {
                                required: {
                                    value: true,
                                    message: "Education is required"
                                }

                            })}
                        />
                        <label className="label">
                            {errors.education?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.education.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="file"
                            className="input  w-full max-w-xs"
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: "Image is required"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' &&
                                <span className="label-text-alt text-red-500">{errors.image.message}</span>}

                        </label>
                    </div>
                    <input className='btn w-full max-w-xs' type="submit" value="UPDATE PROFILE" />
                </form>
            </div>
        </div>
    );
};

export default MyProfile;