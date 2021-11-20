import { ChangeEvent, KeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { IMapSlice, setSearchKeyword, setSearchStation } from '@/store/feature/map'
import { RootState } from '@/store'

const BaseAutoComplete = () => {
  const dispatch = useDispatch()
  const listRef = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isShow, setIsShow] = useState(false)
  const {
    searchKeyword,
    station,
    searchStation,
  } = useSelector<RootState, IMapSlice>((state) => state.map)

  const handleFocus = (v: boolean) => setIsShow(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchKeyword(e.currentTarget.value))

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      const el = listRef.current!.children[0] as HTMLLIElement
      el.focus()
    }
  }

  const handleListKeydown = (e: KeyboardEvent<HTMLLIElement>) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLLIElement
    if (e.key === 'ArrowDown') {
      const next = target.nextSibling as HTMLLIElement
      next.focus()
      listRef.current?.scrollTo({
        top: next.offsetTop,
        behavior: 'smooth',
      })
    } else if (e.key === 'ArrowUp') {
      const prev = target.previousSibling as HTMLLIElement
      if (!prev?.tabIndex) {
        inputRef.current?.focus()
        return
      }

      prev.focus()
      listRef.current?.scrollTo({
        top: prev.offsetTop,
        behavior: 'smooth',
      })
    } else if (e.key === 'Tab' || e.key === 'Enter') {
      dispatch(setSearchKeyword(e.currentTarget.innerHTML))
      setIsShow(false)
    }
  }

  const handleListHover = (e: ReactMouseEvent<HTMLLIElement>) => {
    const el = listRef.current?.children[e.currentTarget.tabIndex] as HTMLLIElement
    el.focus()
  }
  

  const handleListClick = (e: ReactMouseEvent<HTMLLIElement>) => {
    dispatch(setSearchKeyword(e.currentTarget.innerHTML))
    setIsShow(false)
  }

  // const search = () => {
  //   if(searchStation[0]) {
  //     dispatch(setPosition([
  //       searchStation[0]?.StationPosition?.PositionLat!,
  //       searchStation[0]?.StationPosition?.PositionLon!
  //     ]))

  //     const idx = station.findIndex((el) => el.StationUID === searchStation[0].StationUID)
  //     dispatch(setStationIdx(idx))
  //   }
  // }

  function handleClickOutside(e: MouseEvent): any {
    if (wrapperRef && !wrapperRef.current?.contains(e.target as Node)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  useEffect(() => {
    dispatch(setSearchStation(
      station
        .filter((el) => el.StationName?.Zh_tw?.includes(searchKeyword) || el.StationAddress?.Zh_tw?.includes(searchKeyword))
    ))
  }, [searchKeyword])

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        ref={inputRef}
        value={searchKeyword}
        onChange={handleChange}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        onKeyUp={handleKeyup}
        placeholder="尋找站點"
        className="
          pl-4 py-2.5
          rounded-lg
          border-none focus:border-1
          mr-1.5
          min-w-64 md:min-w-113
          shadow focus:shadow-lg
          focus:outline-none
          h-full
        "
      />
      <div className={`
        absolute top-12 inset-x-0
        mr-1.5
        bg-white
        rounded-lg
        shadow
        px-2 py-1
        max-h-50
        overflow-hidden
        ${isShow ? '' : 'hidden'}
      `}>
        <ul
          ref={listRef}
          onScroll={(e) => e.stopPropagation()}
          className="max-h-48 overflow-y-scroll"
        >
          {searchStation.length 
            ? searchStation.map((el, index) =>
              <li 
                key={'search' + el.StationUID + Math.random()}
                tabIndex={index}
                className="
                  pl-2 py-1
                  hover:bg-primary  focus:bg-primary
                  focus:outline-none
                  rounded-lg
                  cursor-pointer
                "
                onKeyDown={handleListKeydown}
                onMouseOver={handleListHover}
                onClick={handleListClick}
              >
                {el.StationName?.Zh_tw}
              </li>)
            :  <li 
                className="
                  pl-2 py-1
                  text-secondary
                "
              >
                找不到相關站點
              </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default BaseAutoComplete