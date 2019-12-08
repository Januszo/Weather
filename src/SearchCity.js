import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
    render() {
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Form onSubmit={this.props.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control type="text" placeholder="Type in your city" onChange={this.props.handleCityChange} /> 
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Check the weather!
                        </Button>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default SearchCity;