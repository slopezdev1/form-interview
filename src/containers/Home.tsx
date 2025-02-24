// Components
import { useState } from "react";
import FormContainer from "./form.container";
import ConfirmationCard from "../components/confirmationAddress.component";

const Home = () => {
  const [dataForm, setDataForm] = useState({})

  // Logic
  const executeRequest = (data: any) => {
    if (!data) return
    setDataForm(data)
  }


  return (
    <>
      <div className="h-screen w-full">
        <div className="flex items-center justify-center w-full h-full">
          {
            dataForm ? (
              <ConfirmationCard />
            ) : (
              <FormContainer handleExecuteForm={executeRequest} />
            )
          }
        </div>
      </div >

    </>
  )
}

export default Home