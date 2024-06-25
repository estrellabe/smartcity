import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Card, CardTitle, CardText, Media } from "reactstrap";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"; 
import config from "../Config";
import logo from "../img/logoReact.png";

const imgStyle = {
  width: "100%",
  height: "100%",
};

const Login = ({ onLogin }) => {
  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado de Snackbar

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSuccess = async (res) => {
    try {
      const user = jwtDecode(res.credential);
      const email = user.email;
      const name = user.name;
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('token', res.credential); // Guardamos el token en sessionStorage
      setOpenSnackbar(true); // Mostramos Snackbar
      setTimeout(() => {
        setLoginMessage('¡Has iniciado sesión correctamente!');
        onLogin();
        navigate('/dashboard');
      }, 5000); // Tras 5 segundos
    } catch (error) {
      setOpenSnackbar(true);
      setLoginMessage('Error al iniciar sesión');
      console.error('Login Error:', error);
    }
  };

  const onError = () => {
    console.log('[Login Failed]');
    setOpenSnackbar(true);
    setLoginMessage('Error al iniciar sesión');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Card style={{ width: '300px', padding: '20px', textAlign: 'center' }}>
        <CardTitle tag="h4">Iniciar sesión</CardTitle>
        <CardText>City+ es una app basada en React</CardText>
        <Media style={imgStyle} object src={logo} alt="Login" />
        <CardText>
          <GoogleOAuthProvider clientId={config.clientID}>
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
            <Snackbar open={openSnackbar} autoHideDuration={10000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={loginMessage?.includes('Error') ? "error" : "success"}>
                ¡Has iniciado sesión correctamente!
                {loginMessage}
              </Alert>
            </Snackbar>
          </GoogleOAuthProvider>
        </CardText>
      </Card>
    </div>
  );
};

export default Login;
