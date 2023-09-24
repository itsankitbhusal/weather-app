import React, { Component } from 'react';

class Weather extends Component {
  state = {
    searchCity: "kawasoti",
    imgSrc: "",
    error: true,
    dataLoaded: false,
    apiData: {}
  }

  apiCall() {
    const { REACT_APP_API_KEY: apiKey, REACT_APP_BASE_URL: baseUrl } = process.env;

    fetch(`${baseUrl}weather?q=${this.state.searchCity}&&appid=${apiKey}`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({
          apiData: data,
          dataLoaded: true,
          error: false,
          imgSrc: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          dataLoaded: false
        });
      });
  }

  componentDidMount() {
    this.apiCall();
  }

  render() {
    const onChange = (e) => {
      this.setState({
        searchCity: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      this.apiCall();
    };

    return (
      <>
        {this.state.apiData.main && (
          <div className=' bg-white h-[80vh] w-[80vw] rounded drop-shadow-2xl flex justify-between items-center'>
            <div className=' h-full w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white grid place-items-center'>
              <div className=' grid place-items-center'>
                <img src={this.state.imgSrc} alt='api' />
                <h3 className=' text-7xl font-bold'>{Math.round(this.state.apiData.main.temp - 273.15)}&deg;c</h3>
                <p className=' text-4xl font-bold'>{this.state.apiData.name}</p>
                  <div className=' flex justify-between gap-8 mt-4'>
                    <div className='grid place-items-center items-center'>
                      <p className=' font-semibold'>{this.state.apiData.main.humidity}%</p>
                      <p>Humidity</p>
                    </div>
                    <div className=' grid place-items-center items-center'>
                      <p className=' font-semibold'>{this.state.apiData.wind.speed} km/h</p>
                      <p>Wind Speed</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className=' h-auto w-1/2 grid place-items-center'>
              <div>
                <form onSubmit={(e) => handleSubmit(e)} className=' flex gap-4'>
                  <input placeholder='Enter city name' onChange={onChange} name='city' className=' border-b-2 focus:outline-none rounded-sm px-2 py-1'></input>
                  <button type='submit' className=' bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 font-semibold rounded-sm hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700 transition-all'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Weather;
