import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fakeData from '../../Data/fakeData.json'
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
                <Card border="light" bg='secondary' className="mb-3" style={{height:'280px'}}>
                <Card.Body>
                    <Card.Text><h3 style={{color:"white"}}>{cart.name}</h3></Card.Text>
                    <Card.Text><p style={{color:"white"}}>{cart.description}</p></Card.Text>
                <Button variant="light"><Link to={`/destination/${cart.type}`}>BUY NOW</Link></Button>
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