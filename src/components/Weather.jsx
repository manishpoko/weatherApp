import React from 'react'
import { useEffect, useState, useRef } from 'react'
import search_icon from '../assets/search.png' 
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(0);
  const allWeatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const searchCity = async(cityName) => {
    if(cityName === '') {
      alert('Please enter a city name'); 
      return;
    }
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      


      const icon = allWeatherIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon
      });

    }
    catch(error) {
      setWeatherData(false);
      console.error(error);
    }
  }
  useEffect(() => {
    searchCity('Mumbai')

  }, [])



  return (
    <div className='min-h-screen flex justify-center  bg-emerald-100'>
        
        
        <div className=' font-bold self-center p-10 rounded-2xl bg-indigo-400 flex flex-col justify-center items-center mb-5'>
            
            <div className='flex items-center gap-3 p-2 w-full'>

                <input
                  ref={inputRef}
                  type='text' 
                  placeholder='search city' 
                  className=' flex-grow p-3 rounded-3xl' 
                />
                <img 
                  src={search_icon}  
                  alt='search icon here' 
                  className='p-3 w-12 h-12 bg-white rounded-full cursor-pointer'
                  onClick={() =>searchCity(inputRef.current.value)}
                />

            

            </div>

            <div
              className=' flex flex-col font-extrabold text-3xl items-center  gap-2  '>
              <img 
                src={weatherData.icon} 
                alt='cloudy image here' 
                className='p-3 w-40 h-40'
              />

              <p > {weatherData.temperature}°C </p>
              <p> {weatherData.location} </p>

            </div>

            <div 
              className='flex w-full p-4 items-center justify-between mt-2'>
              <div 
                className='flex flex-col items-center'>
                <img 
                  src={humidity_icon} 
                  alt='humid' 
                  className='w-10 h-8' >

                </img>

                <p>{weatherData.humidity}%</p>
                <span>humidity</span>
              </div>

              <div 
                className='flex flex-col items-center'>
                <img 
                  src={weatherData.icon} 
                  alt='weather icon' 
                  className='w-10 h-8'>

                </img>

                <p>{weatherData.windSpeed} km/h</p>
                <span>winds</span>
              </div>

            </div>

        </div>

    </div>
  )
}

export default Weather