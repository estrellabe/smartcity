import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle, CardText, Media } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import config from "./Config";
import logo from "../img/logoReact.png";
import axios from "axios";
import Logout from "./Logout";
import Atras from "./Atras";

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
        <div style={{ backgroundColor: "#f8f9fa", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/*Botón de cerrar sesión*/
          /* To-Do: Posible mejora = que solo aparezca una vez iniciada la sesión */}
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Logout />
          </div>
          {/* Botón atrás */}
          <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Atras />
          </div>
          <Card style={{ width: '300px', padding: '20px', textAlign: 'center' }}>
                <CardTitle tag="h4">Iniciar sesión</CardTitle>
                <CardText>City+ es una app basada en React</CardText>
                <Media style={imgStyle} object src={logo} alt="Login" />
                <CardText>
                  <GoogleOAuthProvider clientId={config.clientID}>
                    <GoogleLogin auto_select onSuccess={onSuccess} onError={onError} useOneTap />
                  </GoogleOAuthProvider>
                  {loginMessage && <p>{loginMessage}</p>}
                </CardText>
          </Card>
      </div>
      );
    };
    
export default Login;