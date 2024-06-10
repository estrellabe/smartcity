import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
            localStorage.setItem("token", token);
        } else {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                const decodedUser = jwtDecode(savedToken);
                setUser(decodedUser);
            } else {
                navigate("/login");
            }
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser({});
        navigate("/login"); // ToDo: Cambiar "/login" por la ruta siguiente
    };

    if (!user){
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>¡Hola, {user.displayName}!</h1>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
}

export default Dashboard;
