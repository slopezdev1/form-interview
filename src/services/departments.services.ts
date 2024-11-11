import { IDepartments } from "../interfaces/departments.interface";
import { ITemplateError } from "../interfaces/templateError.interface";
import { axiosInstance } from "../utils/axios.client";


export const getDepartments = async (cityID: string): Promise<IDepartments | ITemplateError> => {
    try {
        const response: any = await axiosInstance.get<IDepartments>("departamentos", {
            params: {
                provincia: cityID,
                aplanar: true,
                campos: 'estandar',
                max: 100,
                formato: 'json'
            }
        })
        return Promise.resolve(response.data as IDepartments)
    } catch (error: ITemplateError | unknown) {
        return error as ITemplateError
    }
}