import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookList from "../components/BookList"
import { Loader } from "../components/UI/Loader"
import axios from "axios"

function AuthorPage() {
    const [loading, setLoading] = useState(true)
    const [author, setAuthor] = useState(null)
    const authorname = useParams().fullname

    async function fetchAuthor() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author/${authorname}`)
        setAuthor(response.data)
    }



    useEffect(() => {
        fetchAuthor().finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <div class="Bookdet">
                <div className="upperbook">
                    <img src={process.env.REACT_APP_API_URL + author.photo} />
                    <div className="infosdet">
                        <div>{author.fullname}</div>
                        <div>{author.about}</div>
                    </div>
                </div>
                <BookList Books={author.books} />
                
            </div>
            




        </div>
    )
}

export default AuthorPage;