import { LatLngTuple, Popup as PurePopup, divIcon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import BaseMap from '@/components/BaseMap'
import { useQuery } from '@/logic/utils'

const BaseIcon = (text: string) => {
  const html = `
    <div class="relative rounded-full flex items-center justify-center">
      <div class="flex items-center justify-center w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--openmoji" width="48" height="48" preserveAspectRatio="xMidYMid meet" viewBox="0 0 72 72"><path fill="#d22f27" d="M52.573 29.11c0-9.315-7.133-16.892-15.903-16.892s-15.904 7.577-15.904 16.896c.003.465.224 11.609 12.962 31.245a3.463 3.463 0 0 0 2.817 1.934c1.84 0 3.094-2.026 3.216-2.232C52.58 40.413 52.58 29.553 52.573 29.11zM36.67 35.913a7.083 7.083 0 1 1 7.083-7.082a7.09 7.09 0 0 1-7.083 7.082z"></path><path fill="#ea5a47" d="M52.573 29.11c0-9.315-7.133-16.892-15.903-16.892a14.96 14.96 0 0 0-3.865.525c8.395.45 15.1 7.823 15.1 16.85c.006.443.006 11.303-12.813 30.95a5.854 5.854 0 0 1-.586.797a2.855 2.855 0 0 0 2.04.954c1.839 0 3.093-2.027 3.215-2.233C52.58 40.413 52.58 29.553 52.573 29.11z"></path><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M36.545 62.294a3.463 3.463 0 0 1-2.817-1.935C20.99 40.723 20.769 29.58 20.766 29.114c0-9.32 7.134-16.896 15.904-16.896s15.903 7.577 15.903 16.892c.007.444.007 11.304-12.812 30.95c-.122.207-1.377 2.233-3.216 2.233z"></path><path d="M36.67 35.913a7.083 7.083 0 1 1 7.083-7.082a7.09 7.09 0 0 1-7.083 7.082z"></path></g></svg>
      </div>
      <div class="absolute text-red-500 left-10 w-30 font-extrabold text-lg text-outline ">
        ${text}
      </div>
    </div>
  `

  return divIcon({
    html,
    className: 'border-none bg-transparent',
    iconSize: [48, 48],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  })
}
/**
 * 控制 map 用的內嵌 component
 * 
 * @param {object} props 傳入參數
 * @returns 
 */
const InnerMap = ({ bounds, addr }: { bounds: LatLngTuple, addr: string }) => {
  const map = useMap()
  let popupRef = useRef<PurePopup>(null)

  useEffect(() => {
    if (bounds) {
      map.flyTo(bounds, 18)
    }
  }, [bounds])

  return (
    <Marker
      position={bounds!}
      icon={BaseIcon(addr)}
    >
      <Popup ref={popupRef}>
        <div className="font-robot leading-6 text-base">
          {addr}
        </div>
      </Popup>
    </Marker>
  )
}

const SearchRouteMap = () => {
  const query = useQuery()
  const addr = query.get('addr')!
  const latlng = query.get('p')
  const [bound, setBound] = useState<LatLngTuple>()


  useEffect(() => {
    if (latlng) {
      setBound(latlng.split(',').map((el) => parseFloat(el)) as LatLngTuple)
    }
  }, [query])

  return (
    <BaseMap>
      <InnerMap
        bounds={bound!}
        addr={addr}
      />
    </BaseMap>
  )
}

export default SearchRouteMap
