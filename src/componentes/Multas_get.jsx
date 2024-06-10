import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Leer_Multas() {
    const [Multas, SetMultas] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3001/multas")
            .then((response) => {
                SetMultas(response.data);
    }, []);
});
return (
    <ul>
        {Multas.map((multa) => <li>{multa._id}</li>)}
    </ul>
);
}

