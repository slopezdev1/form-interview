// Components
import FormContact from "../components/FormContact"

const Home = () => {
  // Ref element
  const modal = document.getElementById('confirmationModal') as HTMLDialogElement;

  // Logic
  const executeRequest = (confirm: boolean) => {
    if(modal && confirm) {
      modal.showModal()
    } else modal.close()
  }

  const savedData = () => {
    modal.close()
    window.alert('Datos guardados con éxito')
    window.location.reload()
  }

  return (
    <>
      <div className="h-screen w-full bg-orange-200">
        <div className="flex items-center justify-center w-full h-full">
          <FormContact handleExecuteForm={executeRequest} />
        </div>
      </div>
      
      {/* TO DO: Hacer componente Dialig */}
      <dialog id="confirmationModal" className="backdrop:bg-black/50 p-8 rounded-lg w-full max-w-md mx-auto bg-white">
        <p className="text-lg text-center">¿Estás seguro que deseas guardar los datos de contacto?</p>
        <div className="flex justify-center gap-2 items-center mt-4">
          <button
            onClick={() => modal.close()}
            className="p-2 w-64 text-center rounded bg-light text-primary hover:opacity-55 mx-auto"
          >
            Cerrar
          </button>
          <button
            onClick={savedData}
            className="p-2 w-64 text-center rounded bg-primary text-light hover:opacity-85 mx-auto"          >
            Guardar
          </button>
        </div>
      </dialog>
    </>
  )
}

export default Home