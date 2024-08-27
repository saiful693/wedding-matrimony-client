import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import useStory from '../../../hooks/useStory';
import { Rating } from 'flowbite-react';



const SuccessStory = () => {
    const [stories] = useStory();

    const sortedStoriesAsc = [...stories].sort((a, b) => {
        return new Date(a.marriageDate) - new Date(b.marriageDate);
    });

    return (

        <div className='min-h-[500px] shadow-xl py-20'>
            <h3 className="text-3xl mb-16 text-center  text-indigo-800 font-semibold uppercase">Happy Stories</h3>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                {sortedStoriesAsc.map(story => <SwiperSlide key={story._id}>
                    <div className="flex justify-center text-indigo-800">
                        <div className="text-center">
                            <div className="max-w-2xl">
                                <div className="avatar flex justify-center">
                                    <div className="w-96  rounded-2xl">
                                        <img className='h-96' src={story?.image} alt="Margaret Lawson" />
                                    </div>
                                </div>
                                <h1 className="text-2xl mt-2 text-indigo-800 font-bold">{story?.name}</h1>
                                <p className="text-lg font-semibold">{story?.marriageDate}</p>
                                <p className="py-6 text-gray-800">
                                    {story?.description}
                                </p>
                            </div>
                            <Rating className='justify-center font-bold'>
                                {story?.rating}
                                <Rating.Star />
                            </Rating>
                        </div>
                    </div>
                </SwiperSlide>)


                }
            </Swiper>
        </div>
    )
};

export default SuccessStory;