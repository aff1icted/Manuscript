import { $authHost } from "./index";



export const createFormat = async (format) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/format`, format)
    return data
}

export const updateFormat = async (format) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/format`, format)
    return data
}

export const deleteFormat = async (name) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/format/${name}`)
    return data
}