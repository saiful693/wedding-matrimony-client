import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {

    const handleGoogleSignIn = () => {
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