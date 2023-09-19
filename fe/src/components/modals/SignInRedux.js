import { createSlice } from '@reduxjs/toolkit'

export const SignInRedux = createSlice({
    name: 'logIn',
    initialState: {
        iscompleted: false
    },
    reducers: {
        signIn: state => {
            state.iscompleted = true
        },
        signOut: state => {
            state.iscompleted = false
        }
    }
})

export const { signIn, signOut } = SignInRedux.actions


export default SignInRedux.reducer