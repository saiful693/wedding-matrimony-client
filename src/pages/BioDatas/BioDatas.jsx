import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const BioDatas = () => {

    const axiosPublic = useAxiosPublic();
    const [filterData, setFilterData] = useState([]);

    const [filters, setFilters] = useState({ ageFrom: "", ageTo: "", biodataType: "", permanentDivision: "", });


    const handleChange = e => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    }


    const fetchData = async () => {
        const queryParams = new URLSearchParams();

        if (filters.ageFrom) {
            queryParams.append("ageFrom", filters.ageFrom);
        }
        if (filters.ageTo) {
            queryParams.append("ageTo", filters.ageTo);
        }
        if (filters.biodataType) {
            queryParams.append("biodataType", filters.biodataType);
        }
        if (filters.permanentDivision) {
            queryParams.append("permanentDivision", filters.permanentDivision);
        }

        const response = await axiosPublic.get('/biodatas', { params: queryParams })
        setFilterData(response.data);
    }


    useEffect(() => {
        fetchData({})
    }, [])

    const handleFilter = () => {
        fetchData();
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-10">

            <div className="border h-full lg:w-80 border-spacing-1 p-6">
                <h2 className="text-2xl font-medium border-b border-spacing-1"> Filter BioData</h2>
                <div className="flex gap-10 my-5">
                    <div>
                        <label htmlFor="ageFrom" className="block text-gray-700">Age From</label>
                        <input type="text" id="name" name="ageFrom" value={filters.ageFrom} onChange={handleChange} className="w-full mt-2 p-2 border rounded" />
                    </div>
                    <div>
                        <label htmlFor="ageFrom" className="block text-gray-700">To</label>
                        <input type="text" id="name" name="ageTo" value={filters.ageTo} onChange={handleChange} className="w-full mt-2 p-2 border rounded" />
                    </div>
                </div>


                <div className="my-5">
                    <label htmlFor="biodataType" className="block text-gray-700">Biodata Type</label>
                    <select
                        id="biodataType"
                        className="w-full mt-2 p-2 border rounded"
                        name="biodataType"
                        value={filters.biodataType}
                        onChange={handleChange}
                    >
                        <option value="">Select Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>


                <div className="my-5">
                    <label htmlFor="permanentDivision" className="block text-gray-700">Permanent Division</label>
                    <select
                        id="permanentDivision"
                        name="permanentDivision"
                        className="w-full mt-2 p-2 border rounded"
                        value={filters.permanentDivision}
                        onChange={handleChange}
                    >
                        <option value="">Select Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Maymansingh">Maymansingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>

                <button
                    className="w-full mt-5 bg-blue-500 text-white p-2 rounded"
                    onClick={handleFilter}
                >
                    Apply Filter
                </button>

            </div>

            {/* 2nd div */}
            <div className="border border-spacing-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">

                    {filterData.map(member => (
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
                                <Link to={`/bioDataDetails/${member._id}`}>
                                    <button
                                        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                                    >
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BioDatas;