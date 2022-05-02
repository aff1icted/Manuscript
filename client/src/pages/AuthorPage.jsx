import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookList from "../components/BookList"
import { Loader } from "../components/UI/Loader"
import axios from "axios"

import Footer from "../components/UI/Footer"
import NavBar from "../components/UI/NavBar"

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
            <div className="content">
                <NavBar />
                <div class="Bookdet">
                    <div className="upperbook">
                        <img src={process.env.REACT_APP_API_URL + author.photo} />
                        <div className="infosdet">
                            <div>{author.fullname}</div>
                            <div>{author.about}</div>
                        </div>
                    </div>
                    <div className="authbooks">
                    <BookList Books={author.books} /></div>
                    

                </div>
            </div>
            <Footer />
        </div>

    )
}

export default AuthorPage;