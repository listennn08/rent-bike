import { RootState } from '@/store'
import IconLocationMark from '~icons/ic/sharp-location-on'

const SearchRoute = () => {
  const history = useHistory()
  const bikeRoutes = useSelector<RootState, CustomBikeShape[]>((state) => state.map.bikeRoutes)
  const currentCity = useSelector<RootState, City>((state) => state.bikeRoute.currentCity)

  /**
   * 轉換路線長度單位
   * 
   * @param {string} len 路線長度（公尺）
   * @returns {number} 路線長度（公里）
   */
  const convertRouteLength = (len: string) => parseFloat(len) / 1000

  return (
    <div className="container mx-auto pt-8 md:pt-10.5 px-4 md:px-0 min-h-main">
      {!currentCity.City
        ? <span className="text-secondary">尚未選擇任何縣市</span>
        : (
          <div className="-mx-2 flex flex-col md:flex-row flex-wrap">
            {bikeRoutes.filter((el) => el.City === currentCity.CityName).map((el) => (
              <div
                key={el.RouteName}
                className="rounded-md shadow mx-2 mb-2 p-3 bg-white md:w-card-1/3 cursor-pointer"
                onClick={() => history.push(`map?q=${encodeURI(el.RouteName)}`)}
              >
                <h3 className="mb-3">{el.RouteName}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-secondary text-sm">{el.Direction} {convertRouteLength(el.CyclingLength!)} 公里</div>
                  <div className="flex items-center text-secondary text-sm">
                    <IconLocationMark className="text-primary mr-1.625" />
                    <span>{el.City} {el.Town}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default SearchRoute