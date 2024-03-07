'use client'

import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markIcon from 'leaflet/dist/images/marker-icon.png'
import markShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markIcon2x.src,
  iconUrl: markIcon.src,
  shadowUrl: markShadow.src
})

interface MapProps {
  center?: L.LatLngExpression
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={center || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className='h-[35vh] rounded-lg'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {center && (
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map
