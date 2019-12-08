import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class ViewWeather extends React.Component {
    render() {
        let { tempCity, lon, lat, temp, temp_min, temp_max, humidity, pressure, speed, deg, rain1h, error } = this.props;

        if (tempCity === '') { return(<div></div>) } 
        else if (error === true) { return(<div>We couldn't find:{" "}{tempCity}</div>)}
        else {
            return(
                <Container>
                    <Row className="justify-content-md-center">
                        Your city: {tempCity}<br />
                        {lon}<br />
                        {lat}<br />
                        {temp}<br />
                        {temp_min}<br />
                        {temp_max}<br />
                        {humidity}<br />
                        {pressure}<br />
                        {speed}<br />
                        {deg}<br />
                        {rain1h}
                    </Row>
                </Container>
            )
        }
    }
}

export default ViewWeather;