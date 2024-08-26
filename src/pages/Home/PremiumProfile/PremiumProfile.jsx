import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const PremiumProfile = () => {


    const premiumMembers = [
        {
            biodataId: 1,
            biodataType: 'Male',
            profileImage: 'https://via.placeholder.com/150',
            permanentDivision: 'Dhaka',
            age: 30,
            occupation: 'Software Engineer',
        },
        {
            biodataId: 2,
            biodataType: 'Female',
            profileImage: 'https://via.placeholder.com/150',
            permanentDivision: 'Chattogram',
            age: 28,
            occupation: 'Doctor',
        },
        {
            biodataId: 3,
            biodataType: 'Male',
            profileImage: 'https://via.placeholder.com/150',
            permanentDivision: 'Rangpur',
            age: 35,
            occupation: 'Teacher',
        },
        {
            biodataId: 4,
            biodataType: 'Female',
            profileImage: 'https://via.placeholder.com/150',
            permanentDivision: 'Sylhet',
            age: 25,
            occupation: 'Housewife',
        },
        {
            biodataId: 5,
            biodataType: 'Male',
            profileImage: 'https://via.placeholder.com/150',
            permanentDivision: 'Khulna',
            age: 40,
            occupation: 'Businessman',
        },
        {
            biodataId: 6,
            biodataType: 'Female',
            profileImage: 'https://via.placeholder.com/150',
            permanentDivision: 'Barisal',
            age: 32,
            occupation: 'Artist',
        }
    ];


    const handleViewProfile = () => {

    }

    return (
        <div className="my-16">
            <SectionTitle mainHeading="Premium Members"
                subHeading="Every Premium member on Active Matrimonial is privileged by our policy & rules so you don’t  have to worry about your privacy or security.">
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
                {premiumMembers.map(member => (
                    <div
                        key={member.biodataId}
                        className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex justify-center ">
                            <img
                                src={member.profileImage}
                                alt={`Profile of ${member.biodataType}`}
                                className="w-full h-52   shadow-md"
                            />
                        </div>
                        <div className="p-6 text-center">
                            <p className="font-medium text-sm">memberId:{member.biodataId}</p>
                            <h5 className="text-xl font-bold text-gray-900">
                                {member.biodataType} - {member.age} years
                            </h5>
                            <p className="font-medium text-gray-700 my-2">
                                {member.occupation} from {member.permanentDivision}
                            </p>
                            <button
                                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                                onClick={() => handleViewProfile(member.biodataId)}
                            >
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumProfile;