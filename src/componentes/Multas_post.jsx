import React, {useState} from "react";
import axios from "axios";

export default function añadir_multa() {
    const [MultaID, SetID] = useState(null);

    const handleChange = (event) => {
        SetID(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const multa = {
            multa_id: MultaID
        };
        axios.post("http://localhost:3001/multas", multa)
            .then(response => {
                console.log("La multa cuyo ID es: " +MultaID+" ha sido añadida.");
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
                <button type="submit">Añadir multa</button>
            </form>
        </div>
    )
}

