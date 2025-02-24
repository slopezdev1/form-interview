import { ITemplateError } from "../interfaces/templateError.interface"
import { nominatimApi } from "../utils/axios.client"

export const getLocationSearch = async (query: string) => {
    const encodedQuery = encodeURIComponent(query)
    try {
        const response = await nominatimApi.get(`search?q=${encodedQuery}&format=json&limit=5`)
        return Promise.resolve(response.data)
    } catch (error: ITemplateError | unknown) {
        return error as ITemplateError
    }
}