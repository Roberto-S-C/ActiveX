import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Country, State, City } from 'country-state-city'
import Select from 'react-select'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router'

function AddressForm({ onSubmit, setAlertDetails, setShowAlert, address, setShowAddressForm }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [stateOptions, setStateOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])

    const [cookies, setCookies, remove] = useCookies(['token'])
    const navigate = useNavigate()
    const { id } = useParams()

    const countryOptions = Country.getAllCountries().map(country => ({
        value: country.isoCode,
        label: country.name
    }))

    useEffect(() => {
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry.value).map(state => ({
                value: state.isoCode,
                label: state.name
            }))
            setStateOptions(states)
            setSelectedState(null)
            setCityOptions([])
            setSelectedCity(null)
        }
    }, [selectedCountry])

    useEffect(() => {
        if (selectedState) {
            const cities = City.getCitiesOfState(selectedCountry.value, selectedState.value).map(city => ({
                value: city.name,
                label: city.name
            }))
            setCityOptions(cities)
            setSelectedCity(null)
        }
    }, [selectedState])

    useEffect(() => {
        if (address) {
            setValue('fullName', address.fullName);
            setValue('street', address.street);
            setValue('number', address.number);
            setValue('phone', address.phone);
            setValue('postalCode', address.postalCode);
        }
    }, [address, setValue]);

    return (
        <form
            onSubmit={handleSubmit(data => onSubmit(data, selectedCountry, selectedState, selectedCity, cookies.token, navigate, setAlertDetails, setShowAlert, setShowAddressForm, id))}
            className='flex flex-col justify-around items-center w-full h-full'
        >
            <div className='flex flex-col w-11/12 md:w-4/5 lg:w-2/3'>
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register('fullName', {
                        required: 'Full Name is required',
                        maxLength: { value: 60, message: "Name can't be more than 60 characters." }
                    })}
                    className='w-full mt-4 md:mt-0 border-b-2 border-slate-400 text-2xl font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                />
                {errors.fullName && <p className='text-red-600'>{errors.fullName.message}</p>}
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <input
                    type="text"
                    placeholder="Street"
                    {...register('street', {
                        required: 'Street is required',
                        maxLength: { value: 100, message: "Street can't be more than 100 characters." }
                    })}
                    className='w-full border-b-2 border-slate-400 text-2xl font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                />
                {errors.street && <p className='text-red-600'>{errors.street.message}</p>}
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <input
                    type="text"
                    placeholder="Building Number"
                    {...register('number', {
                        required: 'Number is required',
                        maxLength: { value: 7, message: "Number can't be more than 7 characters." }
                    })}
                    className='w-full border-b-2 border-slate-400 text-2xl font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                />
                {errors.number && <p className='text-red-600'>{errors.number.message}</p>}
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <input
                    type="text"
                    placeholder="Phone"
                    {...register('phone', {
                        required: 'Phone is required',
                        maxLength: { value: 15, message: "Phone can't be more than 15 characters." }
                    })}
                    className='w-full border-b-2 border-slate-400 text-2xl font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                />
                {errors.phone && <p className='text-red-600'>{errors.phone.message}</p>}
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <input
                    type="text"
                    placeholder="Postal Code"
                    {...register('postalCode', {
                        required: 'Postal Code is required',
                        maxLength: { value: 9, message: "Zip code can't be more than 9 characters." }
                    })}
                    className='w-full border-b-2 border-slate-400 text-2xl font-bold text-slate-400 hover:border-red-600 focus:text-red-600 outline-transparent'
                />
                {errors.postalCode && <p className='text-red-600'>{errors.postalCode.message}</p>}
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Select Country"
                    styles={{
                        dropdownIndicator: (provided) => ({
                            ...provided,
                            color: '#dc2626',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#e8ecf4' : state.isFocused ? '#e8ecf4' : undefined,
                            color: state.isSelected ? 'white' : 'black',
                        }),
                    }}
                />
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <Select
                    options={stateOptions}
                    value={selectedState}
                    onChange={setSelectedState}
                    placeholder="Select State"
                    isDisabled={!selectedCountry}
                    styles={{
                        dropdownIndicator: (provided) => ({
                            ...provided,
                            color: '#dc2626',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#e8ecf4' : state.isFocused ? '#e8ecf4' : undefined,
                            color: state.isSelected ? 'white' : 'black',
                        }),
                    }}
                />
            </div>

            <div className='w-11/12 md:w-4/5 lg:w-2/3'>
                <Select
                    options={cityOptions}
                    value={selectedCity}
                    onChange={setSelectedCity}
                    placeholder="Select City"
                    isDisabled={!selectedState}
                    styles={{
                        dropdownIndicator: (provided) => ({
                            ...provided,
                            color: '#dc2626',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#e8ecf4' : state.isFocused ? '#e8ecf4' : undefined,
                            color: state.isSelected ? 'white' : 'black',
                        }),
                    }}
                />
            </div>

            <input type="submit" className='w-2/3 md:w-1/3 mt-4 md:mt-0 p-3 text-2xl rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer' />
        </form>
    )
}

export default AddressForm