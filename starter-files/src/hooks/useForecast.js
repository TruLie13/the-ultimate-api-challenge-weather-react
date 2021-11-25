import { useState } from "react";
import axios from 'axios'

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;





const useForcast = () => {
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [forecast, setForecast] = useState(null)

    const getWoeid = async location => {
        //get woeid
        const { data } = await axios(`${REQUEST_URL}/search`, { params: {query: location} });
        //get weather
        if (!data || data.length === 0) {
            setError('Enter a valid Location');
            return;
        }
        return data
    } 

    const getForecastData = async (woeid) => {
        const {data} = await axios(`${REQUEST_URL}/${woeid}`);
        if (!data || data.length ===0) {
            setError('Something went wrong');
            return;
        }
        return data
    }

    //call the api
    const submitRequest = async location => {
        setLoading(true)
        setError(false)
        const response = await getWoeid(location);
        const data = await getForecastData(response[0].woeid);

        console.log({ data});
    };

    return {
        isError, 
        isLoading, 
        forecast,
        submitRequest,
    };
};

export default useForcast;