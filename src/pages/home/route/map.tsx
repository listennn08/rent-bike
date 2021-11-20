import { LatLngTuple } from 'leaflet'
import { Marker, Polyline, Popup } from 'react-leaflet'
import BaseMap from '@/components/BaseMap'
import BaseIcon from '@/components/BaseIcon'
import { RootState } from '@/store'
import { useQuery } from '@/logic/utils'

/**
 * 控制 map 用的內嵌 component
 * 
 * @param {object} props 傳入參數
 * @returns 
 */
const InnerMap = ({ bounds }: { bounds?: LatLngTuple[] }) => {
  const map = useMap()

  useEffect(() => {
    if (bounds) map.flyToBounds(bounds)
  }, [bounds])
  return (<></>)
}

const SearchRouteMap = () => {
  const query = useQuery()
  const bikeRoutes = useSelector<RootState, CustomBikeShape[]>((state) => state.map.bikeRoutes)
  const [currentRoute, setCurrentRoute] = useState<CustomBikeShape>()

  useEffect(() => {
    const findRoute = bikeRoutes.find((el) => el.RouteName === query.get('q'))
    if (findRoute) setCurrentRoute(findRoute)
  }, [query])

  return (
    <BaseMap>
      <>
        <InnerMap bounds={currentRoute?.geo}/>
        {!currentRoute
          ? <></>
          : (
            <>
              <Marker
                position={currentRoute.geo![0]}
                icon={BaseIcon({ text: '始', type: 'bike' })}
              >
                <Popup>
                  <div className="font-robot leading-6 text-base">
                    路線名稱 <span className="ml-2 font-bold italic">{currentRoute.RouteName}</span><br/>
                    開始 <span className="ml-2 font-bold italic">{currentRoute.RoadSectionStart}</span><br/>
                    {currentRoute.Direction}
                    </div>
                </Popup>
              </Marker>
              <Marker 
                position={currentRoute.geo![currentRoute.geo!.length - 1]}
                icon={BaseIcon({ text: '終', type: 'bike' })}
              >
                <Popup>
                  <div className="font-robot leading-6 text-base">
                    路線名稱 <span className="ml-2 font-bold italic">{currentRoute.RouteName}</span><br />
                    結束 <span className="ml-2 font-bold italic">{currentRoute.RoadSectionEnd}</span><br />
                    {currentRoute.Direction}
                  </div>
                </Popup>
              </Marker>
              <Polyline
                color="black"
                dashArray="20, 10"
                positions={currentRoute.geo!}
              />
            </>
          )
        }
      </>
    </BaseMap>
  )
}

export default SearchRouteMap
