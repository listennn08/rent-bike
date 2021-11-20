import { MouseEvent } from 'react'
import IconCustomBike from '~icons/custom/bike'
import IconCustomParking from '~icons/custom/parking'
import IconSearch from '~icons/majesticons/search-line'
import BaseMap from '@/components/BaseMap'
import Map from '@/components/RentMap'
import BaseAutoComplete from '@/components/base/BaseAutoComplete'
import { RootState } from '@/store'
import { IMapSlice, setPosition, setStationIdx } from '@/store/feature/map'
import { toggleMode } from '@/store/feature/share'

const BikeMap = () => {
  const dispatch = useDispatch()
  const mode = useSelector<RootState, boolean>((state) => state.share.mode)

  const {
    station,
    searchStation,
  } = useSelector<RootState, IMapSlice>((state) => state.map)

  const handlerClick = (e: MouseEvent, value: boolean) => {
    e.preventDefault()
    dispatch(toggleMode(value))
  }

  const search = () => {
    if(searchStation[0]) {
      dispatch(setPosition([
        searchStation[0]?.StationPosition?.PositionLat!,
        searchStation[0]?.StationPosition?.PositionLon!
      ]))

      const idx = station.findIndex((el) => el.StationUID === searchStation[0].StationUID)
      dispatch(setStationIdx(idx))
    }
  }

  return (
    <div className="relative">
      <BaseMap>
        <Map />
      </BaseMap>
      <div className="absolute z-999 top-5.5 left-1/2 transform -translate-x-1/2 flex">
        <BaseAutoComplete />
        <button
          type="button"
          className="text-white bg-black p-2.5 rounded-lg flex items-center justify-center focus:outline-none"
          onClick={search}
        >
          <IconSearch className="text-lg"/>
        </button>
      </div>
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-primary z-999 flex">
        <a
          href="#"
          className={`
            w-1/2
            flex items-center justify-center
            px-5 py-3
            tracking-10px
            ${mode ? 'text-black' : 'text-white'}
          `}
          onClick={($e) => handlerClick($e, true)}
        >
          <IconCustomBike
            className="w-6 h-6 mr-2.5"
            style={{
              color: mode ? '#000' : '#fff'
            }}
          />
          租車
        </a>
        <a
          href="#"
          className={`
            w-1/2
            flex items-center justify-center
            px-5 py-3
            tracking-10px
            ${mode ? 'text-white' : 'text-black'}
          `}
          onClick={($e) => handlerClick($e, false)}
        >
          <IconCustomParking
            className="w-6 mr-2.5"
            style={{
              fill: '#FED801',
              color: mode ? '#fff' : '#000',
            }}
          />
          還車
        </a>
      </div>
    </div>
  )
}

export default BikeMap