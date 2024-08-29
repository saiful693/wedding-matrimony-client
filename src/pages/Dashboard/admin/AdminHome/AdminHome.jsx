import { useEffect, useState } from "react";
import useBioData from "../../../../hooks/useBioData";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAllUser from "../../../../hooks/useAllUser";

const AdminHome = () => {

    const [bioData,] = useBioData();
    const [userAll] = useAllUser();
    const axiosSecure = useAxiosSecure();
    const [totalRevenue, setTotalRevenue] = useState(0)

    const male = bioData.filter((data) => data.biodataType === "Male");
    const female = bioData.filter((data) => data.biodataType === "Female");

    const premium = userAll.filter((data) => data.isPremium === true);


    const handleTotal = async () => {
        const totalAmout = await axiosSecure.get('/checkout')
        setTotalRevenue(totalAmout?.data[0].total)
    }
    useEffect(() => {
        handleTotal()
    }, [axiosSecure])

    // const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    return (
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 min-h-screen p-6 flex items-center justify-center">
            <div className="container mx-auto p-6 bg-white bg-opacity-70 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Total Biodata Count */}
                    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="text-2xl font-semibold">Total Biodata</h2>
                        <p className="text-5xl font-extrabold mt-4">{bioData.length}</p>
                        <div className="mt-4 text-sm opacity-75">Total number of biodata profiles</div>
                    </div>

                    {/* Male Biodata Count */}
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="text-2xl font-semibold">Male Biodata</h2>
                        <p className="text-5xl font-extrabold mt-4">{male.length}</p>
                        <div className="mt-4 text-sm opacity-75">Number of male biodata profiles</div>
                    </div>

                    {/* Female Biodata Count */}
                    <div className="bg-pink-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="text-2xl font-semibold">Female Biodata</h2>
                        <p className="text-5xl font-extrabold mt-4">{female.length}</p>
                        <div className="mt-4 text-sm opacity-75">Number of female biodata profiles</div>
                    </div>

                    {/* Premium Biodata Count */}
                    <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="text-2xl font-semibold">Premium Biodata</h2>
                        <p className="text-5xl font-extrabold mt-4">{premium.length}</p>
                        <div className="mt-4 text-sm opacity-75">Number of premium profiles</div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <h2 className="text-2xl font-semibold">Total Revenue</h2>
                        <p className="text-5xl font-extrabold mt-4">${totalRevenue}</p>
                        <div className="mt-4 text-sm opacity-75">Revenue generated from contact purchases</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;