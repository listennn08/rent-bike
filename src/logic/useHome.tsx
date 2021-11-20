import IconCustomBike from '~icons/custom/bike'
import IconCustomParking from '~icons/custom/parking'
import IconCustomFood from '~icons/custom/food'
import IconCustomScenicSpot from '~icons/custom/scenic-spot'
import BaseSwitch from '@/components/base/BaseSwitch'
import BaseNav from '@/components/base/BaseNav'
import BaseSelect from '@/components/base/BaseSelect'
import { city } from './city'
import { RootState } from '@/store'
import { IMapSlice, setShowBikeRoute } from '@/store/feature/map'
import { setCurrentCity } from '@/store/feature/bikeRoute'

const useHome = () => {
  const { path, url } = useRouteMatch()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const mode = useSelector<RootState, boolean>((state) => state.share.mode)
  const { showBikeRoute } = useSelector<RootState, IMapSlice>((state) => state.map)
  const currentCity = useSelector<RootState, City>((state) => state.bikeRoute.currentCity)

  const handleSelectChange = (v: City) => dispatch(setCurrentCity(v))

  const bikeMapHeader = (
    <>
      <BaseNav>
        <>
          <IconCustomBike
            className="w-6 h-6 mr-2.5"
            style={{
              color: mode ? '#FED801' : '#000'
            }}
          />
          租車
        </>
        <>
          <IconCustomParking
            className="w-6 mr-2.5"
            style={{
              fill: mode ? '#fff' : '#000',
              color: mode ? '#000' : '#FED801',
            }}
          />
          還車
        </>
      </BaseNav>
      <BaseSwitch
        toggle={showBikeRoute}
        setToggle={(v) => dispatch(setShowBikeRoute(v))}
      />
    </>
  )

  const searchRouteHeader = (
    <>
      <BaseSelect<City>
        placeholder="請選擇縣市"
        value={currentCity}
        options={city}
        text="CityName"
        change={handleSelectChange}
      />
    </>
  )

  const nearScenicSpotHeader = (
    <>
      <BaseNav>
        <>
          <IconCustomScenicSpot
            className="w-6 mr-2.5"
            style={{
              color: mode ? '#FED801' : '#000',
            }}
          />
          景點
        </>
        <>
          <IconCustomFood
            className="w-6 mr-2.5"
            style={{
              color: mode ? '#000' : '#FED801'
            }}
          />
          美食
        </>
      </BaseNav>
      <div className="w-50"></div>
    </>
  )

  return {
    path,
    url,
    pathname,
    bikeMapHeader,
    searchRouteHeader,
    nearScenicSpotHeader,
  }
}

export default useHome