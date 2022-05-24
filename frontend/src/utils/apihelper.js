import axios from 'axios'
import {apiUrl} from './constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let token = "";
let headers= "";

const getHeader = ()=>{
    if (typeof window !== "undefined" && localStorage.getItem("token")) {    
       token = localStorage.getItem("token");
        // console.log("token",token)
        return headers = {
            headers: {
                Authorization: `${token ?`Bearer ${token}` : ""}`,
                "Content-Type": "multipart/form-data",
            },
        };
    }
}

const notify = (message , status) =>{
    if(status == "error"){
        toast.error(message)
    }
    else if(status == "success"){
        toast.success(message)
    }else if( status =="info"){
        toast.info(message)
    }else if( status =="warn"){
        toast.warn(message)
    }else {
        toast(message)
    }

}


const handleError = (err)=>{
    console.log("erros",err)

     if(err.response.status == 401){ // 
         notify(JSON.stringify(err.response.data.detail),"error")
     }
     if(err.response.status == 400){
         notify(JSON.stringify(err.response.data.detail),"error") //bad request 
     }
     if(err.response.status == 403){
        notify(JSON.stringify(err.response.data.detail),"error") //bad request 
    }
     if(err.response.status == 404){
         notify(JSON.stringify(err.response.data.detail),"error") //page not found
     }
     if(err.response.status == 408){ //Request timeout - 
         notify(JSON.stringify(err.response.data.detail),"error")
     }
     if(err.response.status == 500){ //internal sever
         notify(JSON.stringify(err.response.data.detail),"error")
     }
     if(err.response.status == 502){ //bad gateway - invalid response
         notify(JSON.stringify(err.response.data.detail),"error")
     }

 }
 

const loginCall = (body) =>{
    const url = `${apiUrl}/users/login`
    return new Promise((resolve,reject)=>{
        const header = getHeader();
        const url = `${apiUrl}/users/login`
        console.log("url",url)
            axios
                .post(url,body,header)
                .then((res)=>{
                    resolve(res)
                })
                .catch((err) => {
                   
                    reject(handleError(err))
                })
                
            })

    }

const healthScoreCall = (plannerId,materialId,healthDate) => {
    const url = `${apiUrl}/healthscore/${plannerId}/${materialId}?healthdate=${healthDate}`
    return new Promise((resolve,reject)=>{
    const header = getHeader();
            axios
                .get(url,header)
                .then((res)=>{
                    resolve(res)
        
                })
                .catch((err) => {
                    reject(handleError(err))
                })
                
            })
}

const ExceptionManagerCall = (plannerId,startDate,EndDate) => {
    const url = `${apiUrl}/exceptions/manager/${plannerId}?start_date=${startDate}&end_date=${EndDate}`
    // http://localhost:8000/exceptions/manager/115/?start_date=02/18/22&end_date=04/04/22
    return new Promise((resolve,reject)=>{
    const header = getHeader();
            axios
                .get(url,header)
                .then((res)=>{
                    resolve(res)
        
                })
                .catch((err) => {
                    reject(handleError(err))
                })
                
            })
}

const ExceptionMatrixCall = (plannerId,startDate,EndDate) => {
    const url = `${apiUrl}/exceptions/matrix/${plannerId}?start_date=${startDate}&end_date=${EndDate}`
    // http://localhost:8000/exceptions/manager/115/?start_date=02/18/22&end_date=04/04/22
    return new Promise((resolve,reject)=>{
    const header = getHeader();
            axios
                .get(url,header)
                .then((res)=>{
                    resolve(res)
        
                })
                .catch((err) => {
                    reject(handleError(err))
                })
                
            })
}



export {loginCall,healthScoreCall,ExceptionManagerCall,ExceptionMatrixCall}