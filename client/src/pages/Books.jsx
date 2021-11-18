import react, { useEffect, useMemo, useState } from "react";
import BookList from "../components/BookList";
import Filter from "../components/Filter";
import { useBooks } from "../components/hooks/useBooks";
import '../styles/App.css'
import axios from 'axios'
import { useHttp } from "../components/hooks/html.hook";

function Books() {
    const [Books, setBook] = useState([]) 

    async function fetchPosts(){
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setBook(response.data)
    }

    useEffect(() => {
      //fetchPosts()
      getAllBook()
    },[]) 

  //  const[filter,setFilter]=useState({sort:'',query:''})

  //  const sortedAndSearchedBooks = useBooks(Books, filter.sort, filter.query)
    
    const {loading, error, request}= useHttp()

    const getAllBook = async () =>{
      try {
        const data = await request('api/book')
        console.log('Data',data)
        setBook(data)
      } catch (error) {}
    }

    
  //  <Filter filter={filter} setFilter={setFilter}></Filter>   
  return(
  <div className="App">     
    <BookList Books={Books}/>   
    
    
  </div>  
  )
}

export default Books;