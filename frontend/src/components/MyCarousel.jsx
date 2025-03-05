import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from 'react'
import img1 from '../assets/image4.jpg'

const MyCarousel = () => {
  return (
    <>
        <Carousel>
                <div>
                    <img src="./image1.jpg" />
                    <p className="legend">Computer</p>
                </div>
                <div>
                    <img src="./image2.jpg" />
                    <p className="legend">Technology</p>
                </div>
                <div>
                    <img src="./image3.jpg" />
                    <p className="legend">AI</p>
                </div>
                <div>
                    <img src={img1} />
                    <p className="legend">Manipulation</p>
                </div>
            </Carousel>
    </>
  )
}

export default MyCarousel