import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout'; // Botón de cerrar sesión
import Atras from './Atras'; // Botón de volver atrás

const Profile= () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setError("No se ha iniciado sesión");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:3000/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data');
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    
    if (error) {
        return (
            <div style={{ backgroundColor: "#f8f9fa", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ marginBottom: "20px" }}>{error}</div>
                {error === 'No se ha iniciado sesión' && (
                    <Button color="primary" onClick={() => navigate('/login')}>Ir a Login</Button>
                )}
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#f8f9fa", height: "100vh", padding: "20px" }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <Logout /> {/* Botón de cerrar sesión */}
            </div>
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Atras /> {/* Botón Atras */}
            </div>
            <Card style={{ width: "300px", margin: "auto", textAlign: "center" }}>
                <CardBody>
                    <CardTitle tag="h5">Perfil de Usuario</CardTitle>
                    <CardText><strong>Nombre:</strong> {user.nombre}</CardText>
                    <CardText><strong>Email:</strong> {user.email}</CardText>
                    <CardText><strong>Google ID:</strong> {user.googleID}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default Profile;