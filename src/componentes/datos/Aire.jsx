import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Atras from '../Atras';
import Logout from '../Logout';

// Registrar todos los componentes de Chart.js, incluidas las escalas de tiempo
Chart.register(...registerables);

const Aire = ({ onLogout }) => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  // Función para obtener los datos anuales
  const fetchAnnualData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/aire/media/anual');
      const transformedData = response.data.map((entry) => ({
        month: entry._id,
        value: entry.avgValue,
      }));
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useMemo para evitar renderizados innecesarios
  const chartData = useMemo(() => ({
    labels: data.map((entry) => new Date(2051, entry.month - 1).toLocaleString('es-ES', { month: 'long' })),
    datasets: [
      {
        label: 'Calidad del aire',
        data: data.map((entry) => entry.value),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  }), [data]);

  // Opciones del gráfico
  const options = useMemo(() => ({
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses del Año',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calidad del Aire',
        },
      },
    },
  }), []);

  // Efecto para obtener los datos al cargar el componente
  useEffect(() => {
    fetchAnnualData();
  }, []);

  // Efecto para crear el gráfico
  useEffect(() => {
    const ctx = document.getElementById('aireChart').getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options,
    });

    // Cleanup function para destruir el gráfico cuando el componente se desmonta o el gráfico se actualiza
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData, options]);

  return (
    <div style={{padding: '20px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', top:0, left: 0, backgroundColor: 'white', zIndex: 1000, padding: '10px 20 px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          <Atras />
          <Logout onLogout={onLogout}/>
      </div>
      <h1 style={{ textAlign: 'center', marginTop: '70px' }}>
        Calidad del Aire
        </h1>
      <canvas id="aireChart"></canvas>
    </div>
  );
};

export default Aire;