// React
import { FormEvent, useState } from "react"

// Hooks
import { useQuery } from "@tanstack/react-query"

// Components
import InputGroup from "./shared/InputGroup"
import InputSearch from "./shared/InputSearch"

// Services
import { getCities } from "../services/cities.services"
import { getDepartments } from "../services/departments.services"
import { getLocalities } from "../services/locality,services"

// Utils Resources
import { hasObjectValue } from "../utils/hasObjectValue"

// Interfaces
import { IKeyValue, IValueForm } from "../interfaces/valueForm.interface"


interface IFormContactProps {
    handleExecuteForm: (confirm: boolean) => void
}

const FormContact: React.FC<IFormContactProps> = ({handleExecuteForm}) => {
    // states
    const [valueForm, setValueForm] = useState<IValueForm>({
        name: '',
        surname: '',
        email: '',
        country: {
            name: 'Argentina',
            id: '06'
        },
        city: {
            name: '',
            id: ''
        },
        department: {
            name: '',
            id: ''
        },
        locality: {
            name: '',
            id: ''
        },

    })

    // queries
    const { data: citiesData, isLoading } = useQuery({ queryKey: ['cities'], queryFn: getCities })
    const { data: departmentData, isFetching: isFetchingDepartmentData } = useQuery({ queryKey: ['department', valueForm.city.id], queryFn: () => getDepartments(valueForm.city.id), enabled: !!valueForm.city.id })
    const { data: localityData, isFetching: isFetchingLocalityData } = useQuery({ queryKey: ['locality', valueForm.department.id], queryFn: () => getLocalities(valueForm.department.id), enabled: !!valueForm.department.id })

    // handles
    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault()
        handleExecuteForm(hasValid())

    }

    // Logic
    const updateValueForm = (newValue: string | IKeyValue, key: keyof IValueForm) => {
        setValueForm({
            ...valueForm,
            [key]: newValue
        })
    }

    const hasValid = (): boolean => {
        return hasObjectValue(valueForm)
    }

    
    if (isLoading) return <><span className={isLoading && 'animate-pulse'}>Cargando...</span></>

    return (
        <>

            <div className="w-96 bg-primary flex flex-col gap-3 p-6 rounded-lg">
                <h1 className="text-base text-bold text-light">Contacto</h1>
                <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-3">
                    <div className="w-full grid grid-cols-2 grid-rows-1 gap-2">
                        {/* Dates */}
                        <InputGroup handleChangeInput={(event) => updateValueForm(event, 'name')} label="Nombre" keyInput="name" typeInput="text" />
                        <InputGroup handleChangeInput={(event) => updateValueForm(event, 'surname')} label="Apellido" keyInput="surname" typeInput="text" />
                    </div>
                    <InputGroup handleChangeInput={(event) => updateValueForm(event, 'email')} label="Correo electrónico" keyInput="email" typeInput="email" />

                    {/* Address */}
                    <div className="w-full grid grid-cols-2 grid-rows-1 gap-2">
                        <InputSearch
                            label="País"
                            results={[]}
                            key={'country'}
                            disabled={true}
                            value={valueForm.country.name}
                        />
                        <InputSearch
                            handleChangeInput={(event) => updateValueForm(event, 'city')}
                            label="Provincia"
                            results={citiesData && 'provincias' in citiesData ? citiesData.provincias : []}
                            key={'city'}
                            value={valueForm.city.name}
                        />
                        <InputSearch
                            handleChangeInput={(event) => updateValueForm(event, 'department')}
                            label="Departamento"
                            isFetching={isFetchingDepartmentData}
                            results={departmentData && 'departamentos' in departmentData ? departmentData.departamentos : []}
                            key={'department'}
                            value={valueForm.department.name}
                        />
                        <InputSearch
                            handleChangeInput={(event) => updateValueForm(event, 'locality')}
                            label="Localidad"
                            isFetching={isFetchingLocalityData}
                            results={localityData && 'localidades' in localityData ? localityData.localidades : []}
                            key={'locality'}
                            value={valueForm.locality.name}
                        />
                    </div>

                    <div className="w-full flex align-center justify-center mt-2">
                        <button type="submit" className="p-2 w-64 text-center rounded bg-white text-primary hover:opacity-85 mx-auto">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormContact