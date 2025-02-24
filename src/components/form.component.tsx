import type React from "react"

// Hooks
import { type FieldError, useForm } from "react-hook-form"

// Components
import InputGroup from "./shared/InputGroup"
import InputSearch from "./shared/InputSearch"

// Utils Resources
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTranslation } from "react-i18next"

//Interfaces
interface IFormComponentProps {
  handleExecuteForm: (confirm: boolean) => void
  countries: Array<any>,
  cities: Array<any>,
  localities: Array<any>
}



const FormComponent: React.FC<IFormComponentProps> = (props: IFormComponentProps) => {

  const { t } = useTranslation()

  const schema = yup.object().shape({
    name: yup.string().required(t("fieldRequired")),
    surname: yup.string().required(t("fieldRequired")),
    email: yup.string().email(t("emailInvalid")).required(t("fieldRequired")),
    country: yup.object().shape({
      name: yup.string().required(t("fieldRequired")),
      id: yup.string().required(),
    }),
    city: yup.object().shape({
      name: yup.string().required(t("fieldRequired")),
      id: yup.string().required(),
    }),
    locality: yup.object().shape({
      name: yup.string().required(t("fieldRequired")),
      id: yup.string().required(),
    }),
  })

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
      locality: { name: "", id: "" },
    },
  })

  // handles
  const onSubmit = (data: any) => {
    console.log("Datos enviados:", data)
    props.handleExecuteForm(true)
  }

  return (


    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup
          label="Nombre"
          keyInput="name"
          typeInput="text"
          control={register("name")}
          error={errors.name as FieldError}
          className="space-y-1.5"
          labelClassName="text-sm font-medium text-orange-800 block"
          inputClassName="w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300"
        />

        <InputGroup
          label="Apellido"
          keyInput="surname"
          typeInput="text"
          control={register("surname")}
          error={errors.surname as FieldError}
          className="space-y-1.5"
          labelClassName="text-sm font-medium text-orange-800 block"
          inputClassName="w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300"
        />
      </div>

      {/* Email */}
      <InputGroup
        label="Correo electrónico"
        keyInput="email"
        typeInput="email"
        control={register("email")}
        error={errors.email as FieldError}
        className="space-y-1.5"
        labelClassName="text-sm font-medium text-orange-800 block"
        inputClassName="w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300"
      />

      {/* Ubicación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputSearch
          label="País"
          name="country"
          results={props.countries}
          disabled={true}
          setValue={setValue}
          defaultValue={watch("country").name}
          error={errors.country as FieldError}
          className="space-y-1.5"
          labelClassName="text-sm font-medium text-orange-800 block"
          inputClassName="w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300"
        />

        <InputSearch
          label="Provincia"
          name="city"
          results={props.cities}
          setValue={setValue}
          defaultValue={watch("city").name}
          error={errors.city?.name as FieldError}
          className="space-y-1.5"
          labelClassName="text-sm font-medium text-orange-800 block"
          inputClassName="w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300"
        />

        <InputSearch
          label="Localidad"
          name="locality"
          results={props.localities}
          setValue={setValue}
          defaultValue={watch("locality").name}
          error={errors.locality?.name as FieldError}
          isFetching={false}
          className="space-y-1.5 w-full"
          labelClassName="text-sm font-medium text-orange-800 block"
          inputClassName="w-full px-3.5 py-2.5 border-2 border-orange-200 rounded-lg bg-white/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors placeholder:text-orange-300"
        />
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-4 py-3 text-sm font-medium hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-200 transition-all duration-200 shadow-sm shadow-orange-200/50"
      >
        Confirmar
      </button>
    </form>
  )
}

export default FormComponent

