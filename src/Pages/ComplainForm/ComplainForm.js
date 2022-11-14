import React from 'react';
import banner from '../../assets/banner.jpg'

const ComplainForm = () => {
    const slots = ['Police', 'City Corporation', 'WASA', 'BPDB', 'DPDC', 'DESCO', 'Palli Bidyut', 'Karnaphuli Gas', 'Titas Gas', 'Bashundhara LP Gas']

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.address.value);
    }

    return (
        <section className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-8'>
            <div>
                <img src={banner} alt="" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-secondary">Book for: </h3>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                    <input type="text" className="input input-bordered w-full max-w-xs" placeholder='Name' />
                    <select name='slot' className="select select-bordered w-full max-w-xs">
                        {
                            slots.map((slot, index) => <option
                                key={index}
                                value={slot}
                            >{slot}</option>)
                        }

                    </select>
                    <input type="text" name='address' className="input input-bordered w-full max-w-xs" placeholder='Address' />
                    <textarea name="" id="" cols="30" rows="10" className='input input-bordered w-full max-w-xs' placeholder='Description'></textarea>
                    <input type="email" name='email' className="input input-bordered w-full max-w-xs" />
                    <input type="number" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                    <input type="file" name="" id="" />
                    <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                </form>
            </div>
        </section>
    );
};

export default ComplainForm;