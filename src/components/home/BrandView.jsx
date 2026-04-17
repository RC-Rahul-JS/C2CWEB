import React from 'react'
import brand1 from '../../assets/brand/brand.png'
import brand2 from '../../assets/brand/brand2.png'
import brand3 from '../../assets/brand/brand3.png'
import brand4 from '../../assets/brand/brand4.png'
import brand5 from '../../assets/brand/brand5.png'

const BrandView = () => {
  return (
    <div
                style={{
                    padding: '20px 0',
                    textAlign: 'center',
                    width: '100%',
                    // maxWidth: '1200px',
                    // marginBottom: '20px'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                    {[brand1, brand2, brand3, brand4, brand5].map((brand, index) => (
                        <div key={index} style={{ padding: '20px' }} data-aos="zoom-in" data-aos-delay={200 + index * 100}>
                            <img
                                src={brand}
                                // alt={`Brand ${index + 1}`}
                                style={{
                                    width: '150px',
                                    height: '80px',
                                    objectFit: 'contain',
                                    // display: 'inline-flex'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
  )
}

export default BrandView
