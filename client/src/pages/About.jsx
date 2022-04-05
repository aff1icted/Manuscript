import { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "../components/UI/Loader";


function About() {
  const [loading, setLoading] = useState(true)
  const [aboutText, setAboutText] = useState('')


  async function fetchAuthorText(){  
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/about`)    
    setAboutText(response.data)
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
    <h1>
        {aboutText.text}
    </h1>
    
  </div>  
  )
}

export default About;