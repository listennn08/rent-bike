import { Link } from 'react-router-dom'
import IconCustomLogoLg from '~icons/custom/logo-lg'

function index() {
  const routes = [
    {
      path: 'bikeMap',
      text: '尋找  Youbike',
    },
    {
      path: 'route/search',
      text: '查詢自行車道',
    },
    {
      path: 'attractions/near',
      text: '附近景點、美食',
    },
  ]
  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen relative bg-primary">
      <div className="mb-26.5 md:mb-68 lg:mb-29">
        <IconCustomLogoLg className="mb-2" />
        <p className="tracking-10px">微笑單車．暢遊城市</p>
      </div>
      {routes.map(({ path, text }) => 
        <Link
          to={`/home/${path}`} 
          key={path}
          className="
            font-normal
            rounded-[10px]
            py-3 mb-4.5
            w-61
            flex items-center justify-center
            border-2 border-black
            bg-primary hover:bg-black
            text-black hover:text-primary
            transition-all
            hover:shadow-lg
          "
        >
          {text}
        </Link>
      )}
      <p className="absolute lg:right-10 bottom-4 md:bottom-5 text-xs">
        Where’s YouBike  ©
        Code: <a href="" className="underline">Matt</a>  /  
        Design: <a href="https://www.behance.net/KT_Designer" className="underline">KT</a>
      </p>
    </div>
  )
}

export default index
