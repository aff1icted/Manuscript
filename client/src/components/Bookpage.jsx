import react from "react"
import { useHistory } from "react-router";
//<button onClick={getOneBook} disabled={loading}>get</button>
const BookPage = (props) =>{
    const router= useHistory()
    console.log('Book', props.Book.Title)
    return ( 
        <div class="Bookdet">
        <div className="upperbook">
          


          <img scr="" />
          <div className="infosdet">
            <div>{props.Book.Title}</div>
            <div>{props.Book.Authors}</div>
            <div>{props.Book.Tags}</div>
            <div className="description">{props.Book.Description}</div>
          </div>
        </div>
        <div className="lowerbook">
          цена:

        </div>
        <div className="lowerbook">
          <button>в корзину</button>
          <button>читать</button>
        </div>
      </div>

    );
};

export default BookPage;