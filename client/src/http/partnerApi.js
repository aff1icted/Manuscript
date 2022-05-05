import { $authHost } from "./index";


export const createPartner = async (partner) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/partner`, partner)
    return data
}


export const updatePartner = async (partner) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/partner`, partner)
    return data
}


export const deletePartner = async (title) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/partner/${title}`)
    return data
}