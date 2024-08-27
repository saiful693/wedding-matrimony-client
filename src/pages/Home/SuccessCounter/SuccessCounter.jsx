import useBioData from '../../../hooks/useBioData';
import useStory from '../../../hooks/useStory';


import './SuccessCounter.css'
const SuccessCounter = () => {

    const [bioData,] = useBioData();
    const [stories] = useStory();
    const male = bioData.filter((data) => data.biodataType === "Male");
    const female = bioData.filter((data) => data.biodataType === "Female");

    return (
        <div className="featured-item bg-fixed bg-cover pt-20 my-32 text-white">
            {/* <SectionTitle mainHeading="Success Counter"></SectionTitle> */}
            <h1 className='text-4xl font-semibold text-center'>Success Counter</h1>
            <p className='text-center my-2'> As our numerous success stories prove, marriages are really made at Jeevansathi.com. <br /> Heres wishing all our members who found their ideal partner here a lifetime of happiness!</p>
            <div className='shadow-2xl flex text-white mt-20 h-[50vh]'>
                <div className='flex justify-center w-80'>
                    <div>
                        <div className="flex items-center justify-center w-48 h-48 border border-indigo-800 rounded-full">
                            <span className=" text-3xl font-bold">{bioData.length}</span>
                        </div>
                        <p className='text-center font-semibold text-xl mt-5'>Total BioData</p>
                    </div>
                </div>

                <div className='flex justify-center w-80'>
                    <div>
                        <div className="flex items-center justify-center w-48 h-48 border border-indigo-800 rounded-full">
                            <span className=" text-3xl  font-bold">{male.length}</span>
                        </div>
                        <p className='text-center font-semibold text-xl mt-5'>Male BioData</p>
                    </div>
                </div>
                <div className='flex justify-center w-80'>
                    <div>
                        <div className="flex items-center justify-center w-48 h-48 border border-indigo-800 rounded-full">
                            <span className=" text-3xl font-bold">{female.length}</span>
                        </div>
                        <p className='text-center font-semibold text-xl mt-5'>Female BioData</p>
                    </div>
                </div>
                <div className='flex justify-center w-80'>
                    <div>
                        <div className="flex items-center justify-center w-48 h-48 border border-indigo-800 rounded-full">
                            <span className="text-3xl font-bold">{stories.length}</span>
                        </div>
                        <p className='text-center font-semibold text-xl mt-5'>Success Story</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SuccessCounter;