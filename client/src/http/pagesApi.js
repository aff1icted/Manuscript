import { $authHost } from "./index";

export const updatePage = async (pages) => {
    const { data } = await  $authHost.put(`${process.env.REACT_APP_API_URL}api/pages`, pages)
    return data
}