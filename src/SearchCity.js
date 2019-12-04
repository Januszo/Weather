import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

// http://api.openweathermap.org/data/2.5/weather?q=Lublin&appid=05508bb378ad891b493b0c886cca7a57

// Nazwie miasta, dla którego jest wyświetlana pogoda
// Położeniu geolokalizacyjnym miasta (latitude, longitude)
// Aktualnej temperaturze w danej chwili
// Zakresie temperatur z danego dnia
// Aktualnej wilgotności oraz ciśnieniu atmosferycznym
// Aktualnych opadach oraz wietrze

// sample response with rain {"coord":{"lon":-73.99,"lat":40.73},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"},{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":272.94,"pressure":1007,"humidity":86,"temp_min":269.82,"temp_max":277.04},"visibility":4828,"wind":{"speed":9.3,"deg":70},"rain":{"1h":0.95},"snow":{"1h":1.32},"clouds":{"all":90},"dt":1575230183,"sys":{"type":1,"id":4698,"country":"US","sunrise":1575201639,"sunset":1575235776},"timezone":-18000,"id":5128581,"name":"New York","cod":200}

// sample response without rain {"coord":{"lon":21.01,"lat":52.23},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"stations","main":{"temp":274.26,"pressure":1021,"humidity":89,"temp_min":271.48,"temp_max":277.04},"visibility":9000,"wind":{"speed":1.5,"deg":190},"clouds":{"all":20},"dt":1575229786,"sys":{"type":1,"id":1713,"country":"PL","sunrise":1575181333,"sunset":1575210471},"timezone":3600,"id":756135,"name":"Warsaw","cod":200}

class SearchCity extends React.Component {
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
        error: false,
        imBusy: false,
    }

    handleCityChange = e => {
        this.setState({city: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.getData();
        // this.setState({city: ''});
    }

    log = l => {
            console.log(l)
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
            this.props.searchData(this.state.city, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, this.state.error);
        })
        .catch(err => {
            this.setState({error: true});
            let { city, error } = this.state;
            console.log(err);
            this.props.searchData(city, '', '', '', '', '', '', '', '', '', '', error);
        })
        .finally(res => {
            this.setState({
                imBusy: false
            });
        });
    }
    
    // logger = () => {
    //     console.log(this.state)
    // }

    render() {
        const loader = <div id="loaderBox" className="loader-box"><div className="lds-ripple"><div></div><div></div></div></div>
        const {imBusy} = this.state;
        return(
            <Container>
                {imBusy && loader}
                <Row className="justify-content-md-center">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control type="text" placeholder="Type in your city" value={this.state.city} onChange={this.handleCityChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Check the weather!
                        </Button>
                    </Form>
                        {/* <Button onClick={this.logger}>Logger</Button> */}
                </Row>
            </Container>
        )
    }
}

export default SearchCity;