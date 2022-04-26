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

const BookPage = observer((props) => {
  const history = useHistory()
  const { user } = useContext(Context)
  const [alertShow, setAlertShow] = useState(false)
  const [alertButtonShow, setAlertButtonShow] = useState(false)
  const [amount, setAmount] = useState(1)

  async function click() {
    if (user.isAuth) {
      addStaff()      
    } else {
      setAlertButtonShow(true)
    }
  }

  async function create(staff) {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}api/staff`, staff)
    return data
  }


  const addStaff = async () => {
    try {
      const formData = new FormData()
      console.log('bookIsbn', props.Book.isbn)
      formData.append('bookIsbn', props.Book.isbn)
      formData.append('userUsername', user.user.username)
      formData.append('amount', amount)
      const data = await create(formData);
      setAlertShow(true)
    } catch (e) {
      alert(e.response.data.message)
    }
  }




  return (
    <div class="Bookdet">
      <div className="upperbook">
        <img src={process.env.REACT_APP_API_URL + props.Book.coverart} />
        <div className="infosdet">
          <div>{props.Book.title}</div>
          <div>ISBN: {props.Book.isbn}</div>
          <AuthorList authors={props.Book.authors} />
          <TagList tags={props.Book.tags} />
          <div>Дата публикации: {props.Book.publicationdate}</div>
          <div>Количество страниц: {props.Book.pagenumber}</div>
          <div>Тираж: {props.Book.edition}</div>
          <div>{props.Book.description}</div>
        </div>
      </div>
      <div className="lowerbook">
        Цена: {props.Book.price}₽
        <a className="mr-3" href={process.env.REACT_APP_API_URL + props.Book.shortpdf}>отрывок</a>
        <a className="mr-3" href={process.env.REACT_APP_API_URL + props.Book.fullpdf}>читать полностью</a>

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
    </div>

  );
});

export default BookPage;