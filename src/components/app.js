import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';

import {fetchData}  from './../redux/slice';
import Dashboard from './dash.js';

class App extends Component {
  constructor(props){
    super(props)
    this.getdata = this.getdata.bind(this);
  }
  
  componentDidMount(){
    this.getdata()
  }

  getdata(){
    if (this.props.coords.lat){
      this.props.fetchData([this.props.coords.lat,this.props.coords.lon])
    }else{
      navigator.geolocation.getCurrentPosition( (points)=>{
        this.props.fetchData([points.coords.latitude,points.coords.longitude])
      })
    }
  }

  render(){
    return (
      <div className={'main-container'} >
        {/*Dashboard Header */}
        <div className={'app-name'}><h1>Weather </h1><h3>⚡</h3><h1> Focus</h1></div>

        {(this.props.location)? <Dashboard callback={()=>this.getdata()}/> : <></>}

        {/* Footer */}
        <div className={'footer'}>
          <a href={'https://github.com/nhope123/weather_focus'} rel={"noreferrer"}
              tabIndex={'0'} target={'_blank'}>
              {'Nial '}
          </a>
          &copy; 2021
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    location: state.data.location,
    coords: state.data.coords,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({ fetchData: fetchData }, dispatch );
}
export default connect(mapStateToProps,mapDispatchToProps) (App);
