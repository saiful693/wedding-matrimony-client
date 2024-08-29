import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";


const ViewData = () => {

    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState();
    const [userDb] = useUser();

    useEffect(() => {
        axiosSecure.get(`/biodatas/user/${userDb._id}`)
            .then(response => {
                setUserData(response.data);
            })
    }, [axiosSecure, userDb._id])


    const makeBiodataPremium = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const request = {
                    name: userData.name,
                    email: userDb.email,
                    bioDataId: userData._id,
                }
                const res = await axiosSecure.post('/premium', request)
                console.log(res.data);
                if (res.data?.insertedId) {
                    Swal.fire({
                        title: "success!",
                        text: "Your request has been submitted.",
                        icon: "success"
                    });

                    // navigate('/dashboard/paymentHistory');
                }


            }
        });





    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Container for userData */}
            <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                {/* Header with Profile Image and Name */}
                <div className="flex items-center space-x-6 mb-6">
                    <img
                        src={userData?.profileImageLink}
                        alt={`${userData?.name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{userData?.name}</h2>
                        <p className="text-xl text-gray-600">{userData?.biodataType}</p>
                        {/* Premium Status Indicator */}
                        <p className={`mt-2 font-semibold text-lg ${userDb?.isPremium ? "text-green-600" : "text-red-600"
                            }`}>
                            {userDb?.isPremium ? "Premium Member" : "Standard Member"}
                        </p>
                    </div>
                </div>

                {/* userData Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-700 font-semibold">Date of Birth:</p>
                        <p className="text-gray-900">{userData?.dateOfBirth}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Height:</p>
                        <p className="text-gray-900">{userData?.height}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Weight:</p>
                        <p className="text-gray-900">{userData?.weight}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Age:</p>
                        <p className="text-gray-900">{userData?.age}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Occupation:</p>
                        <p className="text-gray-900">{userData?.occupation}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Race:</p>
                        <p className="text-gray-900">{userData?.race}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Fathers Name:</p>
                        <p className="text-gray-900">{userData?.fathersName}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Mothers Name:</p>
                        <p className="text-gray-900">{userData?.mothersName}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Permanent Division:</p>
                        <p className="text-gray-900">{userData?.permanentDivision}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Present Division:</p>
                        <p className="text-gray-900">{userData?.presentDivision}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Expected Partner Age:</p>
                        <p className="text-gray-900">{userData?.expectedPartnerAge}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Expected Partner Height:</p>
                        <p className="text-gray-900">{userData?.expectedPartnerHeight}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Expected Partner Weight:</p>
                        <p className="text-gray-900">{userData?.expectedPartnerWeight}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Contact Email:</p>
                        <p className="text-gray-900">{userData?.userEmail}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">Mobile Number:</p>
                        <p className="text-gray-900">{userData?.mobileNumber}</p>
                    </div>
                </div>

                {/* Premium Button */}
                <div className="mt-8 text-center">
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={userDb?.isPremium}
                        onClick={makeBiodataPremium}
                    >
                        {userDb?.isPremium ? "Already Premium" : "Make Biodata Premium"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewData;