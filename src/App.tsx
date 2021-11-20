import { Route, Switch } from 'react-router'
import Index from './pages/index'
import Home from './pages/home'
import { getAllBikeRoute } from './api'
import { setBikeRoutes } from './store/feature/map'

import 'virtual:windi.css'
import 'leaflet/dist/leaflet.css'
import './style.css'

function App() {
  const dispatch = useDispatch()

  // 取得所有車道
  const fetchBikeRoute = async () => {
    const resp = (await getAllBikeRoute())
    const d: CustomBikeShape[] = []
    resp.subscribe({
      next: (x) => d.push(x),
      error: (e) => console.log(e),
      complete: () => dispatch(setBikeRoutes(d))
    })
  }

  useEffect(() => {
    fetchBikeRoute()
  })

  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  )
}

export default App
