import '../styles/App.css'
import { useParams } from 'react-router';

function Bookid() {
   const params = useParams() 
  return(
  
    <div class="Bookdet">
          <div className = "upperbook">

            
          <img scr=""/>
            <div className="infosdet">
             <div>название</div>
             <div>автор</div>
             <div>теги</div>
             <div className = "description">описание</div>
            </div>
        </div>
            <div className="lowerbook">
                цена:
                
            </div>
            <div className="lowerbook">
                <button>в корзину</button>
                <button>читать</button>
            </div>  
    </div> 
    
   
  )
}

export default Bookid;