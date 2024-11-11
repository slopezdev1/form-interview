import { ICities } from "../interfaces/cities.interface";
import { ITemplateError } from "../interfaces/templateError.interface";
import { axiosInstance } from "../utils/axios.client";


export const getCities = async (): Promise<ICities | ITemplateError> => {
    try {
        const response: any = await axiosInstance.get<ICities>("provincias", {
            params: {
                orden: 'nombre',
                aplanar: true,
                campos: 'estandar',
                max: 100,
                formato: 'json'
            }
        })
        return Promise.resolve(response.data as ICities)
    } catch (error: ITemplateError | unknown) {
        return error as ITemplateError
    }
}