import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import signUpImg from '../../../assets/images/signUp.png'
import connectImg from '../../../assets/images/connect.png'
import interactImg from '../../../assets/images/interact.png'


const HowWork = () => {
    return (
        <div className="my-16">
            <SectionTitle subHeading="When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible." mainHeading="How It Works"></SectionTitle>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="flex items-center justify-between border p-10 border-[#6d6e6f]">
                    <div>
                        <h1 className="font-semibold text-[#dc3545] text-3xl">1</h1>
                        <h3 className="text-[#730202] text-2xl font-semibold">Sign up</h3>
                        <p className="text-[#6d6e6f] font-medium">Register for free & put <br /> up your Profile</p>
                    </div>
                    <div>
                        <img src={signUpImg} alt="" />
                    </div>
                </div>


                <div className="flex items-center justify-between border p-10 border-[#6d6e6f]">
                    <div>
                        <h1 className="font-semibold text-[#dc3545] text-3xl">2</h1>
                        <h3 className="text-[#730202] text-2xl font-semibold">Connect</h3>
                        <p className="text-[#6d6e6f] font-medium">Select & Connect with <br /> Matches you like</p>
                    </div>
                    <div>
                        <img src={connectImg} alt="" />
                    </div>
                </div>


                <div className="flex items-center gap-3 justify-between border p-10 border-[#6d6e6f]">
                    <div>
                        <h1 className="font-semibold text-[#dc3545] text-3xl">3</h1>
                        <h3 className="text-[#730202] text-2xl font-semibold">Interact</h3>
                        <p className="text-[#6d6e6f] font-medium">Become a Premium Member &  Start a Conversation</p>
                    </div>
                    <div>
                        <img src={interactImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowWork;