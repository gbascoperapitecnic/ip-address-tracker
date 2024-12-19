import { useEffect, useState } from "react"
import TrackerInfo from "./components/TrackerInfo"
import TrackerInput from "./components/TrackerInput"
import './App.css'


function App() {
// El usuario ha de ver su ip y ver el mapa con un icono en la primera carga de la pagina
//también puede buscar cualquier ip o dominio y mostrar su info

  const [isSearching, setIsSearching] = useState(false)
  const [searchingInfo, setSearchingInfo] = useState("")
  const [data, setData] = useState(null)

  const key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    // llamar a geo ipify api    
    // fetchTrackerInfo(isSearching)
    if (isSearching) {
      console.log("buscando")
    }else{
      console.log("cargando")
    }

  }, [isSearching])


  const fetchTrackerInfo = async (isSearching) => {
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}${isSearching ?`&ipAddress=${searchingInfo}` :''}`) 
      const data = await response.json()

      setData(data)
      console.log(data)

    } catch (error) {
      console.log(error) 
    }
  }

  return (
    <section className="border">
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
        />
      </div>


      <section className="map">
        
      </section>
    </section>
  )
}

export default App



