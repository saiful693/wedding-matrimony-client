import { useEffect, useState } from "react";
import useRequestData from "../../../../hooks/useRequestData";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";



const ContactRequest = () => {

    const [requestData, refetch] = useRequestData();
    const axiosPublic = useAxiosPublic();
    const [filterData, setFilterData] = useState([]);

    const fetchData = async () => {
        const bioDataIds = requestData.map(data => data.bioDataId).join(',');
        const queryParams = new URLSearchParams();

        if (bioDataIds) {
            queryParams.append('ids', bioDataIds);
        }

        try {
            const response = await axiosPublic.get('/biodatas', { params: queryParams });
            console.log(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error('Error fetching biodatas:', error);
        }
    };



    useEffect(() => {
        if (requestData?.length > 0) {
            fetchData();
        }
    }, [requestData]);




    const handleDelete = (id) => {
        axiosPublic.delete(`/checkout/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Biodata Id
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Mobile No
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filterData?.map((request) => {

                            const statusItem = requestData.find(item => item.bioDataId === request._id);
                            const status = statusItem ? statusItem.status : 'Unknown';
                            const bioId = statusItem ? statusItem._id : null;

                            return (
                                <tr key={request.biodataId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {request.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.biodataId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${status === 'Approved'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {status}
                                        </span>
                                    </td>
                                    {status === 'Approved' ? (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {request.mobileNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {request.email}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                N/A
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                N/A
                                            </td>
                                        </>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(bioId)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactRequest;