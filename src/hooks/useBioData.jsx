import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBioData = () => {
    const axiosPublic = useAxiosPublic();

    const { data: bioData = [], refetch } = useQuery({
        queryKey: ['bioData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodatas');
            return res.data;
        }
    })

    return [bioData, refetch]
};

export default useBioData;