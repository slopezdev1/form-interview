export interface ITemplateError {
    errores: Array<IError>
}
export interface IError {
    ayuda: Array<IHelp>,
    codigo_interno: string,
    mensaje: string,
    nombre_parametro: string,
    ubicacion: string
}
export interface IHelp {
    provincia: string,
    municipio: string,
    departamento: string
}