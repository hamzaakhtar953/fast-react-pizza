import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

const initialState = {
  username: '',
  status: 'idle',
  position: { latitude: 0.0, longitude: 0.0 },
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.position = payload.coords;
        state.address = payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure you fill in your correct address';
      }),
});

function getPosition() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  const positionObj = await getPosition();
  const coords = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(coords);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode} ${addressObj.countryName}`;

  return { coords, address };
});

export const { actions } = userSlice;
export default userSlice.reducer;

export const getUsername = (state) => state.user.username;
