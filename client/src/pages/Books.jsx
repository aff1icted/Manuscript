import react, { useEffect, useMemo, useState } from "react";
import BookList from "../components/BookList";
import Filter from "../components/Filter";
import { useBooks } from "../components/hooks/useBooks";
import '../styles/App.css'
import axios from 'axios'
import { useHttp } from "../hooks/html.hook";

function Books() {
    const [Books, setBook] = useState([
      {id:'1',title:'a',body:'aaaa'},
      {id:'2',title:'aaaaa',body:'description'},
      {id:'3',title:'Название2',body:'description'},
      {id:'4',title:'bbbbbb',body:'description'},
      {id:'5',title:'Название3',body:'description'},
      {id:'6',title:'а',body:'aa'},
      {id:'7',title:'cccc',body:'description'},
      {id:'8',title:'Название3',body:'d'},
      {id:'9',title:'Название3',body:'description'},
      {id:'10',title:'Название3',body:'description'},
      {id:'11',title:'Название3',body:'dvvvv'},
      {id:'12',title:'Название3',body:'description'},
      {id:'13',title:'Название3',body:'description'},
      {id:'14',title:'ddd',body:'description'},
      {id:'15',title:'Название3',body:'aaan'},
      {id:'16',title:'Название3',body:'description'}
    ])  

    async function fetchPosts(){
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      //setBook(response.data)
    }

    useEffect(() => {
      fetchPosts()
      //getAllBook()
    },[]) 

    const[filter,setFilter]=useState({sort:'',query:''})

    const sortedAndSearchedBooks = useBooks(Books, filter.sort, filter.query)
    
    const {loading, error, request}= useHttp()

    const getAllBook = async () =>{
      try {
        const data = await request('/books')
        console.log('Data',data)
        //setBook(data)
      } catch (error) {}
    }

    

  return(
  <div className="App">
    <div>
      <button onClick={getAllBook} disabled={loading}>get</button>
      <Filter filter={filter} setFilter={setFilter}></Filter>    
      
    </div>    
    <BookList Books={sortedAndSearchedBooks}/>   
    
    
  </div>  
  )
}

export default Books;