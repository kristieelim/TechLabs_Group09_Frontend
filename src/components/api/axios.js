import axios from "axios"

export default axios.create({
    baseURL: 'https://tafel-route-backend.fly.dev'
});