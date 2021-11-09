import react from "react"
import { useHistory } from "react-router";

const BookItem = (props) =>{
    const router= useHistory()
    return ( 
        <div className="Book" onClick={()=> router.push(`/books/${props.book.ISBN}`)}>
        <img scr=""/>
        <div className="BookContent">
            <h2>{props.book.Title}</h2>
            <div>
                {props.book.Authors}
            </div>
            <div>
                {props.book.Tags}
            </div>
            <div className="bookdesc">
                {props.book.Description}
            </div>
        </div>
        
    </div>

    );
};

export default BookItem;




