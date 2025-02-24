//React
import { useState } from "react";

// Components
import ConfirmationCard from "../components/confirmationAddress.component";
import FormComponent from "../components/form.component";

//Hooks
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

//Services
import { getLocationSearch } from "../services/searchLocation.services";

//Interfaces
import { IValueForm } from "../interfaces/valueForm.interface";

const Home = () => {
  const { t } = useTranslation()

  const [dataForm, setDataForm] = useState<IValueForm>()
  const [isViewMap, setIsViewMap] = useState<boolean>(false)
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  const { data: locationData, isFetching } = useQuery({
    queryKey: ['searchLocation', dataForm],
    queryFn: () => getLocationSearch(dataForm?.country, dataForm?.city),
    enabled: !!dataForm?.city
  })

  const executeRequest = (data: IValueForm) => {
    if (!data) return
    setDataForm(data)
    setIsViewMap(true)
  }

  if (isConfirm) return (
    <>
      <div className="w-full h-screen">
        <div className="flex items-center justify-center flex-col w-full h-full">
          <h1> {t("success")} </h1>
          <button
            onClick={() => window.location.reload()}
            className="w-max mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-4 py-3 text-sm font-medium hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-200 transition-all duration-200 shadow-sm shadow-orange-200/50"
          >
            {t("reload")}
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="h-screen w-full">
        <div className="flex items-center justify-center w-full h-full">
          {
            isViewMap ? (
              <ConfirmationCard handleConfirm={() => setIsConfirm(true)} isLoading={isFetching} lat={Number(locationData?.length > 0 ? locationData[0].lat : locationData?.lat)} lang={Number(locationData?.length > 0 ? locationData[0].lon : locationData?.lon)} handleClose={() => setIsViewMap(false)} />
            ) : (
              <FormComponent handleSendData={executeRequest} />
            )
          }
        </div>
      </div >

    </>
  )
}

export default Home