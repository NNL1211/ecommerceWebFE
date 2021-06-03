import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../img/carosel1.jpg'
import image2 from '../../img/carosel2.jpg'
import image3 from '../../img/carosel3.jpg'
import image4 from '../../img/carosel4.jpg'

const BackGroundHome = () => {
    return (
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        >
        <div>
            <img src={image1} />
        </div>
        <div>
            <img src={image2} />
        </div>
        <div>
            <img src={image3} />
        </div>
        <div>
            <img src={image4} />
        </div>
    </Carousel>
    )
}

export default BackGroundHome
