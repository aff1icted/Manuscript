import e from "cors";
import react, { useState, useEffect } from "react"
import { useHistory } from "react-router";
import AuthorList from "./AuthorList";
import { Image } from "react-bootstrap";
import TagList from "./TagList";

const BookPage = (props) => {
  const history = useHistory()
  console.log('Book', props)
  console.log('tag', props.Book.tags)
  console.log('art', process.env.REACT_APP_API_URL + props.Book.coverart)
  return (
    <div class="Bookdet">
      <div className="upperbook">


        {/*<Image  width={100}height={200}scr={process.env.REACT_APP_API_URL+props.Book.coverart}/>*/}
        <img src={process.env.REACT_APP_API_URL + props.Book.coverart} />
        <div className="infosdet">

          <div>{props.Book.title}</div>
          <div>{props.Book.isbn}</div>
          <TagList tags={props.Book.tags} />
          <AuthorList authors={props.Book.authors} />
          <div>Дата публикации:{props.Book.publicationdate}</div>
          <div>количество страниц:{props.Book.pagenumber}</div>
          <div>тираж:{props.Book.edition}</div>
          <div className="description">{props.Book.description}</div>
        </div>
      </div>
      <div className="lowerbook">
        цена:{props.Book.price}
        <a className="mr-3" href={process.env.REACT_APP_API_URL + props.Book.shortpdf}>отрывок</a>
        <a className="mr-3" href={process.env.REACT_APP_API_URL + props.Book.fullpdf}>читать полностью</a>

      </div>
      <div className="lowerbook">


        <button>в корзину</button>


      </div>
    </div>

  );
};

export default BookPage;