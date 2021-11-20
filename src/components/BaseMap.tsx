import { ReactChild } from 'react'
import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { RootState } from '@/store'

interface IProps {
  children: ReactChild
}

const BaseMap = ({ children }: IProps) => {
  const position = useSelector<RootState, LatLngTuple>((state) => state.map.position)

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        minHeight: 'calc(100vh - 72px)',
        minWidth: '100vw',
      }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_TOKEN}`}
      />
      {children}
    </MapContainer>
  )
}

export default BaseMap