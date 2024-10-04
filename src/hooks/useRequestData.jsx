import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";
import { useEffect, useState } from "react";


const useRequestData = () => {
    const axiosPublic = useAxiosPublic();
    const [userDb] = useUser();
    const [filterData, setFilterData] = useState([]);

    const { data: requestData = [], refetch } = useQuery({
        queryKey: ['requestData', userDb?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contact/${userDb?.email}`);
            return res.data;
        }
    })


    const fetchData = async () => {
        const bioDataIds = requestData.map(data => data.bioDataId).join(',');
        const queryParams = new URLSearchParams();

        if (bioDataIds) {
            queryParams.append('ids', bioDataIds);
        }

        try {
            const response = await axiosPublic.get('/biodatas', { params: queryParams });
            // console.log(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error('Error fetching biodatas:', error);
        }
    };

    useEffect(() => {
        if (requestData?.length > 0) {
            fetchData();
        }
    }, [requestData]);

    return [requestData, filterData, refetch]
};

export default useRequestData;