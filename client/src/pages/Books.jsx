import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import '../styles/App.css'
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";

function Books() {
  const [Books, setBook] = useState([])
  const [bookText, setBookText] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchBooks() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
    setBook(response.data)
  }

  async function fetchBookText() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/elem/book`)
    setBookText(response.data)
  }

  useEffect(() => {
    fetchBookText()
    fetchBooks().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <div className="content">
        <NavBar />
        <div className="App">
          <div>{bookText.text}</div>
          <BookList Books={Books} />
        </div>
      </div>
      <Footer />
    </div>

  )


}

export default Books;