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
      <div style={{ padding: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', top:0, left: 0, backgroundColor: 'white', zIndex: 1000, padding: '10px 20 px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              <Logout onLogout={onLogout} />
          </div>
          <h1 className="text-center mb-4">Dashboard</h1>
          <Container>
              <Row>
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
          </Container>
      </div>
  );
};

export default Dashboard;