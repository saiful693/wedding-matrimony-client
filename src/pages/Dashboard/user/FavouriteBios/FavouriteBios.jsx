import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUser from "../../../../hooks/useUser";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const FavouriteBios = () => {

    const axiosPublic = useAxiosPublic();
    const [userDb] = useUser();
    const [data, setData] = useState([]);

    // query
    const { data: favouriteData = [], refetch } = useQuery({
        queryKey: ['favouriteData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/favourites/${userDb?.email}`);
            return res.data;
        }
    })

    const fetchData = async () => {
        const bioDataIds = favouriteData.map(data => data.bioDataId).join(',');
        const queryParams = new URLSearchParams();

        if (bioDataIds) {
            queryParams.append('ids', bioDataIds);
        }

        try {
            const response = await axiosPublic.get('/biodatas', { params: queryParams });
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching biodatas:', error);
        }
    };



    useEffect(() => {
        if (favouriteData?.length > 0) {
            fetchData();
        }
    }, [favouriteData]);



    const onDelete = (id) => {
        axiosPublic.delete(`/favourites/${id}`)
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
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-4">My Favourites Biodata</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Biodata ID</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Permanent Address</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Occupation</th>
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((biodata) => {
                            const statusItem = favouriteData.find(item => item.bioDataId === biodata._id);
                            const bioId = statusItem ? statusItem._id : null;

                            return (
                                <tr key={biodata.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">{biodata.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{biodata.biodataId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{biodata.permanentDivision}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{biodata.occupation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => onDelete(bioId)}
                                            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
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

export default FavouriteBios;