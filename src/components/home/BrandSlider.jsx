import React from 'react'
import Slider from "react-slick";

const BrandSlider = () => {

    const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  
  };

  return (
    <div style={{fontSize:50,width:'100vw',background:'#cadff9',overflow:'hidden'}}>
      <Slider {...settings}>
        <div>
          <h3 style={{padding:40,margin:0}}>Cardiovascular</h3>
        </div>
        <div>
          <h3 style={{padding:40,margin:0}}>Respiratory</h3>
        </div>
        <div>
          <h3 style={{padding:40,margin:0}}>Neurological</h3>
        </div>
        <div>
          <h3 style={{padding:40,margin:0}}>Viral</h3>
        </div>
        <div>
          <h3 style={{padding:40,margin:0}}>Autoimmune</h3>
        </div>
        <div>
          <h3 style={{padding:40,margin:0}}>Schizophrenia</h3>
        </div>
      </Slider>
    </div>
  )
}

export default BrandSlider
