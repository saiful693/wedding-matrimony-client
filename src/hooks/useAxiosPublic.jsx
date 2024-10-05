import axios from "axios";


// https://wedding-matrimony-server.vercel.app

const axiosPublic = axios.create({
    baseURL: 'https://wedding-matrimony-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;