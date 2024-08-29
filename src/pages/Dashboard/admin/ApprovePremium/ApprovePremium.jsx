import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const ApprovePremium = () => {
    const axiosSecure = useAxiosSecure();
    const [filterData, setFilterData] = useState([]);

    const { data: premiumReq = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premium');
            return res.data;
        }
    })

    const fetchData = async () => {
        const bioDataIds = premiumReq.map(data => data.bioDataId).join(',');
        const queryParams = new URLSearchParams();

        if (bioDataIds) {
            queryParams.append('ids', bioDataIds);
        }

        try {
            const response = await axiosSecure.get('/biodatas', { params: queryParams });
            // console.log(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error('Error fetching biodatas:', error);
        }
    };



    useEffect(() => {
        if (premiumReq?.length > 0) {
            fetchData();
        }
    }, [premiumReq]);


    const handleMakePremium = (bioData) => {
        axiosSecure.patch(`/users/premium/${bioData.userId}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    axiosSecure.delete(`/premium/${bioData._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `Contact request is approve`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                            }
                        })



                }
            })
    }


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-4">Premium Request</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Biodata Id</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filterData.map((bioData) => {
                            return (
                                <tr key={bioData._id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">{bioData.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bioData.userEmail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bioData.biodataId}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleMakePremium(bioData)}
                                            className="mx-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:via-green-600 hover:to-green-700 px-4 py-2 rounded shadow transition duration-200"
                                        >
                                            Make Premium
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovePremium;