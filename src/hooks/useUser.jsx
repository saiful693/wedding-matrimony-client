import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useUser = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: userDb = [] } = useQuery({
        queryKey: ['userDb'],
        queryFn: async () => {
            const res = await axiosPublic.get(`users/${user?.email}`);
            return res.data;
        }
    })
    return [userDb]
};

export default useUser;