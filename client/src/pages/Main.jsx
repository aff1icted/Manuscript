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
    

    async function fetchBooks(limit) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`,{params: {limit}})
        setBook(response.data)
    }

    useEffect(() => {
        fetchBooks(5).finally(() => setLoading(false))

    }, [])

    if (loading) {
        <Loader />
    }
    return (
        <div>
            <div className="col-8 content">
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