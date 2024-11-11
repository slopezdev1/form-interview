import { ITemplateResponse } from "./templateResponse.interface";

export interface ICities extends ITemplateResponse {
    provincias: Array<{
        centroide_lat: number,
        centroide_long: number,
        id: string,
        nombre: string
    }>
}