import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';

import  {tempConvert}  from './../redux/slice';
import {TopDisplay, BottomDisplay} from './pieces.js';
import refreshIcon from './../assets/refresh.png';

class Dashboard extends Component {
  render() {
    let topvalues = { location: this.props.location, icon: this.props.icon,
                      description: this.props.description, convert:this.props.convert,
                      currentTemperature:this.props.currentTemperature,
                      maxTemperature:this.props.maxTemperature,
                      minTemperature:this.props.minTemperature,
                      feelTemperature:this.props.feelTemperature
                    };
    let bottomvalues = { sunrise: this.props.sunrise, sunset: this.props.sunset,
                         time: this.props.time
                       };

    return (
        <div className={'app-container'} >

          {/*Top Display  */}
          <TopDisplay {...topvalues} />

          {/*Bottom Display  */}
          <BottomDisplay {...bottomvalues} />

          {/* Reset button */}
          <div className={'reset'} tabIndex={'0'} onClick={this.props.callback} >
            <img tabIndex={'0'} src={refreshIcon} alt={'Reset icon'} />
          </div>
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
    time: state.data.localtime,
    temperatureUnit: state.temperatureUnit
  }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    convert: tempConvert
    },
    dispatch
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
