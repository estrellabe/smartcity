import React, { useState } from 'react';
import axios from 'axios';

export default function borrar_Multa() {
    const [multaID, setID] = useState(null);

    const handleChange = (event) => {
        setID(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:3001/multas/${multaID}`)
            .then(response => {
                console.log("La multa cuyo ID es " +multaID+ " ha sido eliminada.");
                console.log(response.data);
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Multa ID:
                    <input type="text" ID multa="multa_id" onChange={handleChange} />
                </label>
                <button type="submit">Borrar multa</button>
            </form>
        </div>
    )
}