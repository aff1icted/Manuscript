import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Slider from "../components/utils/Slider";
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import Footer from "../components/UI/Footer";
import NavBar from "../components/UI/NavBar";

function Main() {

    const [Books, setBook] = useState([])
    const [loading, setLoading] = useState(true)



    async function fetchBooks(type) {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}api/book/5`)
        setBook(response.data)
    }

    useEffect(() => {
        fetchBooks().finally(() => setLoading(false))

    }, [])

    if (loading) {
        <Loader />
    }
    return (
        <div>
            <div className="content">
                <NavBar />
                <div>
                    <Slider />
                    <BookList Books={Books} />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Main;