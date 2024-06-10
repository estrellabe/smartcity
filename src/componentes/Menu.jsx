import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from "reactstrap";
import userProfileImage from "../img/userProfile.png";
import loginImage from "../img/login.png";
import dashboardImage from "../img/dashboard.png";
import Logout from "./Logout";
import Atras from "./Atras";

const Menu = () => {
    const navigate = useNavigate();

    const contenedor_Imagen = {
        width: "150px%",
        height: "150px",
        borderRadius: "50%",
        overflow: "hidden",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const estilo_Imagen = {
        width: "70%",
        height: "70%",
        objectFit: "contain",
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", height: "100vh", padding: "20px" }}>
            {/* Botón de cerrar sesión */}
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <Logout />
            </div>
            {/* Botón atrás */}
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Atras />
            </div>
            <h2 className="text-center mb-4">Menu de City+</h2>
            <Row>
            <Col sm="4">
                    <Card>
                        <div style={contenedor_Imagen}>
                            <img alt="Login" src={loginImage} style={estilo_Imagen} />
                        </div>
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Iniciar Sesión</CardTitle>
                            <CardText>Inicia sesión en tu cuenta.</CardText>
                            <Button color="warning" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="4">
                    <Card>
                        <div style={contenedor_Imagen}>
                            <img alt="User Profile" src={userProfileImage} style={estilo_Imagen} />
                        </div>
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Perfil de Usuario</CardTitle>
                            <CardText>Gestiona tu perfil de usuario.</CardText>
                            <Button color="warning" onClick={() => navigate('/userprofile')}>Ir al Perfil</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="4">
                    <Card>
                        <div style={contenedor_Imagen}>
                            <img alt="Dashboard" src={dashboardImage} style={estilo_Imagen} />
                        </div>
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Dashboard</CardTitle>
                            <CardText>Accede al panel de control</CardText>
                            <Button color="warning" onClick={() => navigate('/dashboard')}>Ir al Dashboard</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Menu;
