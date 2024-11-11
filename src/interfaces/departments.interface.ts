import { ITemplateResponse } from "./templateResponse.interface";

export interface IDepartments extends ITemplateResponse {
    departamentos: Array<{
        centroide_lat: string,
        centroide_long: string,
        id: string,
        nombre: string,
        provincia_id: string,
        provincia_nombre: string
    }>
}