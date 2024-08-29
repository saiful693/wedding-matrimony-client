import Swal from "sweetalert2";
import useAllUser from "../../../../hooks/useAllUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUser = () => {

    const [userAll, refetch] = useAllUser();
    const axiosSecure = useAxiosSecure();



    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    const handleMakePremium = (user) => {
        axiosSecure.patch(`/users/premium/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
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
            <h2 className="text-2xl font-bold text-center mb-4">All Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userAll.map((user) => {
                            return (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.role === "admin" ?
                                            <button disabled
                                                className="mx-2 bg-red-800 text-white px-4 py-2 rounded shadow transition duration-200"
                                            >
                                                Already Admin
                                            </button>
                                            :
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="mx-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 px-4 py-2 rounded shadow transition duration-200"
                                            >
                                                Make Admin
                                            </button>}
                                        {user.isPremium === true ?
                                            <button disabled
                                                className="mx-2 bg-red-800 text-white px-4 py-2 rounded shadow transition duration-200"
                                            >
                                                Already Premium
                                            </button>
                                            :
                                            <button
                                                onClick={() => handleMakePremium(user)}
                                                className="mx-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:via-green-600 hover:to-green-700 px-4 py-2 rounded shadow transition duration-200"
                                            >
                                                Make Premium
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

export default ManageUser;