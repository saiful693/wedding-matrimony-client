import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import { useEffect, useState } from "react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const EditBiodata = () => {
    const { user } = useAuth();
    const [userDb] = useUser();
    const axiosPublic = useAxiosPublic();
    const [dataOne, setDataOne] = useState(null);

    // console.log(dataOne)




    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        axiosPublic.get(`/biodatas/user/${userDb._id}`)
            .then(response => {
                setDataOne(response.data);
            })
    }, [axiosPublic, userDb._id])


    const genarateHeight = () => {
        const options = []
        for (let ft = 4; ft <= 6; ft++) {
            for (let inch = 0; inch < 12; inch++) {
                const height = `${ft}ft ${inch}inch`;
                options.push(height);
            }
        }
        return options;
    }

    const genarateWight = () => {
        const options = [];
        for (let start = 40; start < 120; start += 5) {
            const end = start + 5;
            const range = `${start} -${end} kg`;
            options.push(range)
        }
        return options;
    }




    // submit request
    const onSubmit = async (data) => {
        // imgbb
        const imageFile = { image: data.profileImageLink }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const userInfo = userDb._id;
            const biodataItem = { ...data, userId: userInfo };
            console.log(res.data.data.display_url);
            const biodataRes = await axiosPublic.post('/biodatas', biodataItem);
            if (biodataRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `BioData  is created successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else if (biodataRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `BioData  is updated  successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `error occurs`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }


    }


    return (

        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-indigo-800 font-bold my-6 text-center">Create or  Edit Biodata</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="biodataType" className="block text-gray-700">Biodata Type</label>
                        <select

                            defaultValue={dataOne?.biodataType || ""}
                            {...register("biodataType", { required: "Biodata type is required" })}
                            id="biodataType"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Type</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.biodataType && <p className="text-red-500 text-sm">{errors.biodataType.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            defaultValue={dataOne?.name}
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            id="name"
                            className="w-full mt-2 p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-gray-700">Age</label>
                        <input
                            defaultValue={dataOne?.age}
                            {...register("age", { required: "Age is required" })}
                            type="text"
                            id="name"
                            className="w-full mt-2 p-2 border rounded"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="profileImageLink" className="block text-gray-700">Profile Image</label>
                        <input
                            defaultValue={dataOne?.profileImageLink}
                            {...register("profileImageLink")}
                            type="text"
                            id="profileImageLink"
                            placeholder="Image URL"
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth</label>
                        <input
                            defaultValue={dataOne?.dateOfBirth}
                            {...register("dateOfBirth", { required: "Date of birth is required" })}
                            type="date"
                            id="dateOfBirth"
                            className="w-full mt-2 p-2 border rounded"
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Height</label>
                        <select
                            defaultValue={dataOne?.height}
                            {...register("height", { required: "Height is required" })}
                            id="height"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Height</option>
                            {
                                genarateHeight().map((height) => <option key={height} value={height}>{height}</option>)
                            }
                        </select>
                        {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="weight" className="block text-gray-700">Weight</label>
                        <select
                            defaultValue={dataOne?.weight}
                            {...register("weight", { required: "Weight is required" })}
                            id="weight"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Weight</option>
                            {
                                genarateWight().map(weight => <option key={weight} value={weight}>{weight}</option>)
                            }
                        </select>
                        {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="occupation" className="block text-gray-700">Occupation</label>
                        <select
                            defaultValue={dataOne?.occupation}
                            {...register("occupation", { required: "Occupation is required" })}
                            id="occupation"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Occupation</option>
                            <option value="Student">Student</option>
                            <option value="Job">Job</option>
                            <option value="Housewife">Housewife</option>
                        </select>
                        {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="race" className="block text-gray-700">Race</label>
                        <select
                            defaultValue={dataOne?.race}
                            {...register("race", { required: "Race is required" })}
                            id="race"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Race</option>
                            <option value="White">White</option>
                            <option value="Bright brunette">Bright brunette</option>
                            <option value="Brunette">Brunette</option>
                            <option value="Black">Black</option>

                        </select>
                        {errors.race && <p className="text-red-500 text-sm">{errors.race.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="fathersName" className="block text-gray-700">Fathers Name</label>
                        <input
                            defaultValue={dataOne?.fathersName}
                            {...register("fathersName")}
                            type="text"
                            id="fathersName"
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="mothersName" className="block text-gray-700">Mothers Name</label>
                        <input
                            defaultValue={dataOne?.mothersName}
                            {...register("mothersName")}
                            type="text"
                            id="mothersName"
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="permanentDivision" className="block text-gray-700">Permanent Division</label>
                        <select
                            defaultValue={dataOne?.permanentDivision}
                            {...register("permanentDivision", { required: "Permanent division is required" })}
                            id="permanentDivision"
                            className="w-full mt-2 p-2 border rounded"
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
                        {errors.permanentDivision && <p className="text-red-500 text-sm">{errors.permanentDivision.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="presentDivision" className="block text-gray-700">Present Division</label>
                        <select
                            defaultValue={dataOne?.presentDivision}
                            {...register("presentDivision", { required: "Present division is required" })}
                            id="presentDivision"
                            className="w-full mt-2 p-2 border rounded"
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
                        {errors.presentDivision && <p className="text-red-500 text-sm">{errors.presentDivision.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="expectedPartnerAge" className="block text-gray-700">Expected Partner Age</label>
                        <input
                            defaultValue={dataOne?.expectedPartnerAge}
                            {...register("expectedPartnerAge")}
                            type="number"
                            id="expectedPartnerAge"
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="expectedPartnerHeight" className="block text-gray-700">Expected Partner Height</label>
                        <select
                            defaultValue={dataOne?.expectedPartnerHeight}
                            {...register("expectedPartnerHeight")}
                            id="expectedPartnerHeight"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Height</option>
                            {
                                genarateHeight().map(height => <option key={height} value={height}>{height}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="expectedPartnerWeight" className="block text-gray-700">Expected Partner Weight</label>
                        <select
                            defaultValue={dataOne?.expectedPartnerWeight}
                            {...register("expectedPartnerWeight")}
                            id="expectedPartnerWeight"
                            className="w-full mt-2 p-2 border rounded"
                        >
                            <option value="">Select Weight</option>
                            {
                                genarateWight().map(weight => <option key={weight} value={weight}>{weight}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="contactEmail" className="block text-gray-700">Contact Email</label>
                        <input
                            {...register("userEmail")}
                            type="email"
                            id="contactEmail"
                            value={user.email}
                            readOnly
                            className="w-full mt-2 p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number</label>
                        <input
                            defaultValue={dataOne?.mobileNumber}
                            {...register("mobileNumber", { required: "Mobile number is required" })}
                            type="text"
                            id="mobileNumber"
                            className="w-full mt-2 p-2 border rounded"
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
                    </div>
                </div>
                <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">Save and Publish Now</button>
            </form>
        </div>
    );
};

export default EditBiodata;