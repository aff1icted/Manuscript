import { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import Footer from "../components/UI/Footer";
import NavBar from "../components/UI/NavBar";



function About() {
  const [loading, setLoading] = useState(true)
  const [aboutText, setAboutText] = useState('')


  async function fetchAuthorText() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/elem/about`)
    setAboutText(response.data)
  }

  useEffect(() => {

    fetchAuthorText().finally(() => setLoading(false))

  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <div className="col-10 content">
        <NavBar />
        <div className="col-8" style={{paddingTop:"30px", textAlign:"justify", textAlignLast:"center"}}>
          <h5>
            {aboutText.text}
          </h5>

        </div>
      </div>
      <Footer />
    </div>

  )
}

export default About;