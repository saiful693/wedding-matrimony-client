import { Button, Carousel } from 'flowbite-react';
import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner2.jpg';
import banner3 from '../../../assets/images/banner3.jpg';

import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="h-[70vh] ">
            <Carousel onSlideChange={(index) => console.log('onSlideChange()', index)}>
                <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner1})`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex h-full w-full text-white items-center justify-center">
                    <div className='text-center space-y-3'>
                        <h2 className='text-5xl font-bold'>Find your</h2>
                        <h1 className='text-5xl text-red-600 font-bold'>Right Match <span className='text-white'>here</span></h1>
                        <p className='text-xl'>Most trusted Matrimony Brand in the World.</p>
                        <div className='flex justify-center'>
                            <Link to="/login"><Button color="failure">Get me in</Button></Link>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner2})`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex h-full text-white items-center justify-center">
                    <div className='text-center space-y-3'>
                        <h2 className='text-5xl font-bold'>Find your</h2>
                        <h1 className='text-5xl text-red-600 font-bold'>Right Match <span className='text-white'>here</span></h1>
                        <p className='text-xl'>Most trusted Matrimony Brand in the World.</p>
                        <div className='flex justify-center'>
                            <Link to="/login"><Button color="failure">Get me in</Button></Link>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner3})`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex h-full text-white items-center justify-center">
                    <div className='text-center space-y-3'>
                        <h2 className='text-5xl font-bold'>Find your</h2>
                        <h1 className='text-5xl text-red-600 font-bold'>Right Match <span className='text-white'>here</span></h1>
                        <p className='text-xl'>Most trusted Matrimony Brand in the World.</p>
                        <div className='flex justify-center'>
                            <Link to="/login"><Button color="failure">Get me in</Button></Link>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;