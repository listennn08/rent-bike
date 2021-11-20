import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngTuple } from 'leaflet'

export interface IMapSlice {
  userPosition: LatLngTuple
  openLocate: boolean
  position: LatLngTuple
  zoom: number
  station: IBikeStation[]
  searchKeyword: string
  searchStation: IBikeStation[],
  stationIdx: number,
  showBikeRoute: boolean
  bikeRoutes: CustomBikeShape[]
}

const initialState: IMapSlice = {
  userPosition: [24, 121],
  openLocate: false,
  position: [24, 121],
  zoom: 15,
  station: [],
  searchKeyword: '',
  searchStation: [],
  stationIdx: -1,
  showBikeRoute: false,
  bikeRoutes: []
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setOpenLocate(state, action: PayloadAction<boolean>) {
      state.openLocate = action.payload
    },

    setUserPosition(state, action: PayloadAction<LatLngTuple>) {
      const { userPosition } = state
      const { payload } = action
      if (userPosition.every((p, i) => p !== payload[i]))
        state.userPosition = action.payload
    },

    setPosition(state, action: PayloadAction<LatLngTuple>) {
      const { position } = state
      const { payload } = action
      if (position.every((p, i) => p !== payload[i]))
        state.position = action.payload
    },

    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload
    },

    setStation(state, action: PayloadAction<IBikeStation[]>) {
      state.station = action.payload
    },

    setSearchKeyword(state, action: PayloadAction<string>) {
      state.searchKeyword = action.payload
    },

    setSearchStation(state, action: PayloadAction<IBikeStation[]>) {
      state.searchStation = action.payload
    },

    setStationIdx(state, action: PayloadAction<number>) {
      state.stationIdx = action.payload
    },

    setShowBikeRoute(state, action: PayloadAction<boolean>) {
      state.showBikeRoute = action.payload
    },

    setBikeRoutes(state, action: PayloadAction<CustomBikeShape[]>) {
      state.bikeRoutes = action.payload
    }
  },
})

export const {
  setPosition,
  setUserPosition,
  setZoom,
  setOpenLocate,
  setStation,
  setSearchKeyword,
  setSearchStation,
  setStationIdx,
  setShowBikeRoute,
  setBikeRoutes,
} = mapSlice.actions
export default mapSlice.reducer