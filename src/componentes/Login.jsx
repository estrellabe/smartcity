import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardTitle, CardText, Media } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import config from "../config";
import MyImgLogin from "../img/login.png";
import axios from "axios";

var imgStyle = {
    width: "100%",
    height: "100%",
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


const Login = () => {
    const [loginMessage, setLoginMessage] = useState(null);
    const navigate = useNavigate();

    const onSuccess = async (res) => {
        try {
          const token = res.credential;
          const user = jwtDecode(token);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('name', user.name);
          await axiosInstance.post('/auth/google', { token });
          navigate('/dashboard');
        } catch (error) {
          setLoginMessage('Error al iniciar sesión');
          console.error('Login Error:', error);
        }
      };
    
      const onError = () => {
        console.log('[Login Failed]');
      };
    
      return (
        <Container>
          <Row>
            <Col>
              <Card
                inverse
                body
                className="text-center"
                style={{ backgroundColor: '#000', borderColor: '#000' }}
              >
                <CardTitle tag="h5">Welcome to SmartCity</CardTitle>
                <CardText>React-based SmartCity project</CardText>
                <CardText>
                  <GoogleOAuthProvider clientId={config.clientID}>
                    <GoogleLogin auto_select onSuccess={onSuccess} onError={onError} useOneTap />
                  </GoogleOAuthProvider>
                  {loginMessage}
                </CardText>
                <Media style={imgStyle} object src={MyImgLogin} alt="Login" />
              </Card>
            </Col>
          </Row>
        </Container>
      );
    };
    
export default Login;