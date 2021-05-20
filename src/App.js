import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';
//import  {fetchData, convert}  from './redux/slice';
import  {tempConvert, fetchData}  from './redux/slice';

class App extends Component {
  componentDidMount(){
    this.props.fetchData()
  }

  render() {
    return (
      <div className={'main-container'} >
        <div><h1>Weather Focus</h1></div>
        <div className={'app-container'} >
          <div >{`Location:${this.props.location}`}</div>
          <div >
            <div tabIndex={'0'} >{`Temperature:${this.props.currentTemperature}`}</div>
            <div >
              <img src={this.props.icon} alt={'Weather Forcast'} />
            </div>
            <div >
              <div >{`Feels Like: ${this.props.feelTemperature}`} </div>
              <div > Hihs and lows</div>
            </div>
            <div >
              <div >
                <div >
                  <img src={''} alt={'Sunrise'} />
                </div>
                <div >Sunrise time</div>
              </div>
              <div >
                <div >
                  <img src={''} alt={'Sunset'} />
                </div>
                <div >Sunset time</div>
              </div>
            </div>
            <div >
              <span tabIndex={'0'} onClick={this.props.convert}> refresh button</span>
            </div>
          </div>
        </div>
        <div><a href={'#'} tabIndex={'0'}>Nial</a> &copy; 2021</div>


      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    location: state.data.location,
    currentTemperature:state.data.currentTemperature,
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
