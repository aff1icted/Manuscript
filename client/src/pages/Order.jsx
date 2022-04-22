import Footer from '../components/UI/Footer';
import NavBar from '../components/UI/NavBar';
import '../styles/App.css'

function Order() {
  return(
    <div>
      <div className="content">
        <NavBar />
        <div>
          <h1>Заказ</h1>
        </div>
      </div>
      <Footer />
    </div>
   
  )
}

export default Order;