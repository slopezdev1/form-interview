import { axiosInstance } from "../utils/axios.client"

export const getCountries = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get("countries/positions")
        return Promise.resolve(response.data.data)
    } catch (error: any | unknown) {
        return error
    }
}