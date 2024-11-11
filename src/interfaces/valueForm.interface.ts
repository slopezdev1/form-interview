export interface IValueForm {
    name: string,
    surname: string,
    email: string,
    country: IKeyValue,
    city: IKeyValue,
    department: IKeyValue
    locality: IKeyValue
}
export interface IKeyValue {
    id: string,
    name: string
}