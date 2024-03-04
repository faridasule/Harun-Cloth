'use client'


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUser } from "../../types";


type actionStatus = 'idle' | 'pending' | 'successful' | 'failed'
export interface UserState {
    user: CreateUser | null,
    status: actionStatus
    message: string
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    message: ''
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        started: (state) => {
            state.status = 'pending'
        },
        success: (state, { payload }: PayloadAction<CreateUser| null>) => {
            state.status = 'successful'
            state.user = payload
        },
        reset: (state) => {
            state.status = 'idle'
        },
        failed: (state, payload: PayloadAction<string>) => {
            state.status = 'failed'
            state.message = payload.payload
        },
       register: (state, { payload }: PayloadAction<CreateUser>) => {
        state.status = 'successful';
        state.user = payload;
      state.message = 'Registration successful';
      // Save user information in local storage
      localStorage.setItem('user', JSON.stringify(payload));
        },
         login: (state, { payload }: PayloadAction<CreateUser>) => {
      state.status = 'successful';
      state.user = payload;
      state.message = 'Login successful';
      // Save user information in local storage
             localStorage.setItem('user', JSON.stringify(payload));

        },
         
         logout: (state) => {
      state.status = 'idle';
      state.user = null;
      state.message = '';
             
      // Remove user information from local storage
    //   localStorage.removeItem('user');
    },
    },

})

export const {
  started,
  register,
  failed,
  login,
  logout
} = authSlice.actions
export default authSlice.reducer

