import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

export default function TrackerGeoMap({data}) {

  const lat = data?.location.lat
  const lng = data?.location.lng

//   const DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
//   })

//   L.marker.prototype.options.icon = DefaultIcon


  

//   L.icon.Default.imagePath = 'img/'

  const Centerer = ({center}) =>{
    const map = useMap()
    useEffect(() => {
        map.setView(center)
    }, [center, map])
  }


  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className='h-[100vh] z-0'>
        <Centerer center={[lat, lng]}/>

        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
)
}
