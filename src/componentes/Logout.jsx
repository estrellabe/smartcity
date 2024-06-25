import React from "react";
import { Button } from "reactstrap";

const Logout = ({onLogout}) => {

    const handleLogout = () => {
        // Eliminar el token de sesión
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        // Mostrar una página con el mensaje "Has cerrado sesión" y un botón para volver a la página de inicio
        onLogout();
    };

    return (
        <Button color="danger" onClick={handleLogout} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Cerrar sesión
        </Button>
    );
};
export default Logout;