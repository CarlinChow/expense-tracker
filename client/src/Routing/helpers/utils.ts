import axios from 'axios'
import { API_URL } from "@env"

type authObj = {
    email: string,
    password: string,
}

export const login = (data: authObj) => {
    const { email, password } = data
    return axios.post(`${API_URL}/auth/authenticate`, {email, password}, { headers: {'content-type': 'application/json'}})
}

export const register = (data: authObj) => {
    const { email, password } = data
    return axios.post(`${API_URL}/auth/register`, {email, password})
}
