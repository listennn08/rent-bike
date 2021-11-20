import { Marker, Popup, Polyline } from 'react-leaflet'
import { LatLngTuple, Popup as PurePopup } from 'leaflet'
import { RootState } from '@/store'
import IconLocation from '~icons/custom/location'
import BaseIcon from './BaseIcon'
import { IMapSlice, setOpenLocate, setPosition, setStation, setUserPosition, setZoom } from '@/store/feature/map'
import { getNearStation, getNearStationAvailability } from '@/api'
import { distance, getCurrentPosition } from '@/logic/utils'

const Map = () => {
  const map = useMap()
  const dispatch = useDispatch()

  const popupRefs = useRef<PurePopup[]>([])
  const mode = useSelector<RootState, boolean>((state) => state.share.mode)
  const {
    position,
    openLocate,
    station,
    zoom,
    userPosition,
    stationIdx,
    showBikeRoute,
    bikeRoutes
  } = useSelector<RootState, IMapSlice>((state) => state.map)

  /**
   * 回呼函數
   *
   * @param z 縮放大小
   * @returns N/A
   */
  const callback = (z: number) => ({ coords }: GeolocationPosition) => {
    const p: LatLngTuple = [coords.latitude, coords.longitude]
    console.log(p)
    dispatch(setPosition(p))
    dispatch(setUserPosition(p))
    dispatch(setOpenLocate(true))

    if (typeof z === 'number') dispatch(setZoom(z))
    fetchNearStationData(...p)
  }

  // 取得現在位置
  const currentPosition = (z: number) => {
    getCurrentPosition(
      callback(z),
      (blocked) => {
        console.log(blocked)
      }
    )
  }

  /**
   * 取得附近站點
   * 
   * @param lat 緯度
   * @param lng 經度
   * @param range 範圍（公尺）
   */
  const fetchNearStationData = async (lat: number, lng: number, range: number = 1000) => {
    const stationResp: IBikeStation[] = (await getNearStation({
      spatialFilter: `nearby(${lat}, ${lng}, ${range})`
    })).data
    const availabilityResp: IBikeAvailability[] = (await getNearStationAvailability({
      spatialFilter: `nearby(${lat}, ${lng}, ${range})`
    })).data

    for (let i = 0; i < stationResp.length; i += 1) {
      const stationStatus = availabilityResp.find((el) => el.StationUID === stationResp[i].StationUID)
      if (stationStatus) {
        stationResp[i] = {
          ...stationResp[i],
          ...stationStatus,
        }
      }
    }

    dispatch(setStation(stationResp))
  }

  useEffect(() => {
    currentPosition(18)
  }, [])

  useEffect(() => {
    console.log(position)
    map.flyTo(position, zoom)
  }, [position])

  useEffect(() => {
    popupRefs.current[stationIdx]?.openOn(map)
  }, [stationIdx])

  const bikeRouteShape = bikeRoutes
    .filter((el) => el.geo?.every((g) => distance(position[0], position[1], g[0], g[1]) < 1))
    .map((el) => {
      const uniqueID = `r${Math.random().toString(36).substring(2, 9)}`
      return (
        <Polyline
          key={el.RouteName}
          color="black"
          dashArray="20, 10"
          positions={el.geo!}
          eventHandlers={{
            mouseover: (e) => {
              const div = document.createElement('div')
              div.id = uniqueID
              div.className = "z-999 bg-white absolute rounded shadow"
              div.innerHTML = `
                <div class="p-2">
                  路線<span class="font-bold ml-2">${el.RouteName}</span>
                </div>
              `
              document.body.appendChild(div)
            },
            mousemove: (e) => {
              const element = document.querySelector(`#${uniqueID}`)! as HTMLDivElement
              element.style.top = `${e.originalEvent.pageY - 50}px`
              element.style.left = `${e.originalEvent.pageX - 30}px`
            },
            mouseout: (e) => {
              document.body.removeChild(document.querySelector(`#${uniqueID}`)!)
            }
          }}
        />
      )
    })

  const stationMarkers = station.map((el, i) => (
    <Marker
      key={el.StationUID}
      position={[el.StationPosition?.PositionLat!, el.StationPosition?.PositionLon!]}
      icon={BaseIcon({ count: mode ? el.AvailableRentBikes! : el.AvailableReturnBikes!, mode })}
    >
      <Popup ref={(r) => popupRefs.current[i] = r!}>
        <div className="font-robot leading-6 text-base">
        {el.StationAddress?.Zh_tw}<br />
        可借車輛 <span className="font-bold italic">{el.AvailableRentBikes}</span><br />
        可停車位 <span className="font-bold italic">{el.AvailableReturnBikes}</span>
        </div>
      </Popup>
    </Marker>
  ))

  return (
    <>
      {stationMarkers}
      {showBikeRoute ? bikeRouteShape : null}
      <Marker
        position={userPosition}
        icon={BaseIcon({ type: 'user', openLocate })}
      />
      <button
        type="button"
        className="
          text-white bg-black
          px-4 py-2
          rounded-full
          absolute right-4 bottom-14 md:bottom-5.5
          z-999
          flex flex-col items-center justify-center
        "
        onClick={() => currentPosition(18)}
      >
        <IconLocation className="mb-1"/>
        <span className="text-xs">附近</span>
      </button>
    </>
  )
}

export default Map
