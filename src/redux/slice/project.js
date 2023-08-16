import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../util/http";
import { set_kanban } from "./drop";
import { set_active_project } from "./kanban";



const initialState = {
    list: [],
    loading : false,
    users : [],
   
    organizations : [],
    task_type : [],

    type : '', // 新建还是删除 edit | create
    show : false,
    id : '',

    delete_modal_status : {
        show : false,
        id : ''
    }
}



export const getProjectListAsync = createAsyncThunk('project/get_project_list', async()=>{
    const resopnse =  await axios.get('/api/projects');
    return resopnse.data;
})

export const getUsersAsync = createAsyncThunk('project/get_users', async(action,state)=>{
    const resopnse = await axios.get('/api/users')
    return resopnse.data;

})

export const getOrganzationsAsync = createAsyncThunk('project/get_organzations',async (action,state)=>{
    const resopnse = await axios.get('/api/organization');
    return resopnse.data;
})
export const getTaskTypeAsync = createAsyncThunk('/project/get_task_type',async (action,state)=>{
    const response = await axios.get('/api/task/type_list');
    return response.data;
})

//id获取单条project
export const getProjectAsync = createAsyncThunk('project/get_project',async (action,state)=>{
    const resopnse = await axios.get(`/api/project/${action}`);
   
   state.dispatch(set_kanban(resopnse.data.data.kanban))
   state.dispatch(set_active_project(resopnse.data.data))
})

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        set_show : (state,action)=>{
            state.show = action.payload;
        },
        set_type : (state,action)=>{
            state.type = action.payload
        },
        set_id : (state,action)=>{
            state.id = action.payload;
        },
        set_delete_modal : (state,action)=>{
            Object.keys(action.payload).forEach(key=>{
                state.delete_modal_status[key] = action.payload[key]
            })
        }
    },
    extraReducers : {
        [getProjectListAsync.pending] : (state,action)=>{
            state.loading = true;
        },
        [getProjectListAsync.fulfilled] : (state,action)=>{
            state.loading = false;
            const result = action.payload.data.data;
            result.forEach(item => {
                if(item.collect == undefined){
                    item.collect = false
                }
            });
            state.list = result;

        },
        [getTaskTypeAsync.fulfilled] : (state,res)=>{
            const data = res.payload.data;
            console.log('datadata',res)
            state.task_type = data;
        },
        [getUsersAsync.fulfilled] :(state,res) =>{
            const data = res.payload.data;
            state.users = data
        },
        [getOrganzationsAsync.fulfilled] : (state,res)=>{
            const data = res.payload.data;
            state.organizations = data
        }
    }
})

export const projectSelect = (state) => {
    return state.project.list;
}

export const project_selector = (state)=>{
    return state.project.project;
}
export const project_modal_show = (state)=>{
    return state.project.show;
}
export const users_selector = (state)=>{
    return state.project.users;
}

export const task_type_selector = (state)=>{
    return state.project.task_type;
}

export const organization_selector = (state)=>{
    return state.project.organizations;
}
export const type_selector = (state)=>{
    return state.project.type
}
export const id_selector = (state)=>{
    return state.project.id
}
export const delete_modal_selector = (state)=>{
    return state.project.delete_modal_status
}
export const {
    set_show,
    set_type,
    set_id,
    set_delete_modal
 } = projectSlice.actions;

export default projectSlice.reducer