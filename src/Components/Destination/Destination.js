import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './Destination.css'

const Destination = () => {
    return (
        <div className="bgBody">
        <Container>
            <div className="row">
            <div className="col-md-4">
        <Form style={{background: '#EFEFEF', padding:'15px', borderRadius:'10px', marginTop: '15px'}}>
            <Form.Group>
                <Form.Label>Pick From</Form.Label>
                <Form.Control type="text" placeholder="From" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Pick To</Form.Label>
                <Form.Control type="text" placeholder="To" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
            </div>
            <div className="col-md-8">
            <h2>this is 8</h2>
            </div>
        </div>
        </Container>
        </div>
    );
};

export default Destination;