import type React from "react"
// Hooks
import { useQuery } from "@tanstack/react-query"

// Components

// Services
import { getCities } from "../services/cities.services"
import { getDepartments } from "../services/departments.services"
import { getLocalities } from "../services/locality.services"

// Utils Resources
import { useTranslation } from "react-i18next"
import FormComponent from "../components/form.component"

//Interfaces
interface IFormContainerProps {
    handleExecuteForm: (confirm: boolean) => void
}

const FormContainer: React.FC<IFormContainerProps> = (props: IFormContainerProps) => {

    // hook
    const { t } = useTranslation()

    // // queries
    // const { data: citiesData, isLoading } = useQuery({
    //     queryKey: ["cities"],
    //     queryFn: getCities,
    // })
    // const { data: departmentData, isFetching: isFetchingDepartmentData } = useQuery({
    //     queryKey: ["department", watch("city.id")],
    //     queryFn: () => getDepartments(watch("city.id")),
    //     enabled: !!watch("city.id"),
    // })
    // const { data: localityData, isFetching: isFetchingLocalityData } = useQuery({
    //     queryKey: ["locality", watch("department.id")],
    //     queryFn: () => getLocalities(watch("department.id")),
    //     enabled: !!watch("department.id"),
    // })


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

                        <FormComponent
                            countries={[]}
                            cities={[]}
                            localities={[]}
                            handleExecuteForm={() => {}}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default FormContainer

