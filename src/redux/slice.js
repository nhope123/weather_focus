import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const axios = require('axios').default;

export const CELCIUS = 'Celcius';
const FAHRENHEIT = 'Fahrenheit';
const URL = 'https://weather-proxy.freecodecamp.rocks/api/current?';
const DAYS = ['Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


const initialState = {
  data:{
    location: '',
    localtime: '',
    description: '',
    currentTemperature: 25,
    icon: '',
    feelTemperature: 20,
    minTemperature: 6,
    maxTemperature: 32,
    sunrise: '',
    sunset: '',
  },
  temperatureUnit: CELCIUS
};

// Temperature conversion
const convert = (value, aString) => {
  console.log(aString );
  //console.log(aString === CELCIUS);
  switch (aString) {
    case CELCIUS:
      // Convert Celcius to Fahrenheit
      return Math.round((value * 9 / 5 + 32))
    case FAHRENHEIT:
      // convert Fahrenheit to Celcius
      return Math.round(((value - 32) * (5/9)))
    default:
      console.log('Temperature conversion error');
  }
};

// Format time
const getTime = (time) =>{
  var result = (time.getHours() > 12)? `${time.getHours()%12}:${time.getMinutes()}pm`:
                `${time.getHours()}:${time.getMinutes()}am`;
  return result;
}

// Format the date and time for MM DD YYYY HH:MM
const getDateTime = ()=>{
  const instance = new Date();
  return `${DAYS[instance.getDay()]} ${MONTHS[instance.getMonth()]} ${instance.getDate()}, ${instance.getFullYear()} ${getTime(instance)}`
}

// Fetching weather data
export const fetchData = createAsyncThunk(
  'weather/dataStatus',
  async (arg, thunkApi)=>{
    let response;
    response =  await axios.get(`${URL}lat=${arg[0]}&lon=${arg[1]}`)

    return await response
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers:{
    tempConvert(state){
        const temp = state.temperatureUnit;
        state.data.currentTemperature = convert(state.data.currentTemperature,temp);
        state.data.feelTemperature = convert(state.data.feelTemperature,temp);
        state.data.minTemperature = convert(state.data.minTemperature,temp);
        state.data.maxTemperature = convert(state.data.maxTemperature,temp);
        state.temperatureUnit = (state.temperatureUnit === CELCIUS)? FAHRENHEIT : CELCIUS;
    }
  },
  extraReducers:{
    [fetchData.fulfilled]: (state, action)=>{
      const data = action.payload.data;
      state.data.location = `${data.name},${data.sys.country}`;
      state.data.description = data.weather[0].description;
      state.data.icon = data.weather[0].icon;
      state.data.currentTemperature = Math.round(data.main.temp);
      state.data.feelTemperature = Math.round(data.main.feels_like);
      state.data.minTemperature = Math.round(data.main.temp_min);
      state.data.maxTemperature = Math.round(data.main.temp_max);
      state.data.sunrise = getTime(new Date(data.sys.sunrise * 1000));
      state.data.sunset = getTime(new Date(data.sys.sunset * 1000));
      state.data.localtime = getDateTime();
    },
    [fetchData.rejected]: (state, action)=>{
      console.log(action.error.message);
    }
  }
});

export const {tempConvert} = weatherSlice.actions;
export default weatherSlice.reducer;
