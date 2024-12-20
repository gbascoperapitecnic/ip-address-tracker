import { useEffect, useState } from "react"
import TrackerInfo from "./components/TrackerInfo"
import TrackerInput from "./components/TrackerInput"
import './App.css'
import TrackerGeoMap from "./components/TrackerGeoMap"


function App() {
// El usuario ha de ver su ip y ver el mapa con un icono en la primera carga de la pagina
//también puede buscar cualquier ip o dominio y mostrar su info

  const [isSearching, setIsSearching] = useState(false)
  const [searchingInfo, setSearchingInfo] = useState("")
  const [data, setData] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    // llamar a geo ipify api    
    fetchTrackerInfo(isSearching)


  }, [isSearching, searchingInfo])



  // TODO: COMPROBAR SI ES UN DOMINIO O IP, Y VALIDAR CUALQUIER QUE SEA, ahora solo busca por ip
  // const isDomain = () => {

  // }

  // const isIp = () => {

  // }

  const fetchTrackerInfo = async (isSearching) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}${isSearching ?`&ipAddress=${searchingInfo}` :''}`) 
      const data = await response.json()

      // parametro domain= --> si el usuario busca por dominio

      setData(data)

    } catch (error) {
      console.log(error) 
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="border h-full z-10 relative">
        <div className="p-8" id="bg-pattern-top">
          <section className="p-2 max-w-[80rem] flex items-center justify-center flex-col mx-auto gap-3">
            <h1 className="text-3xl font-semibold text-white">IP Address Tracker</h1>
            <TrackerInput 
              setIsSearching={setIsSearching}
              setSearchingInfo={setSearchingInfo}
            />
          </section>
          
          <TrackerInfo
            data={data}
            isLoading={isLoading}
          />
        </div>

      </section>
      <div className="border h-[650px] z-0">
        {isLoading && (
          <div className="w-100 text-center h-full flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
        {data && (
          <TrackerGeoMap
            data={data}
          />
        )}
      </div>

    </>
  )
}

export default App



