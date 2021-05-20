import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';

import  {tempConvert, fetchData, CELCIUS}  from './redux/slice';
import dayIcon from './assets/day_icon.png';
import refreshIcon from './assets/refresh.png';

class App extends Component {
  constructor(props){
    super(props)
    this.getdata = this.getdata.bind(this);
  }

  componentDidMount(){
    this.getdata()
  }

  getdata(){
    navigator.geolocation.getCurrentPosition( (points)=>{
      this.props.fetchData([points.coords.latitude,points.coords.longitude])
    })
  }

  render() {
    let symbol = (this.props.temperatureUnit === CELCIUS)? 'C': 'F';
    return (
      <div className={'main-container'} >
        <div><h1>Weather Focus</h1></div>
        <div className={'app-container'} >
          <div >{`Location:${this.props.location}`}</div>
          <div >
            <div tabIndex={'0'} onClick={this.props.convert} >{`Temperature:${this.props.currentTemperature}°${symbol}`}</div>
            <div >
              <img src={this.props.icon} alt={'Weather Forcast'} />
              <div>{this.props.description}</div>
            </div>
            <div >
              <div >{`Feels Like: ${this.props.feelTemperature}°${symbol}`} </div>
              <div > {`${this.props.maxTemperature}°/${this.props.minTemperature}°`}</div>
            </div>
            <div >

              <div >
                <img src={dayIcon} alt={'Day and nigth icon'} />
              </div>
              <div > {`${this.props.sunrise} | ${this.props.sunset}`} </div>
            </div>
            <div >
              <img src={refreshIcon} alt={'Refresh button'} tabIndex={'0'} onClick={()=>this.getdata()} />
            </div>
          </div>
        </div>
        <div><a href={'https://github.com/nhope123/weather_focus'} rel={"noreferrer"} tabIndex={'0'} target={'_blank'}>Nial</a> &copy; 2021</div>


      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    location: state.data.location,
    currentTemperature:state.data.currentTemperature,
    description:state.data.description,
    icon: state.data.icon,
    feelTemperature: state.data.feelTemperature,
    minTemperature: state.data.minTemperature,
    maxTemperature: state.data.maxTemperature,
    sunrise: state.data.sunrise,
    sunset: state.data.sunset,
    temperatureUnit: state.temperatureUnit
  }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    fetchData: fetchData,
    convert: tempConvert
    },
    dispatch
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
