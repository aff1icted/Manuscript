import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../components/UI/Footer';
import { Loader } from '../components/UI/Loader';
import NavBar from '../components/UI/NavBar';
import '../styles/App.css'

function Partners() {

  const [partners,setPartners]=useState([])
  const [loading,setLoading]=useState(true)

  async function fetchPartners() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/partner`)
    setPartners(response.data)
  }
 


  useEffect(() => {
    fetchPartners().finally(() => setLoading(false))

  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <div className="content">
        <NavBar />
        <div>
         
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Partners;