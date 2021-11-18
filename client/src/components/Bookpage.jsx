import react, { useState , useEffect} from "react"
import { useHistory} from "react-router";
import TagList from "./TagList";
//<button onClick={getOneBook} disabled={loading}>get</button>
const BookPage = (props) => {
  const router = useHistory()
  console.log('Book', props)
  console.log('tag', props.Book.tags)   

  return (
    <div class="Bookdet">
      <div className="upperbook">



        <img scr="" />
        <div className="infosdet">
          <div>{props.Book.title}</div>
          <div>{props.Book.Authors}</div>
          <TagList tags={props.Book.tags} />
          <div>{/*props.Book.tags.map(tag =>tag.tagname)props.Book.tags[0].tagname*/}</div>
          <div className="description">{props.Book.description}</div>
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