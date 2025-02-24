//react
import type React from "react"

//hooks
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

//services
import { getCities } from "../services/cities.services"
import { getCountries } from "../services/countries.services"
//resources
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { formattedCity } from "../utils/formattedCity"

// Components
import InputGroup from "./shared/InputGroup"
import InputSearch from "./shared/InputSearch"

//Interfaces
import { IValueForm } from "../interfaces/valueForm.interface"
interface IFormComponentProps {
  handleSendData: (value: IValueForm) => void
}

const FormComponent: React.FC<IFormComponentProps> = (props: IFormComponentProps) => {
  const { t } = useTranslation()

  const schema = yup.object().shape({
    name: yup.string().required(t("fieldRequired")),
    surname: yup.string().required(t("fieldRequired")),
    email: yup.string().email(t("emailInvalid")).required(t("fieldRequired")),
    country: yup.string().required(t("fieldRequired")),
    city: yup.string().required(t("fieldRequired")),
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      country: undefined,
      city: undefined,
    },
  })

  const { data: countriesData, isFetching: isFetchingCountry } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries
  })
  const { data: citiesData, isFetching: isFetchingCity } = useQuery({
    queryKey: ["cities", watch("country")],
    queryFn: () => getCities(watch("country")),
    enabled: !!watch("country"),
  })

  const onSubmit = (data: IValueForm) => {
    props.handleSendData(data)
  }

  return (
    <div className="min-h-screen relative  via-orange-100/50 to-orange-50 p-6 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-2xl backdrop-blur-xl bg-gradient-to-br from-white/80 to-orange-50/90 rounded-xl shadow-lg shadow-orange-200/30 p-8 space-y-6 relative border border-orange-100/50">
        {false ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-pulse text-orange-600">{t('loading')}</div>
          </div>
        ) : (
          <>
            <div className="space-y-2 relative">
              <h3 className="text-2xl font-medium bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {t('titleForm')}
              </h3>
              <p className="text-sm text-orange-600/80">{t('subTitleForm')}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup
                  label={t("nameField")}
                  name="name"
                  typeInput="text"
                  error={errors.name?.message}
                  value={watch('name')}
                  onSetValue={(newValue: string) => setValue('name', newValue)}
                />

                <InputGroup
                  label={t("surnameField")}
                  name="surname"
                  typeInput="text"
                  error={errors.surname?.message}
                  value={watch('surname')}
                  onSetValue={(newValue: string) => setValue('surname', newValue)}
                />
              </div>

              <InputGroup
                label={t("emailField")}
                name="email"
                typeInput="email"
                error={errors.email?.message}
                value={watch('email')}
                onSetValue={(newValue: string) => setValue('email', newValue)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputSearch
                  label={t("countryField")}
                  name="country"
                  results={countriesData as any}
                  isFetching={isFetchingCountry}
                  error={errors.country?.message}
                  value={watch('country')}
                  onSetValue={(newValue: string) => setValue('country', newValue)}
                />

                <InputSearch
                  label={t("cityField")}
                  name="city"
                  results={citiesData}
                  isFetching={isFetchingCity}
                  error={errors.city?.message}
                  value={watch('city')}
                  onSetValue={(newValue: string) => setValue('city', formattedCity(newValue))}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-4 py-3 text-sm font-medium hover:from-orange-600 hover:to-orange-700 shadow-sm shadow-orange-200/50"
              >
                {t("confirm")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default FormComponent

