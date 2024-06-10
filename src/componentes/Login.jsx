import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle, CardText, Media } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import config from "./Config";
import loginImage from "../img/login.png";
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
        <div style={{ backgroundColor: "navy", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Card style={{ width: '300px', padding: '20px', textAlign: 'center' }}>
                <CardTitle tag="h4">Iniciar sesión</CardTitle>
                <CardText>City+ es una app basada en React</CardText>
                <Media style={imgStyle} object src={loginImage} alt="Login" />
                <CardText>
                  <GoogleOAuthProvider clientId={config.clientID}>
                    <GoogleLogin auto_select onSuccess={onSuccess} onError={onError} useOneTap />
                  </GoogleOAuthProvider>
                  {loginMessage}
                </CardText>
          </Card>   
      </div>
      );
    };
    
export default Login;