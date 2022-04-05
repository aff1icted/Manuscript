import react from "react"
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";

const Footer= () =>{
  const [loading, setLoading] = useState(true)
  const [footerText, setFooterText] = useState('')


  async function fetchFooterText(){  
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/footer`)    
    setFooterText(response.data)
  }

  useEffect(() => {
    setTimeout(() => {
      fetchFooterText().finally(() => setLoading(false))
    }, 1000);
  }, [])

  if (loading) {
    return <Loader/>
  }   
  return (
    <div className="footer">
		  <h1>{footerText.text}</h1>
	  </div>

  );
};

export default Footer;