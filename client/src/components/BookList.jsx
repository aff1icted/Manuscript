import react from "react"
import BookItem from "./BookItem";



const BookList = ({Books}) =>{

    if (!Books.length) {
        return(
        <h1 style={{textAlign:"center"}}>КНИГИ НЕ НАЙДЕНЫ</h1>
        )
    }
    return (
        <div>
            {Books.map(book =>
                <BookItem book={book} key={book.id}/>
            )} 
        </div>

    );
};

export default BookList;