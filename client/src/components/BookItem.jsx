import axios from "axios";
import { useEffect, useState } from "react"
import { useHistory } from "react-router";
import AuthorList from "./AuthorList";
import TagList from "./TagList";
import { Loader } from "./UI/Loader";

require('dotenv').config()


const BookItem = (props) => {
    const router = useHistory()
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState()
    const [tagList, setTagList] = useState('')
    const [authorList, setAuthorList] = useState('')

    async function fetchBook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book/${props.book.isbn}`)
        dataUpdate(response.data)
        setBook(response.data)
    }

    const dataUpdate = async (book) => {
        if (typeof book.tags !== 'undefined') {
            let buf = []
            book.tags?.map(tag => buf.push(tag.tagname))
            setTagList(buf.toString())
        }
        if (typeof book.authors !== 'undefined') {
            let buf = []
            book.authors?.map(author=> buf.push(author.fullname))
            setAuthorList(buf.toString())
        }
    }



    useEffect(() => {
        fetchBook().finally(() => setLoading(false))
    }, [])
    
    



    if (loading) {
        <Loader />
    }
    return (
        <div className="Book" onClick={() => router.push(`/books/${props.book.isbn}`)}>
            <img src={process.env.REACT_APP_API_URL + props.book.coverart} />
            <div className="BookContent">
                <h2>{props.book.title}</h2>
                <div>
                    {tagList}
                </div>
                <div>
                    {authorList}
                </div>
                <div className="bookdesc">
                    {props.book.description}
                </div>
            </div>

        </div>

    );
};

export default BookItem;




