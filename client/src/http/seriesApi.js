import { $authHost } from "./index";



export const createSeries = async (series) => {
    const { data } = await $authHost.post(`${process.env.REACT_APP_API_URL}api/series`, series)
    return data
}

export const updateSeries = async (series) => {
    const { data } = await $authHost.put(`${process.env.REACT_APP_API_URL}api/series`, series)
    return data
}


export const deleteSeries = async (name) => {
    const { data } = await $authHost.delete(`${process.env.REACT_APP_API_URL}api/series/${name}`)
    return data
}