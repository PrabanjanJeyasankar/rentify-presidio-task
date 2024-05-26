import React from 'react'
import './HeaderComponent.css'
import NavBarComponent from '../NavBarComponent/NavBarComponent'
import SearchComponent from '../SearchComponent/SearchComponent'
import banner_circle_one_image from '../../assets/img/circle-one-image.jpg'
import banner_circle_two_image from '../../assets/img/circle-two-image.jpg'
import banner_circle_three_image from '../../assets/img/circle-three-image.jpg'

function HeaderComponent() {
  return (
    <>

  
    <div className='header-container'>
     {/* <NavBarComponent /> */}
      <div className='header'>
        <div className='hero_section'>
          <div className='top_hero_section'>
            <div className='hero_title_Homes'>Homes</div>
            <div className='banner'>
              <div className='banner_circle_container'>
                <div>
                  <img
                    src={banner_circle_one_image}
                    className='banner_circle_container_circle_one'
                    alt='Circle One Image'
                  />
                </div>
                <div>
                  <img
                    src={banner_circle_two_image}
                    className='banner_circle_container_circle_two'
                    alt='Circle Two Image'
                  />
                </div>
                <div>
                  <img
                    src={banner_circle_three_image}
                    className='banner_circle_container_circle_three'
                    alt='Circle Three Image'
                  />
                </div>
              </div>
              <div className='hero_sub_title'>
                Enjoy the comforts of affordable rental, with a peace of mind.
              </div>
            </div>
          </div>
          <div className='hero_title_That_match'>That match.</div>
        </div>
        <SearchComponent className='search_component'/>
        
      </div>
      
    </div>
    </>
  )
}

export default HeaderComponent
