import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {name: "A J A"},
    loading:false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action);
            state.user = action.payload;
            state.loading =true;
        }
    }

});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;