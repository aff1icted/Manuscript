import { useEffect, useState } from "react";
import '../styles/App.css'
import { useParams } from 'react-router';
import { Loader } from "../components/UI/Loader";
import BookPage from "../components/Bookpage";
import axios from 'axios'
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";


function Bookid() {

  const [Book, setBook] = useState({})
  const LinkISBN = useParams().ISBN
  const [loading, setLoading] = useState(true)

  async function fetchBook() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book/${LinkISBN}`)
    setBook(response.data)
  }

  useEffect(() => {

    fetchBook().finally(() => setLoading(false))

  }, [])


  if (loading) {
    return (
      <Loader />
    )
  }
  return (

    <div>
      <div className="col-10 content">
        <NavBar />
        <BookPage Book={Book} />
      </div>
      <Footer />
    </div>
  )

}

export default Bookid;