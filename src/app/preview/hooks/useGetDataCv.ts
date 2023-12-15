import { QUERY_KEYS } from "@/common/constants/queryKeys.constant";
import { useQuery } from "react-query";
import { getDataCv } from "../service";
import { DataTypeGetDataCv } from "../interfaces";
export const useGetDataCv = (id:DataTypeGetDataCv) => {
    const {
        data: dataList,
        isLoading: isLoadingGetData,
        refetch: refetchData,
    } = useQuery([QUERY_KEYS.GET_DATA_CV], () => getDataCv(id), {
        cacheTime: 0,
    });
    return {
        dataList,
        isLoadingGetData,
        refetchData,
    };
};
