import React, { Component } from 'react';
import Weather from "./components/Weather"
class App extends Component {
  // url https://api.openweathermap.org/data/2.5/weather?q=kathmandu&units=metric&APPID=e7704bc895b4a8d2dfd4a29d404285b6

  // with city name and country name
  // https://api.openweathermap.org/data/2.5/weather?q=nepal,nepal&appid=e7704bc895b4a8d2dfd4a29d404285b6

  // for icon
  // https://openweathermap.org/img/wn/10d@2x.png
  // https://openweathermap.org/img/wn/{icon name here}@2x.png
  render() {
    return (
      <div className=' min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 grid place-items-center'>
        <Weather />
      </div>
    )
  }
}

export default App;