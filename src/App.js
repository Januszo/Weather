import React from 'react';
import './App.css';
import SearchCity from './SearchCity';
import ViewWeather from './ViewWeather';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

class App extends React.Component {
  state = {
    city: '',
    tempCity: '',
    lon: '',
    lat: '',
    temp: '',
    temp_min: '',
    temp_max: '',
    humidity: '',
    pressure: '',
    speed: '',
    deg: '',
    rain1h: '',
    error: false,
    imBusy: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getData();
}

  getData = () => {
      this.setState({imBusy: true});
      const api = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=05508bb378ad891b493b0c886cca7a57`; 
      axios.get(api)
      .then(res => {
          const coord = res.data.coord;
          const main = res.data.main;
          const wind = res.data.wind;
          const lon = coord.lon;
          const lat = coord.lat;
          const temp = main.temp;
          const temp_min = main.temp_min;
          const temp_max = main.temp_max;
          const humidity = main.humidity;
          const pressure = main.pressure;
          const speed = wind.speed;
          const deg = wind.deg;
          let rain1h = '';
          if (res.data.rain === undefined) { rain1h = 'no rain'} else { rain1h = Object.values(res.data.rain)[0] };
          this.setState({
              lon: lon, lat: lat, temp: temp, temp_min: temp_min, temp_max: temp_max, 
              humidity: humidity, pressure: pressure, speed: speed, deg: deg, rain1h: rain1h, error: false
          })
      })
      .catch(err => {
          this.setState({error: true});
          console.log(err);
      })
      .finally(res => {
          this.setState(prevState=>({
            city: '', tempCity: prevState.city, imBusy: false 
          }))
      });
  }

    handleCityChange = e => {
      this.setState({city: e.target.value});
  }

render() {
    const { city, tempCity, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error, imBusy } = this.state;
    const loader = <div id="loaderBox" className="loader-box"><div className="lds-ripple"><div></div><div></div></div></div>
    return (
      <Container className="main-container">
        {imBusy && loader}
        <Row>
          <h1>Weather app</h1>
          <SearchCity city={city} handleSubmit={this.handleSubmit} handleCityChange={this.handleCityChange} />
        </Row>
        <br /><br />
        <Row>
          <ViewWeather tempCity={tempCity} lon={lon} lat={lat} temp={temp} temp_min={temp_min} 
          temp_max={temp_max} humidity={humidity} pressure={pressure} speed={speed} 
          deg={deg} rain1h={rain1h} error={error}/>
        </Row>
      </Container>
    )
  }
}

export default App;