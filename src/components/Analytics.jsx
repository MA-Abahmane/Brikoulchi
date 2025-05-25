import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Activity',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: '#4a90e2'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF'
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#FFFFFF' }
      },
      x: {
        ticks: { color: '#FFFFFF' }
      }
    }
  };

  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <div className="chart-container">
        <h2>Weekly User Activity</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Page Views</h3>
          <div className="value">5,678</div>
        </div>
        <div className="stat-card">
          <h3>Unique Visitors</h3>
          <div className="value">2,345</div>
        </div>
        <div className="stat-card">
          <h3>Bounce Rate</h3>
          <div className="value">45%</div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;