import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IShareSlice {
  mode: boolean
  type: string
  isLoading: boolean
}

const initialState: IShareSlice = {
  mode: true,
  type: 'resturants',
  isLoading: false
}

export const shareSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    toggleMode: (state, action: PayloadAction<boolean>) => {
      state.mode = action.payload
    },

    setType(state, action: PayloadAction<string>) {
      state.type = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    }
  }
})

export const { toggleMode, setType, setIsLoading } = shareSlice.actions
export default shareSlice.reducer