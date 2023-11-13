import axios from "axios";


const authedRequest = axios.create();

authedRequest.interceptors.request.use(function (config) {
    console.log(process.env)
    config.url = process.env.REACT_APP_SERVER_URL + config.url;
    return config;
}, err => {
    return Promise.reject(err);
})



export {
    authedRequest
}