import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
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

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeServices: 0,
    onlineUsers: 0,
    totalCategories: 0,
    totalReviews: 0,
    averageRating: 0
  });
  
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [userActivityData, setUserActivityData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Get data from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const categories = new Set(services.map(service => service.category));
    
    // Calculate reviews and ratings
    let totalReviews = 0;
    let totalRating = 0;
    
    services.forEach(service => {
      const reviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]');
      totalReviews += reviews.length;
      totalRating += reviews.reduce((acc, rev) => acc + rev.rating, 0);
    });

    // Calculate services by category
    const categoryCount = services.reduce((acc, service) => {
      acc[service.category] = (acc[service.category] || 0) + 1;
      return acc;
    }, {});

    // Generate mock user activity data
    const today = new Date();
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const mockActivityData = {
      labels: last7Days,
      datasets: [{
        label: 'Active Users',
        data: Array.from({length: 7}, () => Math.floor(Math.random() * users.length)),
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
        tension: 0.4
      }]
    };

    setUserActivityData(mockActivityData);
    setServicesByCategory(categoryCount);
    
    // Set stats
    setStats({
      totalUsers: users.length,
      activeServices: services.length,
      onlineUsers: Math.floor(users.length * 0.3), // Simulated online users (30% of total)
      totalCategories: categories.size,
      totalReviews,
      averageRating: totalReviews ? (totalRating / totalReviews).toFixed(1) : 0
    });
  }, []);

  const pieData = {
    labels: Object.keys(servicesByCategory),
    datasets: [
      {
        data: Object.values(servicesByCategory),
        backgroundColor: [
          '#4a90e2',
          '#8ab8ff',
          '#2c5282',
          '#63b3ed',
          '#3182ce',
        ],
        borderColor: '#1a1a1a',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF'
        }
      }
    }
  };

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="value">{stats.totalUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Active Services</h3>
          <div className="value">{stats.activeServices}</div>
        </div>
        <div className="stat-card">
          <h3>Users Online</h3>
          <div className="value">{stats.onlineUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <div className="value">{stats.totalCategories}</div>
        </div>
        <div className="stat-card">
          <h3>Total Reviews</h3>
          <div className="value">{stats.totalReviews}</div>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <div className="value">{stats.averageRating} ⭐</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h2>User Activity (Last 7 Days)</h2>
          <Line data={userActivityData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h2>Services by Category</h2>
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;