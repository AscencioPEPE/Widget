import axios from "axios";

const BASE_URL = 'http://localhost:9000/v1/widgets'

export const api = axios.create({
    baseURL : BASE_URL,
})
