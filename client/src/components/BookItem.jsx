import react from "react"
import { useHistory } from "react-router";
import AuthorList from "./AuthorList";
import TagList from "./TagList";
require('dotenv').config()



const BookItem = (props) => {
    const router = useHistory()
    return (
        <div className="Book" onClick={() => router.push(`/books/${props.book.isbn}`)}>
            <img src={process.env.REACT_APP_API_URL + props.book.coverart} />
            {console.log(process.env.REACT_APP_API_URL + props.book.coverart)}
            <div className="BookContent">
                <h2>{props.book.title}</h2>
                <div>
                    <TagList tags={props.book.tags} />
                </div>
                <div>
                    <AuthorList authors={props.book.authors} />
                </div>
                <div className="bookdesc">
                    {props.book.description}
                </div>
            </div>

        </div>

    );
};

export default BookItem;




