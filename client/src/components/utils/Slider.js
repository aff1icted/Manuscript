import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import '../../styles/Slider.css'
import BtnSlider from './BtnSlider.js'
import { BOOKS_ROUTE } from './consts'
import dataSlider from './dataSlider'



export default function Slider() {

    const history=useHistory()
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <p  style={{ position:"absolute", color:"white", top:"50%", left:"50%", transform: "translateX(-50%) translateY(-60%)", fontSize:"30px"}}>{obj.title}</p>
                        <p style={{ position:"absolute", color:"white", top:"60%", left:"50%", transform: "translateX(-50%) translateY(-60%)", fontSize:"20px"}}>{obj.subTitle}</p>

                        <a href='https://www.codegrepper.com/code-examples/whatever/onclick+p+tag+react'><img style={{cursor:"pointer"}}
                        src={process.env.REACT_APP_API_URL + `slider${index + 1}.jpg`} 
                        /></a>
                        
                    </div>
                )
            })}
            
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}