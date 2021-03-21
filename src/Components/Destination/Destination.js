import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Map from '../Map/Map';
import './Destination.css'
import googleMap from '../images/googlemap.png'
import { UserContext } from '../../App';

const Destination = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const buyTickets = (e) => {
        alert('Your purchase has been successfully placed. Thank You!')
        e.preventDefault();
    }
    return (
        <div className="bgBody">
        <Container>
            <div>
                <h3 style={{color:'white', textAlign:'right', paddingTop:'15px'}}>Glad to Have You, {loggedInUser.name}</h3>
            </div>
            <div className="row">
            <div className="col-md-4">
        <Form style={{background: '#EFEFEF', padding:'15px', borderRadius:'10px', marginTop: '15px'}}>
            <Form.Group>
                <Form.Label>Pick From</Form.Label>
                <Form.Control type="text" value="ANDHARA UNIVERSITY" placeholder="From" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Pick To</Form.Label>
                <Form.Control type="text" value="PORT STADIUM AREA AKKAYYAPALEM" placeholder="To" />
            </Form.Group>

            <Form.Group controlId="dob">
                <Form.Label>Journey From</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth" />
            </Form.Group>

            <Button variant="primary" onClick={buyTickets} type="submit">
                Buy Now
            </Button>
        </Form>
            </div>
            <div className="col-md-8">
                <Map></Map> || <img style={{ width:'100%', height:'100%'}} src={googleMap} alt="" />
            </div>
        </div>
        </Container>
        </div>
    );
};

export default Destination;