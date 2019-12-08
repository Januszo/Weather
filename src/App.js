import React from 'react';
import './App.css';
import SearchCity from './SearchCity';
import ViewWeather from './ViewWeather';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

// import Button from 'react-bootstrap/Button';

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
    this.setState({tempCity: [...this.state.city]})
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
          // this.props.searchData(this.state.city, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, this.state.error);
      })
      .catch(err => {
          this.setState({error: true});
          // let { city, error } = this.state;
          console.log(err);
          // this.props.searchData(city, '', '', '', '', '', '', '', '', '', '', error);
      })
      .finally(res => {
          this.setState({
              imBusy: false
          });
      });
  }

    handleCityChange = e => {
      this.setState({city: e.target.value});
  }


//     logger = () => {
//         console.log(this.state)
// }

render() {
    const { city, tempCity, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error, imBusy } = this.state;
    const loader = <div id="loaderBox" className="loader-box"><div className="lds-ripple"><div></div><div></div></div></div>
    return (
      <Container>
        {imBusy && loader}
        <Row className="justify-content-md-center">
          <SearchCity handleSubmit={this.handleSubmit} handleCityChange={this.handleCityChange} />
          <ViewWeather city={city} tempCity={tempCity} lon={lon} lat={lat} temp={temp} temp_min={temp_min} 
          temp_max={temp_max} humidity={humidity} pressure={pressure} speed={speed} 
          deg={deg} rain1h={rain1h} error={error}/>
          {/* <Button onClick={this.logger}>Logger app state</Button> */}
        </Row>
      </Container>
    )
  }
}

export default App;

// searchData = (city, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error) => {
//     this.setState({
//       city: city, lon: lon, lat: lat, temp: temp, temp_min: temp_min, temp_max: temp_max, 
//       humidity: humidity, pressure: pressure, speed: speed, deg: deg, rain1h: rain1h, error: error
//     })
// };