import { ITemplateResponse } from "./templateResponse.interface"

export interface ILocalities extends ITemplateResponse {
    localidades: Array<{
        categoria: string,
        centroide_lat: number,
        centroide_long: number,
        departamento_id: string,
        departamento_nombre: string,
        id: string,
        localidad_censal_id: string,
        localidad_censal_nombre: string,
        municipio_id: string,
        municipio_nombre: string,
        nombre: string,
        provincia_id: string,
        provincia_nombre: string
    }>
}