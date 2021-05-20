import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const axios = require('axios').default;

export const CELCIUS = 'Celcius';
const FAHRENHEIT = 'Fahrenheit';
const URL = 'https://weather-proxy.freecodecamp.rocks/api/current?';

const initialState = {
  data:{
    location: '',
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
const getTime = (secs) =>{
  var time = new Date(secs * 1000)
  var result = (time.getHours() > 12)? `${time.getHours()%12}:${time.getMinutes()}pm`:
                `${time.getHours()}:${time.getMinutes()}am`;
  return result;
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
      state.data.sunrise = getTime(data.sys.sunrise);
      state.data.sunset = getTime(data.sys.sunset);
    },
    [fetchData.rejected]: (state, action)=>{
      console.log(action.error.message);
    }
  }
});

export const {tempConvert} = weatherSlice.actions;
export default weatherSlice.reducer;
