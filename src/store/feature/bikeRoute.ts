import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IRentSlice {
  currentCity: City
}

const initialState: IRentSlice = {
  currentCity: {
    CityID: '',
    CityName: '',
    CityCode: '',
    City: '',
    CountyID: '',
  }
}

export const bikeRouteSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload
    },
  }
})

export const { setCurrentCity } = bikeRouteSlice.actions
export default bikeRouteSlice.reducer