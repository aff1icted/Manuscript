import { useState,useEffect } from "react";
import BookList from "../components/BookList";
import '../styles/App.css'
import axios from "axios";
import { Loader } from "../components/UI/Loader";


function Author() {
  const [loading, setLoading] = useState(true)
  const [authorText, setAuthorText] = useState('')


  async function fetchAuthorText(){  
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/author`)    
    setAuthorText(response.data)
  }

  useEffect(() => {
    setTimeout(() => {
      fetchAuthorText().finally(() => setLoading(false))
    }, 1000);
  }, [])

  if (loading) {
    return <Loader/>
  }   
  return(
  <div>
    <h1>{authorText.text}</h1> 
    
  </div>  
  )
}

export default Author;