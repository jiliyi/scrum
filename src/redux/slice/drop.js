import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/http";

const initialState = {
    kanban_data: [],
    projectId : '',
}

function reorderList(list, startIndex, endIndex) {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed)
    return result;
}

export const update_kanban_async = createAsyncThunk('drop/update_kanban',async (_,state)=>{
    const store = state.getState();
    const projectId = store.drop.projectId;
    const kanban_data = store.drop.kanban_data;
    const res = await  axios.put(`/api/projects/${projectId}/kanban`,kanban_data);
})

export const dropSlice = createSlice({
    name: 'drop',
    initialState,
    reducers: {
        set_project_id : (state,action)=>{
            
            state.projectId = action.payload
        },
        add_kanban_item : (state,action)=>{
            state.kanban_data.push({
                kanban_key : action.payload,
                task : []
            })
        },
        
        set_kanban: (state, action) => {
           
            state.kanban_data = action.payload
        },

        //edit task
        set_kanban_item :(state,action)=>{
            const task_id = action.payload.task_id;
            const task = action.payload.task;

            const kanban_item = state.kanban_data.find(it=>it.kanban_key === action.payload.kanban_key);
            const index = kanban_item.task.findIndex(it=>it.task_id === task_id);
            
            task.task_id = task_id;

            kanban_item.task[index] = task;
        },
        kanban_order: (state, action) => {
            reorderList(
                state.kanban_data,
                action.payload.source,
                action.payload.destination
            )

        },
        task_order: (state, action) => {
            const id = action.payload.id;
            const index = state.kanban_data.findIndex(it => it.kanban_key === id)
            reorderList(
                state.kanban_data[index].task,
                action.payload.source,
                action.payload.destination
            )
        },
        task_diff_order: (state, action) => {
            const {
                destinationId,
                sourceId,
                destination,
                source
            } = action.payload;
            const moveItem = state.kanban_data.find(it => it.kanban_key === sourceId);
            const targetItem = state.kanban_data.find(it => it.kanban_key === destinationId);
            const [moved] = moveItem.task.splice(source, 1);
            targetItem.task.splice(destination, 0, moved)

        },
        add_task : (state,action)=>{
            const task_data = action.payload.task_data;
            const kanban =  state.kanban_data.find(it=>it.kanban_key === action.payload.kanban_key);
            kanban.task.push(task_data);
        }

    }
})


export const kanban_selector = (state) => {

    return state.drop.kanban_data
}



export const { 
    kanban_order,
    task_order, 
    task_diff_order,
    set_kanban,
    set_project_id,
    add_kanban_item,
    add_task,
    set_kanban_item
 } = dropSlice.actions;
export default dropSlice.reducer;