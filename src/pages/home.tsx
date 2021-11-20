import { Route, Switch } from 'react-router-dom'
import Navbar from '@/components/layouts/Navbar'
import BikeMap from './home/bikemap'
import CRoute from './home/route'
import Attractions from './home/attractions'
import useHome from '@/logic/useHome'

function home () {
  const {
    path,
    pathname,
    bikeMapHeader,
    searchRouteHeader,
    nearScenicSpotHeader,
  } = useHome()

  const getHeader = () => {
    if (pathname.match(/bikemap/i)) return bikeMapHeader
    if (pathname.match(/route/i)) return searchRouteHeader
    return nearScenicSpotHeader
  }
  return (
    <>
      <Navbar>
        {getHeader()}
      </Navbar>
      <Switch>
        <Route path={`${path}/bikemap`}>
          <BikeMap />
        </Route>
        <Route path={`${path}/route`}>
          <CRoute />
        </Route>
        <Route path={`${path}/attractions`}>
          <Attractions />
        </Route>
      </Switch>
    </>
  )
}

export default home