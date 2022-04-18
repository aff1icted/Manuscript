import react from "react"
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";

const Footer = () => {
  const [loading, setLoading] = useState(true)
  const [footer1, setFooter1] = useState([])
  const [footer2, setFooter2] = useState([])
  const [footer3, setFooter3] = useState([])
  const [footer4, setFooter4] = useState([])
  const [footer5, setFooter5] = useState([])
  const [footer6, setFooter6] = useState([])


  async function fetchFooterText() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pages/footer`)
    response.data?.map(function (obj) {
      switch (obj.item) {
        case 'footer1':
          setFooter1(obj.text)
          break;
        case 'footer2':
          setFooter2(obj.text)
          break;
        case 'footer3':
          setFooter3(obj.text)
          break;
        case 'footer4':
          setFooter4(obj.text)
          break;
        case 'footer5':
          setFooter5(obj.text)
          break;
        case 'footer6':
          setFooter6(obj.text)
          break;
      }
    })
  }

  useEffect(() => {
    fetchFooterText().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div className="footer">
      <div><h6>{footer1}</h6></div>
      <div><h6>{footer2}</h6></div>
      <div><h6>{footer3}</h6></div>
      <div><h6>{footer4}</h6></div>
      <div><h6>{footer5}</h6></div>
      <div><h6>{footer6}</h6></div>
    </div>

  );
};

export default Footer;