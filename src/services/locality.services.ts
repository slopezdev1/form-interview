import { ILocalities } from "../interfaces/localities.interface";
import { ITemplateError } from "../interfaces/templateError.interface";
import { axiosInstance } from "../utils/axios.client";


export const getLocalities = async (departmentID: string): Promise<ILocalities | ITemplateError> => {
    try {
        const response: any = await axiosInstance.get<ILocalities>("localidades", {
            params: {
                departamento: departmentID,
                orden: 'nombre',
                aplanar: true,
                campos: 'estandar',
                max: 10,
                formato: 'json'
            }
        })
        return Promise.resolve(response.data as ILocalities)
    } catch (error: ITemplateError | unknown) {
        return error as ITemplateError
    }
}