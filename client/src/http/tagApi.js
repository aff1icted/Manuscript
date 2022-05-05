import { $authHost } from "./index";




export const createTag = async (tag) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/tag`, tag)
    return data
}


export const updateTag = async (tag) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/tag`, tag)
    return data
}


export const deleteTag = async (name) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/tag/${name}`)
    return data
}