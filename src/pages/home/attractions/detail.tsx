import IconLocation from '~icons/si-glyph/pin-location'
import IconPhone from '~icons/ic/sharp-phone'
import IconTime from '~icons/mdi/clock-time-four'
import { RootState } from '@/store'
import { useQuery } from '@/logic/utils'
import { IAttranctionsSlice } from '@/store/feature/attractions'

const Detail = () => {
  const query = useQuery()
  const history = useHistory()

  const mode = useSelector<RootState, boolean>((state) => state.share.mode)
  const attractions = useSelector<RootState, IAttranctionsSlice>((state) => state.attractions)
  const [type, setType] = useState('resturants')
  const tourismInfo = attractions[type] as unknown as TourismInfo[]
  const currentItem = tourismInfo.find(({ ID }) => ID === query.get('q')) as TourismInfo

  const openMap = () => {
    history.push(
      `/home/attractions/map?addr=${currentItem.Address}` + 
      `&p=${currentItem.Position?.PositionLat},${currentItem.Position?.PositionLon}`
    )
  }
  useEffect(() => {
    if (mode) {
      setType('resturants')
    } else {
      setType('scenicSpots')
    }
  }, [mode])
  return (
    <div className="container mx-auto pt-8 md:pt-10.5 px-4 md:px-0 min-h-main">
      <div className="mx-auto max-w-2/5">
        <div className="rounded shadow bg-white p-4 h-92.5 mb-3">
          <div
            className="bg-center bg-cover bg-no-repeat rounded h-full"
            style={{
              backgroundImage: `url('${currentItem.Picture?.PictureUrl1}')`
            }}
          />
        </div>
        <div className="pl-4">
          <div className="flex items-center mb-5">
            <IconTime className="text-primary mr-3" />
            <span>{currentItem.OpenTime}</span>
          </div>
          <div className="flex items-center mb-5">
            <IconPhone className="text-primary mr-3" />
            <span>{currentItem.Phone}</span>
          </div>
          <div className="flex items-center mb-5">
            <IconLocation className="text-primary mr-3" />
            <span className="mr-2">{currentItem.Address}</span>
            <button
              className="px-3 py-0.5 bg-primary rounded-full"
              onClick={() => openMap()}
            >
              地圖
            </button>
          </div>
          <p className="text-secondary">
            {currentItem.Description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Detail
