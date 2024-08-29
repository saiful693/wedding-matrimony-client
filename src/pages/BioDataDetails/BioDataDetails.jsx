
import { useEffect, useState } from 'react';
import './BioDataDetails.css'
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Tabs } from 'flowbite-react';
import { HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const BioDataDetails = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [similarData, setSimilarData] = useState(null);
    const [userDb] = useUser();

    const { _id, biodataType, name, profileImageLink, dateOfBirth, height, weight, occupation, race, fathersName, mothersName, permanentDivision, presentDivision, expectedPartnerAge, expectedPartnerHeight, expectedPartnerWeight, mobileNumber, biodataId, userEmail, age } = useLoaderData();


    useEffect(() => {
        axiosPublic.get(`/biodatas/category/${biodataType}`)
            .then(response => {
                setSimilarData(response.data);
            })
    }, [axiosPublic, userDb, biodataType])


    const handleAddToFavorites = async () => {

        const request = {
            userId: userDb._id,
            email: userDb.email,
            bioDataId: _id,
        }
        const res = await axiosSecure.post('/favourites', request)
        // console.log(res.data);
        if (res.data?.insertedId) {
            Swal.fire({
                title: "success!",
                text: "BioData added to the favourites list",
                icon: "success"
            });

            // navigate('/dashboard/paymentHistory');
        }

    }


    return (
        <div>
            <div className="custom-gradient h-[40vh] rounded-lg text-white flex justify-center items-center bg">
                <div className='w-1/2'>
                    <h1 className="text-4xl text-center font-bold">BioData Details</h1>
                    <p className='my-2 text-center text-sm'>
                        A good biodata is important to impress a girl or a boy. Your biodata for marriage has to be attractive and present you in the most positive light possible. We provide different marriage biodata templates for boys & girls, who are in search of suitable brides and grooms for matrimony.
                    </p>
                </div>
            </div>
            <div>
                <div className=" mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">{name} Details</h2>

                    <div className="mb-6 flex gap-4">

                        {/* 1st */}
                        <div className='w-1/3'>
                            <img src={profileImageLink} alt={name} className="w-full" />

                            <div className='border border-spacing-1 rounded-md my-4 px-4'>
                                <p className='text-gray-500'>similar.ID: <small className='text-red-600'>{biodataId}</small></p>
                                <p className='text-2xl text-gray-500 font-medium'>{name}</p>

                                {userDb?.isPremium ? (
                                    <>
                                        <p><strong>Contact Email:</strong> {userEmail}</p>
                                        <p><strong>Mobile Number:</strong> {mobileNumber}</p>
                                    </>
                                ) : (

                                    <Link to={`/checkout/${_id}`}>
                                        <button
                                            className="bg-fuchsia-700 text-white w-full py-2 px-4 rounded mt-4"
                                        >
                                            Request Contact Information
                                        </button>
                                    </Link>

                                )}


                                <button
                                    onClick={() => handleAddToFavorites(_id)}
                                    className="bg-rose-800 w-full mt-2 text-white py-2 px-4 rounded mb-6"
                                >
                                    Add to Favorites
                                </button>
                            </div>

                        </div>





                        <div className="">
                            <Tabs aria-label="Tabs with icons" variant="underline">
                                <Tabs.Item active title="Detail Profile" icon={HiUserCircle}>

                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Birthday</strong></small>
                                        <small ><strong>{dateOfBirth}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Age</strong></small>
                                        <small ><strong>{age}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Occupation</strong></small>
                                        <small ><strong>{occupation}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Race</strong></small>
                                        <small ><strong>{race}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Height</strong></small>
                                        <small ><strong>{height}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Weight</strong></small>
                                        <small ><strong>{weight}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Fothers Name</strong></small>
                                        <small ><strong>{fathersName}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Mothers Name</strong></small>
                                        <small ><strong>{mothersName}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Present Division</strong></small>
                                        <small ><strong>{presentDivision}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Permanent Division</strong></small>
                                        <small ><strong>{permanentDivision}</strong></small>
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title="Partner Preference" icon={MdDashboard}>

                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Expected Partner Age</strong></small>
                                        <small ><strong>{expectedPartnerAge}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Expected Partner Height</strong></small>
                                        <small ><strong>{expectedPartnerHeight}</strong></small>
                                    </div>
                                    <div className='m-6 flex gap-20 justify-center border-y border-spacing-1 p-2'>
                                        <small ><strong>Expected Partner Weight</strong></small>
                                        <small ><strong>{expectedPartnerWeight}</strong></small>
                                    </div>
                                </Tabs.Item>

                            </Tabs>
                        </div>

                    </div>



                    <h3 className="text-xl text-indigo-900 font-bold mb-4">Similar BioData </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {similarData?.map(similar =>
                            <div
                                key={similar.biodataId}
                                className="shadow-xl bg-[#e6e0f7] rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="flex justify-center ">
                                    <img
                                        src={similar.profileImageLink}
                                        alt={`Profile of ${similar.biodataType}`}
                                        className="w-full h-52   shadow-md"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <p className="font-medium text-sm">memberId:{similar.biodataId}</p>
                                    <h5 className="text-xl font-bold text-gray-900">
                                        {similar.biodataType} - {similar.age} years
                                    </h5>
                                    <p className="font-medium text-gray-700 my-2">
                                        {similar.occupation} from {similar.permanentDivision}
                                    </p>
                                    <Link to={`/bioDataDetails/${similar._id}`}>
                                        <button
                                            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                                        >
                                            View Profile
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BioDataDetails;