import axios from "axios";
import event from "./event";

const instance =  axios.create({})

instance.interceptors.response.use((response)=>{
   if(response.status === 200){

    if(response.data.code === 401){
        //没有登录
        event.emit('global_not_login',response.data.msg)
        return Promise.reject('没有登录状态')
    }

    if(response.data.code !== 0 && response.data.code !== 401 ){
        //用户名存在
        event.emit('global_error_tips',response.data.msg)
    }

   }else{
    //后台问题
    event.emit('global_error_tips',response.data.msg)
   }

    return response
},(error)=>{
    return Promise.reject(error)
})
export default instance;