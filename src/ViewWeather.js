import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapContainer from './MapContainer';

class ViewWeather extends React.Component {
    render() {
        let { tempCity, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error } = this.props;
        temp = (temp - 273.15).toFixed(2);
        temp_min = (temp_min - 273.15).toFixed(2);
        temp_max = (temp_max - 273.15).toFixed(2);
        if (tempCity === '') { return(<div></div>) } 
        else if (error === true) { return(<div>We couldn't find:{" "}{tempCity}</div>)}
        else {
            return(
                <Container>
                    <Row>
                        <Col>
                            <h2>Your city: {tempCity}</h2>
                            Longitude: {lon}<br />
                            Latitude: {lat}<br />
                            Current temperature: {temp}<br />
                            Minimum temperature: {temp_min}<br />
                            Maximum temperature: {temp_max}<br />
                            Humidity: {humidity}%<br />
                            Pressure: {pressure}hpa<br />
                            Wind speed: {speed}m/s<br />
                            Wind direction: {deg}<br />
                            Rain: {rain1h}
                        </Col>
                        <Col>
                            <MapContainer lon={lon} lat={lat} />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default ViewWeather;