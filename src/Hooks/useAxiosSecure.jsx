import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

const useAxiosSecure = ()=>{
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        if(token){
            config.headers.Authorization = `bearer ${token}`
        }
        return config
    })
    return instance
}

export default useAxiosSecure