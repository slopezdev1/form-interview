import { nominatimApi } from "../utils/axios.client"

export const getLocationSearch = async (country?: string, city?: string) => {
    const searchUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city ?? '')}&country=${encodeURIComponent(country ?? '')}&format=json`;
    try {
        const response = await nominatimApi.get(searchUrl)
        return Promise.resolve(response.data)
    } catch (error: any | unknown) {
        return error
    }
}