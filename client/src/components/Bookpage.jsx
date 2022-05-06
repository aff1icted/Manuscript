import { useHistory } from "react-router";
import AuthorList from "./AuthorList";
import TagList from "./TagList";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import AlertMsg from "./modals/AlertMsg";
import { Context } from "../index";
import AlertButton from "./modals/AlertButton";
import { LOGIN_ROUTE } from "./utils/consts";
import axios from "axios";
import { createStaff } from "../http/staffApi";

const BookPage = observer((props) => {
  const history = useHistory()
  const { user } = useContext(Context)
  const [alertShow, setAlertShow] = useState(false)
  const [alertButtonShow, setAlertButtonShow] = useState(false)
  const [amount, setAmount] = useState(1)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')
  const isShort = props.Book.shortpdf === null
  const isFull = props.Book.fullpdf === null


  async function click() {
    if (user.isAuth) {
      addStaff()
    } else {
      setAlertButtonShow(true)
    }
  }



  const addStaff = async () => {
    try {
      if (amount < 0 || isNaN(amount)) {
        throw ('Укажите количество книг для покупки')
      }
      const formData = new FormData()
      formData.append('bookIsbn', props.Book.isbn)
      formData.append('userUsername', user.user.username)
      formData.append('amount', amount)
      createStaff(formData)
      setAlertShow(true)
    } catch (e) {
      setError(e)
      setShowError(true)
    }
  }




  return (
    <div class="Bookdet">
      <div className="upperbook">
        <img src={process.env.REACT_APP_API_URL + props.Book.coverart} />
        <div className="infosdet">
          <div className="boldtext">{props.Book.title}</div>
          <AuthorList authors={props.Book.authors} />
          <div>ISBN: {props.Book.isbn}</div>
          <TagList tags={props.Book.tags} />
          <div>Дата публикации: {props.Book.publicationdate}</div>
          <div>Количество страниц: {props.Book.pagenumber} с.</div>
          <div>Тираж: {props.Book.edition} шт.</div>
          <div>Описание: {props.Book.description}</div>
          {isShort ?
            <div />
            :
            <a className="mr-3" href={process.env.REACT_APP_API_URL + props.Book.shortpdf}>Отрывок</a>
          }

          {isFull ?
            <div />
            :
            <a className="mr-3" href={process.env.REACT_APP_API_URL + props.Book.fullpdf}>Читать полностью</a>
          }




        </div>
      </div>
      <div className="lowerbook">
        Цена: {props.Book.price}₽


      </div>
      <div className="lowerbook">
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Количество книг" />
        <button onClick={e => click()}>в корзину</button>


      </div>
      <AlertMsg show={alertShow} onHide={() => setAlertShow(false)} title={'Оповещение'} body={`Книга добавлена в корзину`} />
      <AlertButton show={alertButtonShow}
        onHide={() => setAlertButtonShow(false)}
        title={'Оповещение'}
        body={`Для добавления книги в корзину необходимо авторизоваться`}
        buttontext='Перейти к авторизации'
        buttonfunc={() => history.push(LOGIN_ROUTE)}
      />
      <AlertMsg show={showError} onHide={() => setShowError(false)} title={'Ошибка'} body={error} />
    </div>


  );
});

export default BookPage;