import {useDispatch, useSelector} from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import fetchWeatherAction from "../redux/slices/weather/weatherThunk";
import './weatherApp.scss';


function WeatherApp() {
    const [cityName, setCityName] = useState('jaipur');
    const dispatch = useDispatch();

    const handleCityName = (value) => {
        setCityName(value);
    }
    useEffect(()=>{
        dispatch(fetchWeatherAction('jaipur'));
    }, []);

    const state = useSelector(state => state);
    const {weather, loading, error } = state;
    console.log('state', state)


    // const handleWeather = async () => {
    //     await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=70796e6346b6279389b2c9bb362df985&units=metric`)
    //         .then((res) => {
    //             setWeatherDetails(res.data)
    //             dispatch
    //             console.log('weather', weatherDetails)
    //         })

    // }

    return (
        <div className="weatherWrap">
            <div className='weatherTitle'>
                <h3>Weather Forecast</h3>
            </div>

            <div className='weatherInputWrap'>
                <TextField id="outlined-basic" label="Enter City Name" variant="outlined" value={cityName} onChange={(event) => handleCityName(event.target.value)} />

                <Button variant="contained" onClick={() => dispatch(fetchWeatherAction(cityName))}>Search</Button>
            </div>
            {weather &&
                <div className='weatherDisplay'>
                    <div className='weatherEle'>City Name :-  {weather.name}</div>
                    <div className='weatherEle'>Temperature :-  {weather.main.temp}°C</div>
                    <div className='weatherEle'>Description :- {weather.weather[0].description}
                        <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
                    </div>
                </div>
            }
        </div>
    );
}

export default WeatherApp;