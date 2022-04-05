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

    async function fetchPosts(){
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setBook(response.data)
    }

    useEffect(() => {
      //fetchPosts()
      //getAllBook()
      fetchBooks()
    },[]) 

  //  const[filter,setFilter]=useState({sort:'',query:''})

  //  const sortedAndSearchedBooks = useBooks(Books, filter.sort, filter.query)
    
   // const {loading, error, request}= useHttp()
/*
    const getAllBook = async () =>{
      try {
        const data = await request('api/book')
        console.log('Data',data)
        setBook(data)
      } catch (error) {}
    }*/

    

    const [loading, setLoading] = useState(true)
  

  async function fetchBooks(){  
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`)    
    setBook(response.data)
  }

  async function fetchBookText(){  
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/book`)    
    setBookText(response.data)
  }

  useEffect(() => {
    setTimeout(() => {
      fetchBookText()
      fetchBooks().finally(() => setLoading(false))
    }, 1000);
  }, [])






    
  //  <Filter filter={filter} setFilter={setFilter}></Filter>   
  if (loading) {
    return <Loader/>
  } 
  return(
  <div className="App"> 
    <div>{bookText.text}</div>   
    <BookList Books={Books}/>   
    
    
  </div>  
  )
}

export default Books;