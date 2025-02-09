import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const GrowthChart = () => {
  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
      label: 'Croissance des utilisateurs',
      data: [0, 100, 300, 600, 1200, 2000],
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4
    }]
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export const UsageStats = () => {
  const data = {
    labels: ['Tontines', 'Cagnottes', 'Microcrédits'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(99, 102, 241)',
        'rgb(139, 92, 246)'
      ]
    }]
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <Doughnut data={data} options={{ responsive: true }} />
    </div>
  );
};
