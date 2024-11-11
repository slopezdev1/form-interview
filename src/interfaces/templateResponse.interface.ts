export interface ITemplateResponse {
    cantidad: number,
    inicio: number,
    parametros: IParamsResponse,
    total: number
}
export interface IParamsResponse {
    aplanar: boolean,
    campos: Array<string>
    formato: EFormat,
    max: number,
    orden: string
}
export type EFormat = {
    JSON: 'json',
    CSV: 'csv',
    GEOJSON: 'geojson',
    XML: 'xml'
}