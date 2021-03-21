import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fakeData from '../../Data/fakeData.json'
import Map from '../Map/Map';
import './Home.css'

const Home = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        setCart(fakeData);
    }, [])
    return (
        <div className='bgBody'>
        <Container>
        <div className='cartStyle'>
            <h1>Welcome to Dhaka Metro Rail</h1>
            <h2>Buy your tickets and enjoy!</h2>
        <div className='row'>
            {
            cart.map(cart => 
                <div className="col-md-3" key={cart.id}>
                <Card border="light" bg='secondary' className="mb-3" style={{height:'300px'}}>
                <Card.Body>
                    <Card.Text><img src={cart.image} alt=''/></Card.Text>
                    <Card.Text><h3 style={{color:"white", marginTop:'-10px'}}>{cart.type}</h3></Card.Text>
                    <Card.Text><p style={{color:"white"}}>{cart.description}</p></Card.Text>
                <Button style={{marginBottom:'15px'}} variant="light"><Link to="/destination">BUY NOW</Link></Button>
                </Card.Body>
                <Card.Footer><h4 style={{marginTop:'-5px', marginBottom:'-3px', color:"white"}}>{cart.price}</h4></Card.Footer>
                </Card>
                </div>
                    )
                }
            </div>
            </div>
        </Container>
        </div>
    );
};

export default Home;