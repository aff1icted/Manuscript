import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import '../styles/App.css'
import axios from 'axios'
import { Loader } from "../components/UI/Loader";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { useParams } from "react-router-dom";

function Books() {
  const tag = useParams().tag
  const [Books, setBook] = useState([])
  const [bookText, setBookText] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchBooks() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)
    if (tag!=null) {
      response.data.map(book => book.tags = List(book.tags))
      setBook(response.data.filter(book => book.tags.toLowerCase().includes(tag.toLowerCase())))
    }else{
      setBook(response.data)
    }    
    
  }

  function List(tags) {
    let buf = []
    tags?.map(tag => buf.push(tag.tagname))

    if (!tags?.length) {
        return "не указаны"
    }
    return buf.toString()
};

  async function fetchBookText() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/elem/book`)
    setBookText(response.data)
  }

  useEffect(() => {
    //fetchBookText()
    fetchBooks().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <div className="col-10 content">
        <NavBar />
        <div className="App">
          {/* <div>{bookText.text}</div> */}
          <BookList Books={Books} />
        </div>
      </div>
      <Footer />
    </div>

  )


}

export default Books;