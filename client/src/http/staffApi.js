import { $authHost } from "./index";

export const createStaff = async (staff) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/staff`, staff)
    return data
}

export const deleteStaff = async (id) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/staff/${id}`)
    return data
}