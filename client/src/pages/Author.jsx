import { useState, useEffect } from "react";
import '../styles/App.css'
import axios from "axios";
import { Loader } from "../components/UI/Loader";
import { useHistory } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";


function Author() {
  const hist = useHistory()
  const [loading, setLoading] = useState(true)
  const [authorText, setAuthorText] = useState('')
  const [authors, setAuthors] = useState([])


  async function fetchAuthorText() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/elem/author`)
    setAuthorText(response.data)
  }
  async function fetchAuthors() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/author`)
    setAuthors(response.data)
  }


  useEffect(() => {
    fetchAuthors()
    fetchAuthorText().finally(() => setLoading(false))

  }, [])

  if (loading) {
    return <Loader />
  }
  return (

    <div>
      <div className="content">
        <NavBar />
        <div >
          <h1>{authorText.text}</h1>
          {authors.map(author => <div style={{cursor: "pointer"}} onClick={e => hist.push(`/author/${author.fullname}`)}>{author.fullname}</div>)}
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Author;