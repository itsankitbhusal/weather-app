import React, { Component } from 'react';
import Card from "./Card"
class Weather extends Component {
  state = {
    searchCity: "kawasoti",
    imgSrc: "",
    error: false,
    isLoading: false,
    dataLoaded: false,
    apiData: {},
    loadMore: false,
  }

  printTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  printTemp = (kelvin) => {
    return Math.round(kelvin - 273.15);
  }

  apiCall() {
    const { REACT_APP_API_KEY: apiKey, REACT_APP_BASE_URL: baseUrl } = process.env;
    this.setState({
      isLoading: true
    })
    fetch(`${baseUrl}weather?q=${this.state.searchCity}&&appid=${apiKey}`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log("data: ", data)
        this.setState({
          apiData: data,
          dataLoaded: true,
          error: false,
          imgSrc: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          isLoading: false
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

    const handleLoadMore = () => {
      this.setState(
        { loadMore: true }
      )
    }
    

    return (
      <>
        {
          this.state.isLoading && !this.state.error && (
            <div className=' absolute left-[50vh] top-5 text-4xl text-white '>
              Loading...
            </div>
          )
        }
        {
          this.state.error && (
            <div className=' absolute left-[50vh] top-5 text-4xl  text-red-200'>
              Error occured!
            </div>
          )
        }
        {this.state.apiData.main && (
          <div className=' bg-white h-[80vh] w-[80vw] rounded drop-shadow-2xl flex justify-between items-center'>
            <div className=' h-full w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white grid place-items-center'>
              <div className=' grid place-items-center'>
                <img src={this.state.imgSrc} alt='api' />
                <h3 className=' text-7xl font-bold'>{this.printTemp(this.state.apiData.main.temp)}&deg;c</h3>
                <p className=' text-4xl font-bold'>{this.state.apiData.name + " "}
                  <span className=' text-blue-900'>
                    {this.state.apiData.sys.country}
                  </span>
                </p>
                <Card
                  firstData={this.printTime(this.state.apiData.sys.sunrise)}
                  firstName={"Sunrise"}
                  secondData={this.printTime(this.state.apiData.sys.sunset)}
                  secondName={"Sunset"}
                />

                <Card
                  firstData={this.state.apiData.main.humidity + "%"}
                  firstName={"Humidity"}
                  secondData={this.state.apiData.wind.speed + "km/h"}
                  secondName={"Wind Speed"}
                />
                {
                  this.state.loadMore && (
                    <div>
                    <Card
                     firstData={`${this.printTemp(this.state.apiData.main.feels_like)}°c`}
                     firstName={"Feels Like"}
                     secondData={this.state.apiData.main.pressure }
                     secondName={"Pressure"}
                      />
                      
                      <Card
                     firstData={`${this.printTemp(this.state.apiData.main.temp_min)}°c`}
                     firstName={"Min Temp"}
                     secondData={`${this.printTemp(this.state.apiData.main.temp_max)}°c`}
                     secondName={"Max Temp"}
                      />
                     </div>
                  )
                }
                {
                  !this.state.loadMore && (
                    <button onClick={handleLoadMore} className='w-full flex justify-end my-4 text-sm underline text-blue-900'>
                      Load More...
                    </button>
                  )
                }
                {
                  this.state.loadMore && (
                    <button onClick={() => {
                      this.setState({
                        loadMore: false
                      })
                    }} className='w-full flex justify-end my-4 text-sm underline text-blue-900'>
                      Show Less...
                    </button>
                  )
                }
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
