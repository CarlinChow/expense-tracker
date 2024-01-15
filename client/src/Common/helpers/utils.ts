import axios from 'axios'
import { API_URL } from '@env'
import { Category } from '../types'
import type { Transaction } from '../types'

export const formatDate = (date:string):string => {
    return date.replaceAll('/', '-')
}

export const capitalize = (str:string):string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const stringToDateObject = (date:string):Date => {
    let year = parseInt(date.slice(0,4))
    let month = parseInt(date.slice(5,7)) - 1 // JS month starts at 0
    let day = parseInt(date.slice(8,10))
    return new Date(year, month, day)
}

export const dateObjectToString = (date:Date):string => {
    return date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
}

// Query fn's
export const getCategories = async():Promise<Category[]> => {
    const response = await axios.get(`${API_URL}/category`) 
    return response.data
}

export const getTransactions = async():Promise<Transaction[]> => {
    const response  = await axios.get(`${API_URL}/transaction`)
    return response.data
}