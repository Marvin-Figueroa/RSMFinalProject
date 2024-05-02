import axios, { AxiosError, CanceledError } from 'axios'

export default axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export { AxiosError, CanceledError };