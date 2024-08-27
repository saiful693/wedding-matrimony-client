import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useBioData from "../../../hooks/useBioData";


const PremiumProfile = () => {


    const [bioData, refetch] = useBioData();
    const [sortOrder, setSortOrder] = useState('asc')


    const premiumBioData = bioData.filter(item => item.isPremium === true);



    const sortedPremiumBioData = [...premiumBioData].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.age > b.age ? 1 : -1;
        } else {
            return a.age < b.age ? 1 : -1;
        }
    });

    const limitedPremiumBioData = sortedPremiumBioData.slice(0, 6);



    return (
        <div className="my-16">
            <SectionTitle mainHeading="Premium Members"
                subHeading="Every Premium member on Active Matrimonial is privileged by our policy & rules so you don’t  have to worry about your privacy or security.">
            </SectionTitle>
            <div className="mb-4">
                <label htmlFor="sortOrder" className="mr-2 font-semibold">Sort by:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">

                {limitedPremiumBioData.map(member => (
                    <div
                        key={member.biodataId}
                        className="shadow-xl bg-[#e6e0f7] rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="flex justify-center ">
                            <img
                                src={member?.profileImageLink}
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