import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../components/UI/Footer';
import { Loader } from '../components/UI/Loader';
import NavBar from '../components/UI/NavBar';
import '../styles/App.css'

function Partners() {

  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className="col-10 content">
        <NavBar />
        <div>
          {partners.map(partner =>
            <div style={{fontSize:"30px", fontFamily:"Lucida Sans Unicode", paddingTop:"30px"}}>
              <img  height="100px" width="100px" src={process.env.REACT_APP_API_URL + partner.img} />
              <span style={{paddingLeft:"20px"}}>
                {partner.title}
              </span>
              
            </div>)}
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Partners;