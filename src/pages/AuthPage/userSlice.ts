import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem('user') || '{}'),
        settings: {}
    },
    reducers: {
        login(state, action) {
            state.current = action.payload.user
            localStorage.setItem('access_token', action.payload.accessToken)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        refreshTokenSuccess(state, action) {
            localStorage.setItem('access_token', action.payload.accessToken)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        logout(state) {
            localStorage.removeItem('user')
            localStorage.removeItem('access_token')
            state.current = {}
        }

    },
    // extraReducers: {
    //     [register.fulfilled]: (state: any, action:any) => {
    //         state.current = action.payload
    //     },

    //     [login.fulfilled]: (state: any, action:any) => {
    //         state.current = action.payload
    //     }
    // }
    // extraReducers: (builder) => {
    //     builder.addCase(register.fulfilled, (state, payload) => {
    //       state.current = payload
    //     })

    //     builder.addCase(login.fulfilled, (state, payload ) => {
    //         state.current = payload
    //     })
    // }
})

export default userSlice