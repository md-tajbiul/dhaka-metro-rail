import { Container } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
import { Form } from 'react-bootstrap';
import './Login.css'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';


if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        photo: '',
        password: '',
        rePassword: '',
        address: '',
        error: '',
        emailError: '',
        creationSuccess: false
    })
    const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    console.log(result)
    const {displayName, email} = result.user;
    const signedInUser = {name: displayName, email};
    setLoggedInUser(signedInUser);
    history.replace(from);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    }
    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
      console.log(result)
    const {displayName, email} = result.user;
    const signedInUser = {name: displayName, email};
    setLoggedInUser(signedInUser);
    history.replace(from);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    }
    const handleGithubSignIn = () => {
        var githubProvider = new firebase.auth.GithubAuthProvider();
        firebase.auth()
  .signInWithPopup(githubProvider)
  .then((result) => {
    console.log(result)
    const {displayName, email} = result.user;
    const signedInUser = {name: displayName, email};
    setLoggedInUser(signedInUser);
    history.replace(from);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    }
    const errorHandler = (errorField, errorMessage) => {
        const newUser = {...user};
        newUser[errorField] = errorMessage;
        setUser(newUser);
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            !isFieldValid && errorHandler('emailError', 'Please Enter a valid Email');
        }
        if (e.target.name === 'rePassword') {
            const isPassSixPlus = e.target.value.length > 5;
            const isPassHasNumb = /\d{1}/.test(e.target.value);
            const passMatched = user.password === e.target.value;
            isFieldValid = isPassHasNumb && isPassSixPlus && passMatched;
            !isFieldValid && errorHandler('passError', 'Re-Password does not match');
        }
        if (e.target.name === 'password') {
            const isPassSixPlus = e.target.value.length > 5;
            const isPassHasNumb = /\d{1}/.test(e.target.value);
            isFieldValid = isPassHasNumb && isPassSixPlus;
            !isFieldValid && errorHandler('passLength', 'Must provide a number & at least 6 digits');
        }
        if (isFieldValid) {
            const newUser = {...user};
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.name && user.password === user.rePassword && user.email) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then( res => {
            const newUser = {...user};
            newUser.error = '';
            newUser.creationSuccess = true;
            setUser(newUser);
            setLoggedInUser(res.user);
            history.replace(from);
        })
        .catch(error => {
            const newUser = {...user};
            newUser.error = error.message;
            newUser.creationSuccess = false;
            setUser(newUser);
        });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(res => {
            const newUser = {...user};
            newUser.error = '';
            newUser.creationSuccess = true;
            setUser(newUser);
            setLoggedInUser(res.user);
            history.replace(from);
        })
        .catch((error) => {
            const newUser = {...user};
            newUser.error = error.message;
            newUser.creationSuccess = false;
            setUser(newUser);
            setLoggedInUser(newUser);
        });
        }
        e.preventDefault();
    }
    return (
        <div className='bgBody'>
            <Container className='form'>
                <h4 style={{color:'red', textAlign:'center'}}>{user.error}</h4>
                <h4 style={{color:'red', textAlign:'center'}}>{user.emailError}</h4>
            <Form onSubmit={handleSubmit}>
            {newUser && <Form.Group controlId="formGridFullName">
                <Form.Label className='textWhite'>Name*</Form.Label>
                <Form.Control onBlur={handleBlur} required name="name"placeholder="Enter Your Full Name" />
            </Form.Group>}

            <Form.Group controlId="formGridEmail">
                <Form.Label className='textWhite'>Email*</Form.Label>
                <Form.Control onBlur={handleBlur} required type="email" name="email" placeholder="Enter email"/>
            </Form.Group>

            <Form.Group controlId="formGridPassword">
                <Form.Label className='textWhite'>Password* (Must provide a number & at least 6 digits)</Form.Label>
                <Form.Control onBlur={handleBlur} type='password' required name="password" placeholder="Password"/>
            </Form.Group>

            {newUser && <Form.Group controlId="formGridPassword">
                <Form.Label className='textWhite'>Re-entry Your Password*</Form.Label>
                <Form.Control onBlur={handleBlur} type='password' required name="rePassword" placeholder="Re-enter Your Password"/>
            </Form.Group>}

            {newUser && <Form.Group controlId="formGridAddress">
                <Form.Label className='textWhite'>Address</Form.Label>
                <Form.Control onBlur={handleBlur} placeholder="1234 Main St" name="address"/>
            </Form.Group>}

            <Form.Control style={{width: '100px',color: 'white', background: '#aaa'}} variant="secondary" type="submit" value={newUser ? 'Signup' : 'Login'} />

            <p style={{color:'white', paddingTop:'15px'}}>Don't have an account? Check Me <input onChange={() => setNewUser(!newUser)} type="checkbox" name="new?User" id=""/></p>
            </Form>
            <div className="icons">
                <p>Signup with-</p>
                <li className="iconStyle" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} size="2x"/></li>
                <li className="iconStyle" onClick={handleFbSignIn}><FontAwesomeIcon icon={faFacebook} size="2x"/></li>
                <li className="iconStyle" onClick={handleGithubSignIn}><FontAwesomeIcon icon={faGithub} size="2x"/></li>
            </div>
            </Container>
            {user.creationSuccess && <h4 style={{color:'green', textAlign:'center', paddingTop:'15px'}}>User {newUser ?'Created' : 'Login'} Successfully</h4>}
        </div>
    );
};

export default Login;