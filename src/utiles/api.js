import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001'
});

/* Para añadir a los componentes React:

import api from './api';

export default function getAllMultas() {
    handleSubmit = (event) => {
        event.preventDefault();
        api.get("/multas")
            .then(response => {
                console.log(response.data);
            });
    }
    return (
        <div>
            <button onClick={handleSubmit}>Get all multas</button>
        </div>
    )
}
*/
