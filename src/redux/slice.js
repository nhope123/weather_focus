import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const axios = require('axios').default;

const URL = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139'
const CELCIUS = 'Celcius';
const FAHRENHEIT = 'Fahrenheit';

const initialState = {
  data:{
    location: '',
    currentTemperature: '',
    icon: '',
    feelTemperature: '',
    minTemperature: '',
    maxTemperature: '',
    sunrise: '',
    sunset: '',
  },
  temperatureUnit: CELCIUS
};

// Fetching weather data
export const fetchData = createAsyncThunk(
  'weather/dataStatus',
  async (arg,thunkApi) => {
    console.log('in function');
    /*if(navigator.geolocation){
      console.log(navigator.geolocation.getCurrentPosition());
    }*/
    const response = await axios.get(`${URL}`)
    return response;
  }
)


// Temperature conversion
const convert = (value, aString) => {
  switch (aString) {
    case CELCIUS:
      // Convert Celcius to Fahrenheit
      return (value *(5/9) + 32)
    case FAHRENHEIT:
      // convert Fahrenheit to Celcius
      return ((value - 32)/ (5/9))
    default:
      console.log('Temperature conversion error');
  }
}


const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers:{
    convert(state){
        const temp = state.data.temperatureUnit;
        state.data = {
                      ...state.data,
                      currentTemperature: convert(state.data.currentTemperature,temp),
                      feelTemperature: convert(state.data.feelTemperature,temp),
                      minTemperature: convert(state.data.minTemperature,temp),
                      maxTemperature: convert(state.data.maxTemperature,temp),
      }
      state.temperatureUnit = (state.temperatureUnit === CELCIUS)? FAHRENHEIT : CELCIUS;
    }
  },
  extraReducers:{
    [fetchData.fulfilled]: (state, action)=>{
      console.log('action.payload');
    },
    [fetchData.rejected]:(state, action)=>{
      console.log('action.payload');
    },

  }
});

export const { convert, } = weatherSlice.actions;
export default  weatherSlice.reducer;
