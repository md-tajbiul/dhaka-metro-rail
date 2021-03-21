import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './NavBar.css'
import img from '../images/Metro-Rai.png'

const NavBar = () => {
    return (
        <div style={{background:'transparent'}}>
            <Navbar collapseOnSelect expand="lg">
              <Navbar.Brand href="/home"><img className='imagesizing' src={img} alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/destination/one-day-pass">Destination</Nav.Link>
                <Nav.Link href="/blog">BLog</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;