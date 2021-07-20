import axios from 'axios'
import {config} from 'dotenv'

config()

const baseUrl = process.env.REACT_APP_API_URL
console.log(baseUrl)

export const createUser = async ({name, email, password}) => {
  let data = axios.post(`${baseUrl}/auth/create`, {name, email, password})
  return (await data).data
}

export const getToken = async ({email, password}) => {
  let data = axios.post(`${baseUrl}/auth/signin`, {email, password})
  return (await data).data
}