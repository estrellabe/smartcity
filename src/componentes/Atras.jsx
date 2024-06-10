import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const Atras = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navega hacia atrás en el historial --> Vuelve a la página anterior
    };

    return (
        <Button color="secondary" onClick={handleBack}>
            Atrás
        </Button>
    );
};

export default Atras;