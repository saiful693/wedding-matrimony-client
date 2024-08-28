import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";

const useSpecificData = () => {
    const axiosPublic = useAxiosPublic();
    const [userDb] = useUser();

    const { data: dataOne = [], refetch } = useQuery({
        queryKey: ['dataOne'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas/user/${userDb._id}`);
            return res.data;
        },
    });


    return [dataOne, refetch]
};

export default useSpecificData;