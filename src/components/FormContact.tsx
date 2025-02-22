// Hooks
import { useQuery } from "@tanstack/react-query"
import { FieldError, useForm } from "react-hook-form";

// Components
import InputGroup from "./shared/InputGroup"
import InputSearch from "./shared/InputSearch"

// Services
import { getCities } from "../services/cities.services"
import { getDepartments } from "../services/departments.services"
import { getLocalities } from "../services/locality,services"

// Utils Resources
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Interfaces
interface IFormContactProps {
    handleExecuteForm: (confirm: boolean) => void
}

const schema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    surname: yup.string().required("El apellido es obligatorio"),
    email: yup.string().email("Email inválido").required("El email es obligatorio"),
    country: yup.object().shape({
        name: yup.string().required("Selecciona un país"),
        id: yup.string().required(),
    }),
    city: yup.object().shape({
        name: yup.string().required("Selecciona una provincia"),
        id: yup.string().required(),
    }),
    department: yup.object().shape({
        name: yup.string().required("Selecciona un departamento"),
        id: yup.string().required(),
    }),
    locality: yup.object().shape({
        name: yup.string().required("Selecciona una localidad"),
        id: yup.string().required(),
    }),
});

const FormContact: React.FC<IFormContactProps> = (props: IFormContactProps) => {

    // hook
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "ds",
            surname: "",
            email: "",
            country: { name: "Argentina", id: "06" },
            city: { name: "", id: "" },
            department: { name: "", id: "" },
            locality: { name: "", id: "" },
        },
    });

    // queries
    const { data: citiesData, isLoading } = useQuery({ queryKey: ['cities'], queryFn: getCities })
    const { data: departmentData, isFetching: isFetchingDepartmentData } = useQuery({ queryKey: ['department', watch("city.id")], queryFn: () => getDepartments(watch("city.id")), enabled: !!watch("city.id") })
    const { data: localityData, isFetching: isFetchingLocalityData } = useQuery({ 
        queryKey: ['locality', watch("department.id")], 
        queryFn: () => getLocalities(watch("department.id")), 
        enabled: !!watch("department.id") 
    })

    // handles
    const onSubmit = (data: any) => {
        console.log("Datos enviados:", data);
        props.handleExecuteForm(true);
    };

    if (isLoading) return <><span className={isLoading && 'animate-pulse'}>Cargando...</span></>

    return (
        <>

            <div className="w-96 bg-primary flex flex-col gap-3 p-6 rounded-lg">
                <h1 className="text-base text-bold text-light">Contacto</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
                    <div className="w-full grid grid-cols-2 grid-rows-1 gap-2">
                        {/* Dates */}
                        <InputGroup
                            label="Nombre"
                            keyInput="name"
                            typeInput="text"
                            control={register("name")}
                            error={errors.name as FieldError}
                        />

                        <InputGroup
                            label="Apellido"
                            keyInput="surname"
                            typeInput="text"
                            control={register("surname")}
                            error={errors.surname as FieldError}
                        />
                    </div>

                    <InputGroup
                        label="Correo electrónico"
                        keyInput="email"
                        typeInput="email"
                        control={register("email")}
                        error={errors.email as FieldError}
                    />

                    {/* Address */}
                    <div className="w-full grid grid-cols-2 grid-rows-1 gap-2">

                        <InputSearch
                            label="País"
                            name="country"
                            results={[]}
                            disabled={true}
                            setValue={setValue}
                            defaultValue={watch('country').name}
                            error={errors.country as FieldError}
                        />

                        <InputSearch
                            label="Provincia"
                            name="city" 
                            results={citiesData && 'provincias' in citiesData ? citiesData.provincias : []}
                            setValue={setValue}
                            defaultValue={watch('city').name}
                            error={errors.city?.name as FieldError}
                        />

                        <InputSearch
                            label="Departamento"
                            name="department"
                            results={departmentData && 'departamentos' in departmentData ? departmentData.departamentos : []}
                            setValue={setValue}
                            defaultValue={watch('department').name}
                            error={errors.department?.name as FieldError} 
                            isFetching={isFetchingDepartmentData}
                        />

                        <InputSearch
                            label="Localidad"
                            name="locality"
                            results={localityData && 'localidades' in localityData ? localityData.localidades : []}
                            setValue={setValue}
                            defaultValue={watch('locality').name}
                            error={errors.locality?.name as FieldError}
                            isFetching={isFetchingLocalityData}
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