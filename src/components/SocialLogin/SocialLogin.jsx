import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const axiosPublic = useAxiosPublic();
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        navigate('/');
                    })
            })
    }
    return (
        <div className="flex justify-center">
            <div>
                <Button outline gradientDuoTone="greenToBlue" onClick={handleGoogleSignIn} color="success">
                    <FaGoogle className="mr-3"></FaGoogle>
                    Google
                </Button>
            </div>
        </div>
    );
};

export default SocialLogin;