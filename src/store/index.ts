import { configureStore } from '@reduxjs/toolkit'
import attractions from './feature/attractions'
import bikeRouteSlice from './feature/bikeRoute'
import mapSlice from './feature/map'
import shareSlice from './feature/share'

const store = configureStore({
  reducer: {
    share: shareSlice,
    map: mapSlice,
    bikeRoute: bikeRouteSlice,
    attractions: attractions
  },
  middleware: []
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
