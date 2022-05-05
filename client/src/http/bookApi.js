import { $authHost} from "./index";

export const createBook = async (book) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/book`, book)
    return data
}

export const updateBook = async (book) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/book`, book)
    return data
}

export const deleteBook = async (isbn) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/book/${isbn}`)
    return data
}