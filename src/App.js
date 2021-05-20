import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';
import  {fetchData, convert}  from './redux/slice';

class App extends Component {
  componentDidMount(){
    this.props.fetchData()
  }

  render() {
    return (
      <div className={'main-container'} >
        <div><h1>Weather Focus</h1></div>
        <div className={'app-container'} >
          <div >Location:</div>
          <div >
            <div tabIndex={'0'} >Temperature</div>
            <div >
              <img src={''} alt={'Weather Forcast'} />
            </div>
            <div >
              <div >Feels Like: </div>
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
              <span tabIndex={'0'} onClick={this.props.fetchData}> refresh button</span>
            </div>
          </div>
        </div>
        <div><a href={'#'} tabIndex={'0'}>Nial</a> &copy; 2021</div>


      </div>
    )
  }
}


const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    fetchData: fetchData
    },
    dispatch
  );
}

export default connect(null,mapDispatchToProps)(App);
