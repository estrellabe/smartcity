import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Logout from "./Logout";
import Atras from "./Atras";

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
        navigate("/menu");
    };

    if (!user){
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {/* Botón de cerrar sesión */}
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <Logout />
            </div>
            {/* Botón atrás */}
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Atras />
            </div>
            <h1>¡Hola, {user.displayName}!</h1>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
}

export default Dashboard;
