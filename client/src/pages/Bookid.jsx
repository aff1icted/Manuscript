import { useEffect,useState } from "react";
import '../styles/App.css'
import { useParams } from 'react-router';
import { Loader } from "../components/UI/Loader";
import BookPage from "../components/Bookpage";
import axios from 'axios'


function Bookid() {

  const [Book, setBook] = useState({})
  const LinkISBN = useParams().ISBN
  const [loading, setLoading] = useState(true)

  async function fetchBook() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book/${LinkISBN}`)
    console.log('data', response.data)
    setBook(response.data)
  }

  useEffect(() => {

    fetchBook().finally(() => setLoading(false))

  }, [])


  if (loading) {
    return (
      <Loader />
    )
  } else {
    return (
      <BookPage Book={Book} />
    )
  }
}

export default Bookid;