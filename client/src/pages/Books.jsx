import react, { useEffect, useMemo, useState } from "react";
import BookList from "../components/BookList";
import Filter from "../components/Filter";
import { useBooks } from "../components/hooks/useBooks";
import '../styles/App.css'
import axios from 'axios'
import { useHttp } from "../components/hooks/html.hook";
import { Loader } from "../components/UI/Loader";

function Books() {
  const [Books, setBook] = useState([])
  const [bookText, setBookText] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchBooks() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
    setBook(response.data)
  }

  async function fetchBookText() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/book`)
    setBookText(response.data)
  }

  useEffect(() => {
    fetchBookText()
    fetchBooks().finally(() => setLoading(false))
  }, [])

  //  <Filter filter={filter} setFilter={setFilter}></Filter>   
  if (loading) {
    return <Loader />
  } else {
    return (
      <div className="App">
        <div>{bookText.text}</div>
        <BookList Books={Books} />
      </div>
    )
  }

}

export default Books;