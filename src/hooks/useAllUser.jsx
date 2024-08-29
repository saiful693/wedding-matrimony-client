
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllUser = () => {
    const axiosPublic = useAxiosPublic();
    const { data: userAll = [], refetch } = useQuery({
        queryKey: ['userAll'],
        queryFn: async () => {
            const res = await axiosPublic.get(`users/`);
            return res.data;
        }
    })
    return [userAll, refetch]
};

export default useAllUser;