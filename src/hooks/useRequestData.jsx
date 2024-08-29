import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";


const useRequestData = () => {
    const axiosPublic = useAxiosPublic();
    const [userDb] = useUser();

    const { data: requestData = [], refetch } = useQuery({
        queryKey: ['requestData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contact/${userDb?.email}`);
            return res.data;
        }
    })

    return [requestData, refetch]
};

export default useRequestData;