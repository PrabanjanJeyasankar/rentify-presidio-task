import React, { useState } from 'react'
import './SellerComponent.css'

function RentalForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: {
      street: '',
      city: '',
      localplace: '',
      state: '',
      country: '',
      zipCode: '',
    },
    type: '',
    price: '',
    size: '',
    floor: '',
    totalFloor: '',
    preferredTenant: '',
    parkingType: '',
    furnished: '',
    bhkType: '',
    bathrooms: '',
    ageOfProperty: '',
    waterSupply: '',
    isNonVegAllowed: '',
    owner: '',
    listedDate: '',
    availability: '',
    availableFrom: '',
    nearBySchool: '',
    nearByCollege: '',
    nearByHospital: '',
    image: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    console.log(formData)
    const { name, value, files } = e.target
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      })
    } else if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }
  const validate = () => {
    const newErrors = {}
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'object' && value !== null) {
        for (const [subKey, subValue] of Object.entries(value)) {
          if (!subValue) {
            newErrors[subKey] = `${subKey} is required`
          }
        }
      } else if (!value) {
        newErrors[key] = `${key} is required`
      }
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    console.log("called")
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (!Object.keys(newErrors)) {
      const formData = new FormData()
      console.log("if")
      formData.append('title', formData.title)
      formData.append('description', formData.description)
      formData.append('address[street]', formData.address.street)
      formData.append('address[city]', formData.address.city)
      formData.append('address[localplace]', formData.address.localplace)
      formData.append('address[state]', formData.address.state)
      formData.append('address[country]', formData.address.country)
      formData.append('address[zipCode]', formData.address.zipCode)
      formData.append('type', formData.type)
      formData.append('price', formData.price)
      formData.append('size', formData.size)
      formData.append('floor', formData.floor)
      formData.append('totalFloor', formData.totalFloor)
      formData.append('preferredTenant', formData.preferredTenant)
      formData.append('parkingType', formData.parkingType)
      formData.append('furnished', formData.furnished)
      formData.append('bhkType', formData.bhkType)
      formData.append('bathrooms', formData.bathrooms)
      formData.append('ageOfProperty', formData.ageOfProperty)
      formData.append('waterSupply', formData.waterSupply)
      formData.append('isNonVegAllowed', formData.isNonVegAllowed)
      formData.append('owner', formData.owner)
      formData.append('listedDate', formData.listedDate)
      formData.append('availability', formData.availability)
      formData.append('availableFrom', formData.availableFrom)
      formData.append('nearBySchool', formData.nearBySchool)
      formData.append('nearByCollege', formData.nearByCollege)
      formData.append('nearByHospital', formData.nearByHospital)
      formData.append('image', formData.image)
      console.log('Form submitted successfully', formData)

      axios
        .post('http://localhost/api/v1/user/add', formData, {
          withCredential: true,
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else{
        console.log('else ')
    }
  }

  return (
    <div className='seller-form-container'>
      <h1>Property Information</h1>
      <form onSubmit={handleSubmit}>
        <div className='seller-form'>
          <div className='form-part-one'>
            <div className='input-wrapper property_title'>
              <label>Property Title:</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className='error-info'>* {errors.title}</div>
              )}
            </div>
            <div className='input-wrapper description'>
              <label>Description:</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}></textarea>
              {errors.description && (
                <div className='error-info'>* {errors.description}</div>
              )}
            </div>
            <div className='input-wrapper address'>
              <label>Address:</label>
              <input
                type='text'
                name='street'
                placeholder='Street'
                value={formData.address.street}
                onChange={handleChange}
              />
              {errors.street && (
                <div className='error-info'>* {errors.street}</div>
              )}
              <input
                type='text'
                name='city'
                placeholder='City'
                value={formData.address.city}
                onChange={handleChange}
              />
              {errors.city && <div className='error-info'>* {errors.city}</div>}
              <input
                type='text'
                name='localplace'
                placeholder='Local Place'
                value={formData.address.localplace}
                onChange={handleChange}
              />
              {errors.localplace && (
                <div className='error-info'>* {errors.localplace}</div>
              )}
              <input
                type='text'
                name='state'
                placeholder='State'
                value={formData.address.state}
                onChange={handleChange}
              />
              {errors.state && <div className='error-info'>{errors.state}</div>}
              <input
                type='text'
                name='country'
                placeholder='Country'
                value={formData.address.country}
                onChange={handleChange}
              />
              {errors.country && (
                <div className='error-info'>* {errors.country}</div>
              )}
              <input
                type='text'
                name='zipCode'
                placeholder='Zip Code'
                value={formData.address.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode && (
                <div className='error-info'>* {errors.zipCode}</div>
              )}
            </div>

            <div className='input-wrapper type'>
              <label>Type:</label>
              <select name='type' value={formData.type} onChange={handleChange}>
                <option value=''>Select Type</option>
                <option value='apartment'>Apartment</option>
                <option value='home'>Home</option>
                <option value='office'>Office</option>
              </select>
              {errors.type && <div className='error-info'>{errors.type}</div>}
            </div>

            <div className='input-wrapper price'>
              <label>Price:</label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <div className='error-info'>* {errors.price}</div>
              )}
            </div>

            <div className='input-wrapper size'>
              <label>Size in m&#178;:</label>
              <input
                type='number'
                name='size'
                value={formData.size}
                onChange={handleChange}
              />
              {errors.size && <div className='error-info'>* {errors.size}</div>}
            </div>
            <div className='input-wrapper floor'>
              <label>Floor:</label>
              <input
                type='number'
                name='floor'
                value={formData.floor}
                onChange={handleChange}
              />
              {errors.floor && (
                <div className='error-info'>* {errors.floor}</div>
              )}
            </div>

            <div className='input-wrapper total_floor'>
              <label>Total Floor:</label>
              <input
                type='number'
                name='totalFloor'
                value={formData.totalFloor}
                onChange={handleChange}
              />
              {errors.totalFloor && (
                <div className='error-info'>* {errors.totalFloor}</div>
              )}
            </div>

            <div className='input-wrapper preferred_tenant'>
              <label>Preferred Tenant:</label>
              <select
                name='preferredTenant'
                value={formData.preferredTenant}
                onChange={handleChange}>
                <option value=''>Select Preferred Tenant</option>
                <option value='FAMILY'>Family</option>
                <option value='BACHELORS'>Bachelors</option>
              </select>
              {errors.preferredTenant && (
                <div className='error-info'>* {errors.preferredTenant}</div>
              )}
            </div>
          </div>
          <div className='form-part-two'>
            <div className='input-wrapper parking_type'>
              <label>Parking Type:</label>
              <select
                name='parkingType'
                value={formData.parkingType}
                onChange={handleChange}>
                <option value=''>Select Parking Type</option>
                <option value='car'>Car</option>
                <option value='bike'>Bike</option>
              </select>
              {errors.parkingType && (
                <div className='error-info'>* {errors.parkingType}</div>
              )}
            </div>

            <div className='input-wrapper furnished'>
              <label>Furnished:</label>
              <select
                name='furnished'
                value={formData.furnished}
                onChange={handleChange}>
                <option value=''>Select Furnished Type</option>
                <option value='semi-furnished'>Semi-Furnished</option>
                <option value='full-furnished'>Full-Furnished</option>
                <option value='not-furnished'>Not-Furnished</option>
              </select>
              {errors.furnished && (
                <div className='error-info'>* {errors.furnished}</div>
              )}
            </div>
            <div className='input-wrapper bhk-type'>
              <label>BHK Type:</label>
              <select
                name='bhkType'
                value={formData.bhkType}
                onChange={handleChange}>
                <option value=''>Select BHK Type</option>
                <option value='1'>1 BHK</option>
                <option value='2'>2 BHK</option>
                <option value='3'>3 BHK</option>
              </select>
              {errors.bhkType && (
                <div className='error-info'>* {errors.bhkType}</div>
              )}
            </div>

            <div className='input-wrapper bathrooms'>
              <label>Bathrooms:</label>
              <select
                name='bathrooms'
                value={formData.bathrooms}
                onChange={handleChange}>
                <option value=''>Select Number of Bathrooms</option>
                <option value='1'>1 Bathroom</option>
                <option value='2'>2 Bathrooms</option>
                <option value='3'>3 Bathrooms</option>
              </select>
              {errors.bathrooms && (
                <div className='error-info'>* {errors.bathrooms}</div>
              )}
            </div>
            <div className='input-wrapper age_of_property'>
              <label>Age of Property:</label>
              <input
                type='number'
                name='ageOfProperty'
                value={formData.ageOfProperty}
                onChange={handleChange}
              />
              {errors.ageOfProperty && (
                <div className='error-info'>* {errors.ageOfProperty}</div>
              )}
            </div>

            <div className='input-wrapper water_supply'>
              <label>Water Supply:</label>
              <input
                type='text'
                name='waterSupply'
                value={formData.waterSupply}
                onChange={handleChange}
              />
              {errors.waterSupply && (
                <div className='error-info'>* {errors.waterSupply}</div>
              )}
            </div>

            <div className='input-wrapper non_veg_allowed'>
              <label>Non-Veg Allowed:</label>
              <select
                name='isNonVegAllowed'
                value={formData.isNonVegAllowed}
                onChange={handleChange}>
                <option value=''>Select Option</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </select>
              {errors.isNonVegAllowed && (
                <div className='error-info'>* {errors.isNonVegAllowed}</div>
              )}
            </div>

            {/* <div className='input-wrapper owner'>
              <label>Owner name:</label>
              <input
                type='text'
                name='owner'
                value={formData.owner}
                onChange={handleChange}
              />
              {errors.owner && (
                <div className='error-info'>* {errors.owner}</div>
              )}
            </div> */}
            {/* <div className='input-wrapper listed_date'>
              <label>Listed Date:</label>
              <input
                type='date'
                name='listedDate'
                value={formData.listedDate}
                onChange={handleChange}
              />
              {errors.listedDate && (
                <div className='error-info'>* {errors.listedDate}</div>
              )}
            </div> */}

            {/* <div className='input-wrapper availability'>
              <label>Availability:</label>
              <input
                type='text'
                name='availability'
                value={formData.availability}
                onChange={handleChange}
              />
              {errors.availability && (
                <div className='error-info'>* {errors.availability}</div>
              )}
            </div> */}

            <div className='input-wrapper available_from'>
              <label>Available From:</label>
              <input
                type='date'
                name='availableFrom'
                value={formData.availableFrom}
                onChange={handleChange}
              />
              {errors.availableFrom && (
                <div className='error-info'>* {errors.availableFrom}</div>
              )}
            </div>

            <div className='input-wrapper nearby_school'>
              <label>Nearby School:</label>
              <input
                type='text'
                name='nearBySchool'
                value={formData.nearBySchool}
                onChange={handleChange}
              />
              {errors.nearBySchool && (
                <div className='error-info'>* {errors.nearBySchool}</div>
              )}
            </div>

            <div className='input-wrapper nearby_college'>
              <label>Nearby College:</label>
              <input
                type='text'
                name='nearByCollege'
                value={formData.nearByCollege}
                onChange={handleChange}
              />
              {errors.nearByCollege && (
                <div className='error-info'>* {errors.nearByCollege}</div>
              )}
            </div>

            <div className='input-wrapper nearby_hospital'>
              <label>Nearby Hospital:</label>
              <input
                type='text'
                name='nearByHospital'
                value={formData.nearByHospital}
                onChange={handleChange}
              />
              {errors.nearByHospital && (
                <div className='error-info'>* {errors.nearByHospital}</div>
              )}
            </div>

            <div className='input-wrapper image'>
              <label>Image:</label>
              <input
                type='file'
                name='image'
                onChange={handleChange}
                className='image-field'
              />
              {errors.image && (
                <div className='error-info'>* {errors.image}</div>
              )}
            </div>
          </div>
        </div>
        <button type='submit' onSubmit={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default RentalForm
