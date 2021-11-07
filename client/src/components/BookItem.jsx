import react from "react"
import { useHistory } from "react-router";

const BookItem = (props) =>{
    const router= useHistory()
    return (
        <div className="Book">
            <div className="BookContent">
                <strong>{props.book.title}</strong>
                <div>
                    {props.book.body}
                </div>
            </div>
            <div className='BookButton'>
                <button onClick={()=> router.push(`/books/${props.book.id}`)}>
                    Открыть
                </button>
            </div>
        </div>

    );
};

export default BookItem;




