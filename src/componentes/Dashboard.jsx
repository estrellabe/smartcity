import React from 'react';
import { Card, CardTitle, Button, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import airQualityImage from '../img/airQuality.png';
import populationImage from '../img/population.png';
import bycicleImage from '../img/bycicle.png';
import Logout from './Logout';

const Dashboard = ({ onLogout }) => {
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

  const estilo_Titulo = {
    textAlign: "center",
    marginBottom: "20px"
  };

  const cardsData = [
    { title: 'Calidad del aire', image: airQualityImage, route: '/aire' },
    { title: 'Censo por distritos', image: populationImage, route: '/censo' },
    { title: 'Mapa de bicicletas disponibles', image: bycicleImage, route: '/mapa' },
  ];

  return (
    <div div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
        (<Container>
        <Row>
            <Col>
            <Logout onLogout={onLogout} />
            </Col>
        </Row>
        <Row>
            <h1 className="text-center mb-4">Dashboard</h1>
            {cardsData.map((card, index) => (
            <Col sm="4" key={index} className="mb-4">
                <Card body>
                <div style={contenedor_Imagen}>
                    <img src={card.image} alt={card.title} style={estilo_Imagen} />
                </div>
                <CardTitle tag="h5" className="mt-3" style={estilo_Titulo}>{card.title}</CardTitle>
                <Button color="primary" onClick={() => navigate(card.route)}>Ver más</Button>
                </Card>
            </Col>
            ))}
        </Row>
        </Container>)
    </div>
  );
};

export default Dashboard;