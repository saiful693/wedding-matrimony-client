import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ApproveContactReq = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contactReq = [], refetch } = useQuery({
        queryKey: ['bioDataId'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact');
            return res.data;
        }
    })


    const handleApproveRequest = (user) => {
        axiosSecure.patch(`/contact/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {

                    // const userInfo = {
                    //     name: contactReq.name,
                    //     email: data.email
                    // }
                    // axiosPublic.post('/users', userInfo)

                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Premium Member Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })



    }


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-4">Contact Request</h2>
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
                        {contactReq.map((bioData) => {
                            return (
                                <tr key={bioData._id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">{bioData.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bioData.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bioData.bioId}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {bioData.status === 'Approved' ?
                                            <button disabled
                                                className="mx-2 bg-red-500 px-4 py-2 rounded shadow transition duration-200"
                                            >
                                                Approved
                                            </button>
                                            :
                                            <button
                                                onClick={() => handleApproveRequest(bioData)}
                                                className="mx-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:via-green-600 hover:to-green-700 px-4 py-2 rounded shadow transition duration-200"
                                            >
                                                Approve
                                            </button>}
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

export default ApproveContactReq;