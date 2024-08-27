import Banner from "../Banner/Banner";
import HowWork from "../HowWork/HowWork";
import PremiumProfile from "../PremiumProfile/PremiumProfile";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStory from "../SuccessStory/SuccessStory";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PremiumProfile></PremiumProfile>
            <HowWork></HowWork>
            <SuccessCounter></SuccessCounter>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;