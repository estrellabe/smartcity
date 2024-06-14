import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Registro de las escalas de tiempo
Chart.register(...registerables);

const Aire = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const chartRef = useRef(null);

  // Función paraa obtener los datos del mes seleccionado
  const fetchData = async (month) => {
    try {
      const response = await axios.get(`http://localhost:5000/media/aire/mes/${month}`);
      const transformedData = response.data.map((entry) => ({
        date: new Date(2051, month - 1, entry._id),
        value: entry.avgValue,
      }));
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  // Usamos useMemo para evitar renderizados innecesarios
  const chartData = useMemo(() => {
    return {
      labels: data.map((entry) => entry.date),
      datasets: [
        {
          label: 'Calidad del aire',
          data: data.map((entry) => entry.value),
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
        },
      ],
    };
  }, [data]);

  // Opciones del gráfico
  // Opciones del gráfico
  const options = useMemo(() => ({
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'dd MMM yyyy',
        },
        title: {
          display: true,
          text: 'Días del Mes',
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

    // Limpiamos el gráfico al desmontar el componente
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData, options]);

  // Función para manejar el cambio de mes
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h1>Calidad del Aire</h1>
      <select 
        id="monthSelect"
        name="monthSelect"
        value={selectedMonth} 
        onChange={handleMonthChange}
      >
        <option value={1}>Enero</option>
        <option value={2}>Febrero</option>
        <option value={3}>Marzo</option>
        <option value={4}>Abril</option>
        <option value={5}>Mayo</option>
        <option value={6}>Junio</option>
        <option value={7}>Julio</option>
        <option value={8}>Agosto</option>
        <option value={9}>Septiembre</option>
        <option value={10}>Octubre</option>
        <option value={11}>Noviembre</option>
        <option value={12}>Diciembre</option>
      </select>
      <canvas id="aireChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Aire;