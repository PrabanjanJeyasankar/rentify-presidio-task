import React, { useEffect, useState } from 'react'
import './RenderResultsComponent.css'
import { IoBed } from 'react-icons/io5'
import { PiBathtubFill } from 'react-icons/pi'
import { FaRuler } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { Eye } from 'lucide-react'
import axios from 'axios'

function RenderResultsComponent() {
  const location = useLocation()
  var propertyData = location.state.propertyData
  const city = location.state.city 
  const roomType = location.state.roomType
const bhkType = location.state.bhkType
  
  const [minPrice, setMinPrice] = useState('0')
  const [maxPrice, setMaxPrice] = useState('500000')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [preferredTenant, setPreferredTenant] = useState('family')
  const [isNonVegAllowed, setIsNonVegAllowed] = useState('yes')
  const [furnished, setFurnished] = useState('no')

  useEffect(() => {
    // console.log(propertyData.address.city)
    const fetchData = async () => {
      axios.get(`http:localhost:3500/api/v1/user/property/search/advance${city}/${roomType}/${bhkType}?minPrice=${minPrice}&maxPrice=${maxPrice}&preferredTenant=${preferredTenant}&isNonVegAllowed=${isNonVegAllowed}&furnished=${furnished}`)
    .then(response=>{
        propertyData=response.data.data
        console.log(response)
    }).catch(error=>{
        console.log(error)
    })
    }

    fetchData()
  }, [minPrice, maxPrice, preferredTenant, isNonVegAllowed, furnished])

  console.log(propertyData)
  return (
    <div className='card_container'>
      <h1>Best Options</h1>
      <div className='results_filters'>
        <div className='filters'>
          <label htmlFor='minPrice' className='min-price'>Min Price:</label>
          <input
            type='number'
            id='minPrice'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <label htmlFor='maxPrice' className='max-price'>Max Price:</label>
          <input
            type='number'
            id='maxPrice'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div>
            <span>Preferred Tenants:</span>
            <label>
              Family
              <input
                type='radio'
                name='preferredTenant'
                value='family'
                checked={preferredTenant === 'family'}
                onChange={(e) => setPreferredTenant(e.target.value)}
              />
            </label>
            <label>
              Bachelor Men
              <input
                type='radio'
                name='preferredTenant'
                value='bachelor_men'
                checked={preferredTenant === 'bachelor_men'}
                onChange={(e) => setPreferredTenant(e.target.value)}
              />
            </label>
            <label>
              Bachelor Women
              <input
                type='radio'
                name='preferredTenant'
                value='bachelor_women'
                checked={preferredTenant === 'bachelor_women'}
                onChange={(e) => setPreferredTenant(e.target.value)}
              />
            </label>
          </div>
          <div>
            <span>Non-Veg Allowed?</span>
            <label>
              Yes
              <input
                type='radio'
                name='nonVegAllowed'
                value='yes'
                checked={isNonVegAllowed === 'yes'}
                onChange={(e) => setIsNonVegAllowed(e.target.value)}
              />
            </label>
            <label>
              No
              <input
                type='radio'
                name='nonVegAllowed'
                value='no'
                checked={isNonVegAllowed === 'no'}
                onChange={(e) => setIsNonVegAllowed(e.target.value)}
              />
            </label>
          </div>
          <div>
            <span>Furnished:</span>
            <label>No</label>
            <input
              type='radio'
              name='furnished'
              value='no'
              checked={furnished === 'no'}
              onChange={(e) => setFurnished(e.target.value)}
            />

            <label>Semi</label>
            <input
              type='radio'
              name='furnished'
              value='semi'
              checked={furnished === 'semi'}
              onChange={(e) => setFurnished(e.target.value)}
            />

            <label>Full-Furnished</label>
            <input
              type='radio'
              name='furnished'
              value='full'
              checked={furnished === 'full'}
              onChange={(e) => setFurnished(e.target.value)}
            />
          </div>
        </div>
        <div className='display_results'>
          {propertyData.map((property) => (
            <div className='card' key={property._id}>
              <div className='card_image'>
                <img src={property.images} alt={property.title} />
              </div>
              <div className='card_info'>
                <div className='card_header_features'>
                  <div className='card_header'>
                    <div className='room_title'>{property.title}</div>
                    <div className='room_address'>
                      {`${property.address.street}, ${property.address.localplace}, ${property.address.city}`}
                    </div>
                  </div>
                  <div className='key_features'>
                    <div className='bhk_count'>
                      <IoBed className='features_icon' />
                      <span>{property.bhkType}</span>
                    </div>
                    <div className='restroom_count'>
                      <PiBathtubFill className='features_icon' />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className='square_meter'>
                      <FaRuler className='features_icon' />
                      <span>
                        {property.size} <span>m&sup2;</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='card_price_fav'>
                  <div className='room_price'>
                    <span>&#x20B9;</span>
                    <span>{property.price}</span>
                  </div>
                  <button className='im_interested_btn'>
                    <Eye />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RenderResultsComponent
