import react from "react"
import { useHistory } from "react-router";
require('dotenv').config()



const BookItem = (props) =>{
    const router= useHistory()
    return ( 
        <div className="Book" onClick={()=> router.push(`/books/${props.book.isbn}`)}>
            
        <img scr={process.env.REACT_APP_API_URL+props.book.coverart}/>
        {console.log(process.env.REACT_APP_API_URL+props.book.coverart)}
        <div className="BookContent">
            <h2>{props.book.title}</h2>
            <div>
                {props.book.tags[0].tagname}
            </div>
            <div>
                {/*props.book.authors[0].fullname*/ }
            </div>
            <div className="bookdesc">
                {props.book.description}
            </div>
        </div>
        
    </div>

    );
};

export default BookItem;




