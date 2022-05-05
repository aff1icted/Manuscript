import { $authHost } from "./index";


export const createCover= async (cover) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/cover`, cover)
    return data
}

export const updateCover= async (cover) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/cover`, cover)
    return data
}

export const deleteCover = async (cover) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/cover/${cover}`)
    return data
}