import react, { useEffect, useMemo, useState } from "react";
import '../styles/App.css'
import { useParams } from 'react-router';
import { useHttp } from '../components/hooks/html.hook';
import { Loader } from "../components/UI/Loader";
import BookPage from "../components/Bookpage";
import axios from 'axios'


function Bookid() {

  const [Book, setBook] = useState({})
  const LinkISBN = useParams().ISBN
  console.log('isbn',useParams().ISBN)

  const [loading, setLoading] = useState(true)
  //const { loading, error, request } = useHttp()

  /*const getOneBook = async () => {
    try {
      const data = await request(`api/book/${LinkISBN}`)
      console.log('Data', data[0])
      console.log('Title', data[0].Title)
      console.log('LinkISBN', LinkISBN)
      setBook(data[0])
    } catch (error) { }
  }*/

  async function fetchBook(){  
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book/${LinkISBN}`)
    console.log('data',response.data[0])
    setBook(response.data[0])
  }

  useEffect(() => {
    setTimeout(() => {
      fetchBook().finally(() => setLoading(false))
    }, 1000);
  }, [])

  
  if (loading) {
    return (      
      <Loader />
    )
  } else {
    return (
        <BookPage Book={Book}/>      
    )}
}

export default Bookid;