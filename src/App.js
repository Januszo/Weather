import React from 'react';
import './App.css';
import SearchCity from './SearchCity';
import ViewWeather from './ViewWeather';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';

class App extends React.Component {
  state = {
    city: '',
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
    error: '',
  };

  searchData = (city, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error) => {
      this.setState({
        city: city, lon: lon, lat: lat, temp: temp, temp_min: temp_min, temp_max: temp_max, 
        humidity: humidity, pressure: pressure, speed: speed, deg: deg, rain1h: rain1h, error: error
      })
  };

//   logger = () => {
//     console.log(this.state)
// }

  render() {
    const { city, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <SearchCity searchData={this.searchData} />
          <ViewWeather city={city} lon={lon} lat={lat} temp={temp} temp_min={temp_min} 
          temp_max={temp_max} humidity={humidity} pressure={pressure} speed={speed} 
          deg={deg} rain1h={rain1h} error={error}/>
          {/* <Button onClick={this.logger}>Logger app state</Button> */}
        </Row>
      </Container>
    )
  }
}

export default App;
