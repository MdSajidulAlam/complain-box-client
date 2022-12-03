import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ComplainRow from './ComplainRow';

const AllComplain = () => {

    const { data: complains, isLoading, refetch } = useQuery('alltools', () => fetch('http://localhost:5000/allcomplain', {
        method: 'GET',

    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='w-full'>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <thead>

                </thead> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Department</th>
                            <th>Address</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            complains.map((complain, index) => <ComplainRow key={complain._id} complain={complain} index={index} refetch={refetch} ></ComplainRow>)
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

export default AllComplain;