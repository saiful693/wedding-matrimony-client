import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";
import { useEffect, useState } from "react";


const useSpecificData = () => {
    const axiosPublic = useAxiosPublic();
    const [userDb] = useUser();
    const [specificData, setSpecificData] = useState(null);

    const { data: dataOne = [], refetch } = useQuery({
        queryKey: ['dataOne'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas/${userDb._id}`);
            return res.data;
        },
    });
    useEffect(() => {
        if (dataOne) {
            setSpecificData(dataOne);
        }
    }, [dataOne, userDb]);

    return [specificData, setSpecificData, refetch]
};

export default useSpecificData;