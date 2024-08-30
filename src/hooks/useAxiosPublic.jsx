import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://wedding-matrimony-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;