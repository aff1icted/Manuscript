import react, { useEffect, useMemo, useState } from "react";
import '../styles/App.css'
import { useParams } from 'react-router';
import { useHttp } from '../components/hooks/html.hook';
import { Loader } from "../components/UI/Loader";
import BookPage from "../components/Bookpage";


function Bookid() {

  const [Book, setBook] = useState({
    Title:"title"
  })
  const LinkISBN = useParams().ISBN


  const { loading, error, request } = useHttp()

  const getOneBook = async () => {
    try {
      const data = await request(`/books/${LinkISBN}`)
      console.log('Data', data[0])
      console.log('Title', data[0].Title)
      console.log('LinkISBN', LinkISBN)
      setBook(data[0])
    } catch (error) { }
  }

  useEffect(() => {
    getOneBook()
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