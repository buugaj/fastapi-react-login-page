import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import jwt from 'jwt-decode';

const ACCESS_TOKEN_STORAGE_KEY = "auth/accessToken"

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, action.payload);
      state.accessToken = action.payload;
    },
    clearAccessToken: state => {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export const needsOtpVerification = (state: RootState) => {
  if(state.auth.accessToken != null){
    const jwtData : any = jwt(state.auth.accessToken);
    if("otp_verified" in jwtData) {
      return !jwtData["otp_verified"];
    }
  }
  return false;
}

export const isAuthenticated = (state: RootState) => {
  return accessToken(state) && !needsOtpVerification(state);
}

export const accessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
