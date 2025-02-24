import { ICities } from "../interfaces/cities.interface";
import { axiosInstance } from "../utils/axios.client";


export const getCities = async (countryName: string): Promise<any> => {
    try {
        const response: any = await axiosInstance.post<ICities>("countries/states", {
            country: countryName
        })
        return Promise.resolve(response.data.data.states)
    } catch (error: any | unknown) {
        return error
    }
}