import { useEffect, useState } from "react"
import TrackerInfo from "./components/TrackerInfo"
import TrackerInput from "./components/TrackerInput"
import './App.css'
import TrackerGeoMap from "./components/TrackerGeoMap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isSearching, setIsSearching] = useState(false)
  const [searchingInfo, setSearchingInfo] = useState("")
  const [data, setData] = useState(null)
  const [searchError, setSearchError] = useState(false)


  const [isLoading, setIsLoading] = useState(false)

  const key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    fetchTrackerInfo(isSearching)

  }, [isSearching, searchingInfo])

  // validar busqueda del usuario --> 
  const validateInput = (input) => {  
    if (validIp(input) || validDomain(input)) {
      return validDomain(input) ? `&domain=${input}`: `&ipAddress=${input}` 
    }else{
      notifyError()
      return ''
    }
 }

 
  const notifyError = () => toast.error("Dominio o Ip Incorrectos", {
    position: "top-right",
    className: "bg-dark",
    autoClose: 2000,
    theme: "colored"
  });

  

  const validIp = (ip) => {
    // ipv4 --> x1.x2.x3.x4 --> 0 <= Xi <= 255
    if (typeof (ip) !== 'string' || ip.split(".").length !== 4) {
      return false
    }

    for (let octeto of ip.split(".")) {
      if (0 > octeto || octeto > 255) {
        return false
      }
    }
    return true
  }

  const validDomain = (domain) => {
    const pattern = new RegExp(/^(((http|https):\/\/|)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?)$/)

    return pattern.test(domain)
  }


  const fetchTrackerInfo = async (isSearching) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}${isSearching ? validateInput(searchingInfo) : ''}`) 
      const data = await response.json()

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
      <ToastContainer/>
    </>
  )
}

export default App



