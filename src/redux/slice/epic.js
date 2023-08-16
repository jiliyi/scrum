import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    show: false // modal展示
}



const epicSlice = createSlice({
    initialState,
    name: 'epic',
    reducers: {
        set_show: (state, action) => {
            state.show = action.payload
        }
    }
})

export const epic_modal_selector = (state) => {
    return state.epic.show
}

export const { set_show } = epicSlice.actions;

export default epicSlice.reducer;