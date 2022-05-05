import { $authHost } from "./index";



export const createAuthor = async (author) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/author`, author)
    return data
}

export const updateAuthor = async (author) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/author`, author)
    return data
}

export const deleteAuthor = async (fullname) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/author/${fullname}`)
    return data
}