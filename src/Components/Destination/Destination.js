import React, { useContext, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Map from '../Map/Map';
import './Destination.css'
import fakeData from '../../Data/fakeData.json'
import googleMap from '../images/googlemap.png'
import { UserContext } from '../../App';
import { useParams } from 'react-router';

const Destination = () => {
    const [inputLocation, setInputLocation] = useState({
        from: '',
        to: ''
    });
    const [searchTick, setSearchTick]  = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        setCart(fakeData);
    }, [])
    const {type} = useParams();

    const searchTickets = (e) => {
        setSearchTick(true);
        e.preventDefault();
    }
    const selectedCart = cart.filter(cart => cart.type === type);
    const handleBlur = (e) => {
        if (e.target.name === 'from') {
            const newInput = {...inputLocation};
            newInput.from = e.target.value;
            setInputLocation(newInput); 
        }
        if (e.target.name === 'to') {
            const newInput = {...inputLocation};
            newInput.to = e.target.value;
            setInputLocation(newInput);
        }
    }
    return (
        <div className="bgBody">
        <Container>
            <div>
                <h3 style={{color:'white', textAlign:'right', paddingTop:'15px'}}>Glad to Have You, {loggedInUser.name}</h3>
            </div>

            <div className="row">

            {searchTick 
            ? <div className="col-md-4" style={{alignSelf: 'center' , background: '#EFEFEF', padding:'15px', borderRadius:'10px', marginTop: '15px'}}>
                {
                    selectedCart.map(cart => <h4>Ticket Type: {cart.name}</h4>)
                }
                <h4>Start From: {inputLocation.from}</h4>
                <h4>End To: {inputLocation.to}</h4>
            </div>

            : <div className="col-md-4">
        <Form onSubmit={searchTickets} style={{background: '#EFEFEF', padding:'15px', borderRadius:'10px', marginTop: '15px'}}>
            <Form.Group>
                <Form.Label>Pick From</Form.Label>
                <Form.Control type="text" name='from' placeholder="ANDHARA UNIVERSITY" onBlur={handleBlur}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Pick To</Form.Label>
                <Form.Control type="text" name='to' placeholder="PORT STADIUM AREA AKKAYYAPALEM" onBlur={handleBlur}/>
            </Form.Group>

            <Form.Group controlId="dob">
                <Form.Label>Journey From</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth" />
            </Form.Group>

            <Form.Control type="submit" value="Search Tickets"/>

        </Form>
            </div>}
            <div className="col-md-8 mt-3">
                <Map></Map> <img style={{ width:'100%', height:'100%'}} src={googleMap} alt="" />
            </div>
        </div>
        </Container>
        </div>
    );
};

export default Destination;