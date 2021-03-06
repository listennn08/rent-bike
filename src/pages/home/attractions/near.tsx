import { LatLngTuple } from 'leaflet'
import IconTelephone from '~icons/ion/ios-telephone'
import { RootState } from '@/store'
import { IAttranctionsSlice } from '@/store/feature/attractions'
import image from '@/icons/image-1.svg'
import { IShareSlice } from '@/store/feature/share'
import { distance } from '@/logic/utils'

const Near = () => {
  const history = useHistory()

  const attractions = useSelector<RootState, IAttranctionsSlice>((state) => state.attractions)
  const position = useSelector<RootState, LatLngTuple>((state) => state.map.position)
  const {
    mode,
    type,
    isLoading,
  } = useSelector<RootState, IShareSlice>((state) => state.share)

  return (
    <>
      {isLoading
        ? (
          <div className="flex justify-center">
            <div className="w-30">
              <div className="slide animated">
                <img src={image} />
              </div>
            </div>
          </div>
        )
        : (
          <div className="container mx-auto pt-8 md:pt-10.5 px-4 md:px-0 min-h-main">
            {attractions[type].length ?
              <div className="-mx-2 flex flex-col md:flex-row flex-wrap">
                {attractions[type].map((el) => (
                    <div
                      className="rounded-md shadow mx-2 mb-2 p-3 bg-white md:w-card-1/3 flex cursor-pointer"
                      key={el.ID}
                      onClick={() => history.push(`detail?q=${encodeURI(el.ID)}`)}
                    >
                      <div
                        className="w-30 h-30 mr-2.5 bg-center bg-cover bg-no-repeat"
                        style={{
                          backgroundImage: `url('${el.Picture?.PictureUrl1}')`
                        }}
                      />
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-end text-primary text-sm mb-1.5">
                          {distance(position[0], position[1], el.Position?.PositionLat!, el.Position?.PositionLon!)} km
                        </div>
                        <h3 className="mb-auto">{el.Name!}</h3>
                        <div className="flex items-center text-secondary text-sm">
                          <IconTelephone className="text-primary mr-2" />
                          {el.Phone}
                        </div>
                      </div>
                    </div>
                  ))
                }
                </div>
              : <span className="text-secondary">???????????????{mode ? '??????' : '??????'}</span>
            }
        </div>
      )}
    </>
  )
}

export default Near
