import { Button, FileInput, FooterDivider, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const GotMarried = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const generateRating = (min = 1, max = 5, step = 1) => {
        const options = [];
        for (let rating = min; rating <= max; rating += step) {
            options.push(rating.toFixed(1)); // Use .toFixed(1) to ensure proper formatting (e.g., "4.5")
        }
        return options;
    };


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const imageFile = { image: data.imgFile[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const successItem = {
                name: data.name,
                userEmail: data.email,
                marriageDate: data.marriageDate,
                rating: data.rating,
                description: data.description,
                image: res.data.data.display_url
            }
            const storyRes = await axiosPublic.post('/stories', successItem);
            if (storyRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Story is created Successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if (storyRes.data.insertedId === null) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Story already exists`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    return (
        <div className="border w-full mt-10 rounded-lg h-full bg-rose-950 bg-opacity-50 shadow-xl border-spacing-1 p-20">
            <h2 className="text-2xl font-semibold text-center">Post Yours Success Stroy</h2>
            <div className="mt-4 flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-xl h-full flex-col gap-10">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Your Name" />
                        </div>
                        <TextInput {...register("name", { required: true })} className="w-full" id="name" type="text" name="name" placeholder="Name" />
                        {errors.name && <span className='text-red-500'>Name field is required</span>}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your Email" />
                        </div>
                        <TextInput {...register("email", { required: true })} value={user.email} className="w-full" id="name" type="text" name="name" placeholder="Name" />
                        {errors.name && <span className='text-red-500'>Name field is required</span>}
                    </div>
                    <div>
                        <Label htmlFor="marriageDate" value="Your Marriage Date" />
                        <TextInput {...register("marriageDate", { required: "Date of marriage is required" })}
                            type="date"
                            id="dateOfBirth"
                            className="w-full mt-2   rounded"
                        />
                        {errors.marriageDate && <p className="text-red-500 text-sm">{errors.marriageDate.message}</p>}
                    </div>

                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="countries" value="Select your Rating" />
                            </div>
                            <Select {...register("rating", { required: "Rating is required" })} id="countries" required>
                                <option value="">Select Rating</option>
                                {
                                    generateRating().map((rating) => <option key={rating} value={rating}>{rating}</option>)
                                }
                            </Select>
                            {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Your Description" />
                        </div>
                        <Textarea {...register("description", { required: "Description is required" })} id="comment" placeholder="Leave a description..." required rows={4} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>


                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="file-upload" value="Upload Image" />
                        </div>
                        <FileInput {...register('imgFile', { required: true })} id="file-upload" />
                    </div>
                    <Button type="submit" className="bg-indigo-800">Submit</Button>
                </form>
            </div>
            <FooterDivider className="my-3" />
        </div>
    );
};

export default GotMarried;