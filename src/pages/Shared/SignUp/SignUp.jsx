import login3 from '../../../assets/images/login3.png'
import login1 from '../../../assets/images/login1.png'
import login2 from '../../../assets/images/login2.png'
import login4 from '../../../assets/images/login4.png'
import '../Login/login.css'
import { Helmet } from 'react-helmet-async'
import { Button, FooterDivider, Label, TextInput } from 'flowbite-react'
import SocialLogin from '../../../components/SocialLogin/SocialLogin'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/useAxiosPublic'

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();


    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                // console.log(result.user)
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // create user in database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                                else {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "error",
                                        title: `${res.data.message}`,
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })

                    })
                    .catch(error => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: `${error} occurs during signUP`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error} occurs during signUP`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <>
            <div className="overflow-hidden">
                <Helmet>
                    <title>AdventureMap | Log In</title>
                </Helmet>
                <h2 className="text-2xl md:text-4xl font-medium text-center mt-20 mb-2 text-indigo-800">Create your Account</h2>
                <p className="font-medium  text-center text-indigo-800">Find your mate with us!</p>
                <div className="flex flex-col md:flex-row shadow-2xl rounded-xl mx-auto my-10  size-4/5">
                    <div className="overflow-hidden main relative md:w-5/12 px-20 pt-20 bg-[#f8e2a2]">
                        <h2 className="text-4xl text-[#66451c] font-medium mb-2">Now</h2>
                        <p className="font-extrabold text-[#66451c] text-6xl ml-1 mb-4">Find <br /> your life partner</p>
                        <p className="text-4xl text-[#66451c] font-medium ml-1">Easy and fast.</p>
                        <img className="w-72 absolute bottom-0 transform translate-y-1/2" src={login4} alt="" />
                        <img className="w-full absolute bottom-0 left-0 transform" src={login3} style={{
                            animation: 'moveImage 6s linear infinite'
                        }} />

                    </div>
                    <div className=" flex-1 px-20 py-6">
                        {/* <h2 className="text-2xl font-semibold">We always love to see you</h2> */}
                        <h2 className="text-2xl font-semibold">Sign up to Niqah</h2>
                        <p className="font-medium text-sm">Already a member?<Link to="/login" className="text-blue-600">Sign in now</Link> </p>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-3">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Your Name" />
                                    </div>
                                    <TextInput {...register("name", { required: true })} id="name" type="text" name="name" placeholder="Name" />
                                    {errors.name && <span className='text-red-500'>Name field is required</span>}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="photo" value="Photo URL" />
                                    </div>
                                    <TextInput {...register("photo", { required: true })} id="photo" type="text" name="photo" placeholder="Photo URL" />
                                    {errors.photo && <span className='text-red-500'>photoURL field is required</span>}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email1" value="Your email" />
                                    </div>
                                    <TextInput  {...register("email", { required: true })} id="email1" type="email" name="email" placeholder="Email" />
                                    {errors.email && <span className='text-red-500'>Email field is required</span>}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password1" value="Your password" />
                                    </div>
                                    <TextInput {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 15,
                                        pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/
                                    })} id="password1" name="password" type="password" />
                                    {errors.password?.type === 'required' && <span className='text-red-500'>Password field is required</span>}
                                    {errors.password?.type === 'minLength' && <span className='text-red-500'>Password must be 6 character</span>}
                                    {errors.password?.type === 'maxLength' && <span className='text-red-500'>Password must be less then 15 character</span>}
                                    {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must have one Uppercase, one Lowercase, one number and one special character</span>}
                                </div>
                                <Button type="submit" className="bg-indigo-800">Submit</Button>
                            </form>
                            <FooterDivider className="my-3" />
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>



            </div>
            <img className="absolute hidden lg:block -left-1/3 rotate-45 bottom-0" src={login1} alt="" />
            <img className="absolute hidden lg:block right-0 bottom-0" src={login2} alt="" />

        </>
    );
};

export default SignUp;