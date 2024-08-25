import { Helmet } from "react-helmet-async";
import login3 from '../../../assets/images/login3.png'
import login1 from '../../../assets/images/login1.png'
import login2 from '../../../assets/images/login2.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, FooterDivider, Label, TextInput } from "flowbite-react";
import login4 from '../../../assets/images/login4.png'
import './login.css'
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";




const Login = () => {

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.elements.email.value;
        console.log(email)
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    icon: "success",
                    title: "User Login Successfully",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true })

            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error}`,
                });
            })
    }
    return (
        <>
            <div className="overflow-hidden">
                <Helmet>
                    <title>AdventureMap | Log In</title>
                </Helmet>
                <h2 className="text-4xl font-medium text-center mt-20 mb-2 text-indigo-800">Welcome Back!</h2>
                <p className="font-medium text-md text-center text-indigo-800">World number #1 matrimony site</p>
                <div className="flex shadow-2xl rounded-xl mx-auto my-10  size-4/5">
                    <div className="overflow-hidden main relative w-5/12  px-20 pt-20 bg-[#f8e2a2]">
                        <h2 className="text-4xl text-[#66451c] font-medium mb-2">Now</h2>
                        <p className="font-extrabold text-[#66451c] text-6xl ml-1 mb-4">Find <br /> your life partner</p>
                        <p className="text-4xl text-[#66451c] font-medium ml-1">Easy and fast.</p>
                        <img className="w-72 absolute bottom-0 transform translate-y-1/2" src={login4} alt="" />
                        <img className="w-full absolute bottom-0 left-0 transform" src={login3} style={{
                            animation: 'moveImage 6s linear infinite'
                        }} />

                    </div>
                    <div className=" flex-1  px-20 py-14">
                        {/* <h2 className="text-2xl font-semibold">We always love to see you</h2> */}
                        <h2 className="text-2xl font-semibold">Sign in to Niqah</h2>
                        <p className="font-medium text-sm">Not a member?<Link to="/signUp" className="text-blue-600">Sign up now</Link> </p>
                        <div className="mt-10">
                            <form onSubmit={handleLogin} className="flex max-w-md flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email1" value="Your email" />
                                    </div>
                                    <TextInput id="email1" type="email" name="email" placeholder="Email" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password1" value="Your password" />
                                    </div>
                                    <TextInput id="password1" placeholder="password" name="password" type="password" required />
                                </div>
                                <Button type="submit" className="bg-indigo-800">Submit</Button>
                                {/* <TextInput className="bg-indigo-800" type="submit" value="Login" /> */}
                            </form>
                            <FooterDivider className="my-6" />
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>



            </div>
            <img className="absolute md:hidden lg:block -left-1/3 rotate-45 bottom-0" src={login1} alt="" />
            <img className="absolute md:hidden lg:block right-0 bottom-0" src={login2} alt="" />

        </>



    );
};

export default Login;