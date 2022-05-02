import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import * as tunnel from 'tunnel'

interface MyResponseType {
  data: any
}

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: process.env.PROXY_HOST as string,
    port: Number(process.env.PROXY_PORT),
  },
})

const instance = axios.create({
  httpsAgent: process.env.MODE === 'development' ? agent : false,
})

instance.interceptors.response.use((response) => {
  return response
}, (err) => {
  return Promise.reject(err)
})

export const _axios = async (config: AxiosRequestConfig): Promise<MyResponseType> => {
  try {
    const data = await instance.request<MyResponseType>(config)
    return data
  }
  catch (error) {
    // console.log(error)
    throw new Error(error as string)
  }
}
