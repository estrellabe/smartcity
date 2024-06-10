import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
    const [user, setUser] = useState({});
    const history = useHistory();

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
                history.push("/login");
            }
        }
    }, [history]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser({});
        history.push("/login");
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
