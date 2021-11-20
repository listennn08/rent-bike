import { Route, Switch } from 'react-router-dom'
import SearchRoute from './route/search'
import SearchRouteMap from './route/map'

function route () {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        <Route path={`${path}/search`}>
          <SearchRoute />
        </Route>
        <Route path={`${path}/map`}>
          <SearchRouteMap />
        </Route>
      </Switch>
    </>
  )
}

export default route