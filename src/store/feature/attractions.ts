import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAttranctionsSlice {
  [key: string]: TourismInfo[]
  resturants: TourismInfo[]
  scenicSpots: TourismInfo[]
}

const initialState: IAttranctionsSlice = {
  resturants: [],
  scenicSpots: [],
}

export const attractionSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    setResturants(state, action: PayloadAction<TourismInfo[]>) {
      state.resturants = action.payload
    },
    setScenicSpot(state, action: PayloadAction<TourismInfo[]>) {
      state.scenicSpots = action.payload
    },

  }
})

export const { setResturants, setScenicSpot } = attractionSlice.actions
export default attractionSlice.reducer