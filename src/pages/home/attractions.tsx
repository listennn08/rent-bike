import { Route, Switch } from 'react-router-dom'
import { LatLngTuple } from 'leaflet'
import Near from './attractions/near'
import Detail from './attractions/detail'
import Map from './attractions/map'
import { RootState } from '@/store'
import { getResturant, getScenicSpot } from '@/api'
import { setIsLoading, setType } from '@/store/feature/share'
import { setResturants, setScenicSpot } from '@/store/feature/attractions'
import { setOpenLocate, setPosition, setUserPosition, setZoom } from '@/store/feature/map'
import { getCurrentPosition } from '@/logic/utils'

const Attractions = () => {
  const { path } = useRouteMatch()
  const dispatch = useDispatch()

  const mode = useSelector<RootState, boolean>((state) => state.share.mode)
  const position = useSelector<RootState, LatLngTuple>((state) => state.map.position)
  const [firstLoading, setFirstLoading] = useState(true)

  const fetchNearAttractions = async () => {
    dispatch(setIsLoading(true))
    const resturantResp = (await getResturant({
      spatialFilter: `nearby(${position[0]}, ${position[1]}, 1000)`,
    })).data

    const scenicSpotResp =  (await getScenicSpot({
      spatialFilter: `nearby(${position[0]}, ${position[1]}, 1000)`,
    })).data

    dispatch(setResturants(resturantResp))
    dispatch(setScenicSpot(scenicSpotResp))
    dispatch(setIsLoading(false))
  }

  const callback = (z?: number) => ({ coords }: GeolocationPosition) => {
    const p: LatLngTuple = [coords.latitude, coords.longitude]
    if (p[0] === position[0] && p[1] === position[1]) return
    dispatch(setPosition(p))
    dispatch(setUserPosition(p))
    dispatch(setOpenLocate(true))
    if (typeof z === 'number') dispatch(setZoom(z))
  }

  const currentPosition = () => {
    getCurrentPosition(callback(18), (e) => console.log(e))
  }

  useEffect(() => {
    setType(mode ? 'resturants' : 'scenicSpots')
  }, [mode])
  useEffect(() => {
    if (!firstLoading) {
      fetchNearAttractions()
    }
    
    setFirstLoading(false)
  }, [position])

  currentPosition()
  return (
    <Switch>
      <Route path={`${path}/near`}>
        <Near />
      </Route>
      <Route path={`${path}/detail`}>
        <Detail />
      </Route>
      <Route path={`${path}/map`}>
        <Map />
      </Route>
    </Switch>
  )
}

export default Attractions
