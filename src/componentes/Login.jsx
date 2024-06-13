import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle, CardText, Media } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import config from "../Config";
import logo from "../img/logoReact.png";
import Logout from "./Logout";
import Atras from "./Atras";

var imgStyle = {
  width: "100%",
  height: "100%",
};


const Login = () => {
  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Estado de sesión

  const onSuccess = async (res) => {
    try {
      const user = jwtDecode(res.credential);
      var email= user.email;
      var name= user.name;
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', name);
      setLoginMessage('Has iniciado sesión');
      setIsLoggedIn(true); //Actualizamos el estado de sesión
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000); //Redirigimos a la página de dashboard tras 5 segundos
      
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
      {isLoggedIn && (
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Logout />
      </div>
      )}
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