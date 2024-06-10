import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token de sesión
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        // Redirigir a la página de inicio de sesión
        navigate('/login');
    };

    return (
        <Button color="danger" onClick={handleLogout}>
            Cerrar sesión
        </Button>
    );
};

export default Logout;