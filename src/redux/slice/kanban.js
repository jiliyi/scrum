import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    task_modal_status : {
        kanban_key : '',
        task_id : '',
        show : false,
        type : 'create' //create | edit
    },

    active_project : {
        epic : []
    },

}
export const kanbanSlice = createSlice({
    name : 'kanban',
    initialState,
    reducers : {
        set_active_project : (state,action)=>{
          
            state.active_project = action.payload
        },
        set_task_modal : (state,action)=>{
            Object.keys(action.payload).forEach(key=>{
                state.task_modal_status[key] = action.payload[key]
            })
        }
    }

})

export const active_project_selector = (state)=>{
    return state.kanban.active_project
}

export const task_modal_selector = (state)=>{
    return state.kanban.task_modal_status;
}
export const epic_list_selector = (state)=>{
    return state.kanban.active_project.epic
}

export const {set_active_project,set_task_modal} = kanbanSlice.actions;

export default kanbanSlice.reducer;