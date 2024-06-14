import React, { useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Atras from '../Atras';

// NOTA: SOLO SE ESTÁN CONSIDERANDO LOS DATOS DE LOS 15000 PRIMEROS REGISTROS

const Censo = () => {
  const [censoData, setCensoData] = useState([]);
  const [error] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/censo/all');
        setCensoData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const distritos = [...new Set(censoData.map(item => item.DESC_DISTRITO))];
    const espanolesHombres = distritos.map(distrito => {
      const filtered = censoData.filter(item => item.DESC_DISTRITO === distrito);
      return filtered.reduce((acc, item) => acc + item.EspanolesHombres, 0);
    });
    const espanolesMujeres = distritos.map(distrito => {
      const filtered = censoData.filter(item => item.DESC_DISTRITO === distrito);
      return filtered.reduce((acc, item) => acc + item.EspanolesMujeres, 0);
    });
    const extranjerosHombres = distritos.map(distrito => {
      const filtered = censoData.filter(item => item.DESC_DISTRITO === distrito);
      return filtered.reduce((acc, item) => acc + item.ExtranjerosHombres, 0);
    });
    const extranjerosMujeres = distritos.map(distrito => {
      const filtered = censoData.filter(item => item.DESC_DISTRITO === distrito);
      return filtered.reduce((acc, item) => acc + item.ExtranjerosMujeres, 0);
    });

    return {
      labels: distritos,
      datasets: [
        {
          label: 'Españoles Hombres',
          data: espanolesHombres,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Españoles Mujeres',
          data: espanolesMujeres,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Extranjeros Hombres',
          data: extranjerosHombres,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
          label: 'Extranjeros Mujeres',
          data: extranjerosMujeres,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  }, [censoData]);

  const options = useMemo(() => ({
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  }), []);

  return (
    <div> 
      <Atras />
      <div style={{textAlign:'center'}}>
      <h1 style={{ textAlign: 'center' }}>Censo</h1>
        <h4 style={{ textAlign: 'center' }}>Comparación entre hombres y mujeres, españoles y extranjeros por distrito</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <Bar data={chartData} options={options} />
      </div>
      </div>
    </div>
    
  );
};

export default Censo;