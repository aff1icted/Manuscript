import e from "cors";
import react, { useState , useEffect} from "react"
import { useHistory} from "react-router";
import AuthorList from "./AuthorList";
import { Image } from "react-bootstrap";
import TagList from "./TagList";
//<button onClick={getOneBook} disabled={loading}>get</button>
const BookPage = (props) => {
  const router = useHistory()
  console.log('Book', props)
  console.log('tag', props.Book.tags)   
  console.log('art', process.env.REACT_APP_API_URL+props.Book.coverart)  
  return (
    <div class="Bookdet">
      <div className="upperbook">


        {/*<Image  width={100}height={200}scr={process.env.REACT_APP_API_URL+props.Book.coverart}/>*/}
        <img scr={process.env.REACT_APP_API_URL+props.Book.coverart} />
        <div className="infosdet">
          <div>{props.Book.title}</div>
          <div>{props.Book.Authors}</div>
          <TagList tags={props.Book.tags}/>
          <AuthorList authors={props.Book.authors}/>
          <div>{/*props.Book.tags.map(tag =>tag.tagname)props.Book.tags[0].tagname*/}</div>
          <div className="description">{props.Book.description}</div>
        </div>
      </div>
      <div className="lowerbook">
        цена:{props.Book.price}

      </div>
      <div className="lowerbook">
        <button>в корзину</button>
        <button>читать</button>
      </div>
    </div>

  );
};

export default BookPage;