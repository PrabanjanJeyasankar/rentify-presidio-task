import React, { useState, useEffect } from 'react'
import './SearchComponent.css'
import { Search } from 'lucide-react'
import axios from 'axios'
import { HiHome } from 'react-icons/hi2'
import { RiHotelBedFill } from 'react-icons/ri'
import { FaLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function SearchComponent() {
    const [cities, setCities] = useState()
    const [propertyType, setPropertyType] = useState('')
    const [bhkType, setBhkType] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [propertyData, setPropertyData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(
                    'https://www.universal-tutorial.com/api/cities/Tamil%20Nadu',
                    {
                        headers: {
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0aGlydUBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJCbGM0LWlYQTFqams3ZUFpeDhtR29MR2FoQXJHaVVXa0JwM1dxRWtwVk9aRkt5WHZZM05iZDdhZ3o0QkxXUVltWUR3In0sImV4cCI6MTcxNjgwNzAxNX0.LAeTTkTwisUNgY-GUT5DLqQEf1FXVhHzcSML8-vLGBA',
                            Accept: 'application/json',
                        },
                    }
                )

                // console.log(response.data)

                if (response.status === 200) {
                    // console.log(response.data)
                    setCities(response.data)
                } else {
                    throw new Error('Failed to fetch countries')
                }
            } catch (error) {
                console.error('Error fetching countries:', error)
            }
        }

        fetchCountries()
    }, [])

    const handlePropertyTypeChange = (e) => {
        setPropertyType(e.target.value)
    }

    const handleBhkTypeChange = (e) => {
        setBhkType(e.target.value)
    }

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchParams = {
            roomType: propertyType,
            bhkType: bhkType,
            city: selectedCity,
        }
        axios
            .post(
                'http://localhost:3500/api/v1/user/property/search',
                searchParams,
                { withCredentials: true }
            )
            .then((response) => {
                if (response.status == 200) {
                    console.log('Search Results:', response.data)
                    setPropertyData(response.data.data)
                    navigate('/result', {
                        state: { propertyData: response.data.data, city: selectedCity, roomType: propertyType, bhkType: bhkType},
                    })

                    // useNavigate
                }
            })
            .catch((error) => {
                console.error('Error submitting search:', error)
            })
    }

    return (
        <div className='form_container'>
            <form onSubmit={handleSubmit}>
                <div className='search_items'>
                    <div className='property_type'>
                        <HiHome size={20} className='home-icon' />
                        <select
                            value={propertyType}
                            onChange={handlePropertyTypeChange}>
                            <option
                                value=''
                                disabled
                                selected
                                hidden
                                className='dropdown-placeholder'>
                                Select home type
                            </option>
                            <option value='apartment'>Apartment</option>
                            <option value='house'>House</option>
                            <option value='office'>Office</option>
                        </select>
                    </div>
                    <div className='bhk_type'>
                        <RiHotelBedFill size={20} className='bed-icon' />
                        <select value={bhkType} onChange={handleBhkTypeChange}>
                            <option
                                value=''
                                disabled
                                selected
                                hidden
                                className='dropdown-placeholder'>
                                Select BHK
                            </option>
                            <option value='1BHK'>1BHK</option>
                            <option value='2BHK'>2BHK</option>
                            <option value='3BHK'>3BHK</option>
                        </select>
                    </div>
                    <div className='location'>
                        <div className='city'>
                            <FaLocationDot
                                size={18}
                                className='location-icon'
                            />
                            <select
                                value={selectedCity}
                                onChange={handleCityChange}>
                                <option
                                    value=''
                                    disabled
                                    selected
                                    hidden
                                    className='dropdown-placeholder'>
                                    Select a city
                                </option>
                                {cities &&
                                    cities.map((item) => (
                                        <option value={item.city_name}>
                                            {item.city_name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className='search'>
                        <button className='search_btn'>
                            <Search size={18} />
                            {/* <span>Search</span> */}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchComponent
