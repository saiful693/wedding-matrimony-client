import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useSpecificData = () => {
    const axiosPublic = useAxiosPublic();
    const [userDb] = useUser();

    const { data: specificData = [], refetch } = useQuery({
        queryKey: ['specificData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas/${userDb._id}`);
            return res.data;
        }
    })

    return [specificData, refetch]
};

export default useSpecificData;