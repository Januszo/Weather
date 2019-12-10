import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class SearchCity extends React.Component {
    render() {
        return(
            <Container>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Type in your city" value={this.props.city} onChange={this.props.handleCityChange} /> 
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Check the weather!
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default SearchCity;