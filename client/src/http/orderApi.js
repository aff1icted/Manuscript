import { $authHost } from "./index";



export const createOrder = async (order) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/order`, order)
    return data
}

export const updateOrderStatus = async (order) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/order`, order)
    return data
}
