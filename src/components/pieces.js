import React from 'react';

import dayIcon from './../assets/day_icon.png';

// Top half of the Display
export function TopDisplay(props) {
  return (
    <div className={'top-display'} >

      <div className={'top-left'}>
        <div >
          <div ><h3>{props.location.split(',')[0]}</h3></div>
          <div >{props.location.split(',')[1]}</div>
        </div>
        <div >
          <img tabIndex={'0'} src={props.icon} alt={'Weather Forcast'}  />
          <div>{props.description}</div>
        </div>
      </div>

      <div className={'top-right'}>
        <div id={'temp'} tabIndex={'0'} onClick={props.convert} >
                  {`${props.currentTemperature}°`}
        </div>
        <div>
          <div > {`${props.maxTemperature}°/${props.minTemperature}°`}</div>
          <div >{`Feels like ${props.feelTemperature}°`} </div>
        </div>
      </div>
    </div >
  )
}

// Bottom Half of the Display
export function BottomDisplay(props){
  return (
    <div className={'bottom-display'} >
      {/* Rise and Set of Sun */}
      <div >
        <div className={'change'}>
          <img tabIndex={'0'} src={dayIcon} alt={'Day and nigth icon'} />
        </div>
        <div className={'time-change'}>
          <div >{props.sunrise}</div>
          <div >{props.sunset}</div>
        </div>
      </div >

      {/* Date and Time */}
      <div className={'change-end'}>
        <div >{props.time.split(';')[0]}</div >
        <div >{props.time.split(';')[1]}</div >
      </div >
    </div>
  );
}
