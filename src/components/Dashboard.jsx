import { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
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
  BarElement,
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
    averageRating: 0,
    totalViews: 0
  });
  
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [userActivityData, setUserActivityData] = useState({
    labels: [],
    datasets: []
  });
  const [reviewsData, setReviewsData] = useState({
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
    let reviewsByDate = {};
    
    services.forEach(service => {
      const reviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]');
      totalReviews += reviews.length;
      totalRating += reviews.reduce((acc, rev) => acc + rev.rating, 0);
      
      // Group reviews by date
      reviews.forEach(review => {
        const date = new Date(review.date).toLocaleDateString();
        reviewsByDate[date] = (reviewsByDate[date] || 0) + 1;
      });
    });

    // Calculate services by category
    const categoryCount = services.reduce((acc, service) => {
      acc[service.category] = (acc[service.category] || 0) + 1;
      return acc;
    }, {});

    // Generate user activity data for last 7 days
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString();
    });

    const activeUsers = users.map(user => {
      const userServices = services.filter(service => service.userId === user.username);
      const lastActivity = userServices.length > 0 ? new Date() : null;
      return { ...user, lastActivity };
    });

    const dailyActiveUsers = last7Days.map(date => {
      return activeUsers.filter(user => 
        user.lastActivity && user.lastActivity.toLocaleDateString() === date
      ).length;
    });

    // Reviews trend data
    const reviewsTrend = last7Days.map(date => reviewsByDate[date] || 0);

    setUserActivityData({
      labels: last7Days,
      datasets: [{
        label: 'Active Users',
        data: dailyActiveUsers,
        borderColor: '#00C8FF', // Neon Cyan Blue
        backgroundColor: 'rgba(0, 200, 255, 0.15)', // Translucent for soft fill
        pointBackgroundColor: '#FFFFFF',
        tension: 0.4
      }]
    });

    setReviewsData({
      labels: last7Days,
      datasets: [{
        label: 'Reviews',
        data: reviewsTrend,
        borderColor: '#A66DD4', // Lavender-Violet
        backgroundColor: 'rgba(166, 109, 212, 0.15)', // Soft translucent fill
        pointBackgroundColor: '#FFFFFF',
        tension: 0.4
      }]
    });

    setServicesByCategory(categoryCount);
    
    // Calculate page views (simulated based on users and services)
    const estimatedViews = users.length * 5 + services.length * 10;
    
    // Set stats
    setStats({
      totalUsers: users.length,
      activeServices: services.length,
      onlineUsers: Math.floor(users.length * 0.3), // Simulated online users (30% of total)
      totalCategories: categories.size,
      totalReviews,
      averageRating: totalReviews ? (totalRating / totalReviews).toFixed(1) : 0,
      totalViews: estimatedViews
    });
  }, []);

  const pieData = {
    labels: Object.keys(servicesByCategory),
    datasets: [
      {
        data: Object.values(servicesByCategory),
        backgroundColor: [
        '#264653', // Deep Teal
        '#2A9D8F', // Muted Turquoise
        '#E9C46A', // Soft Gold
        '#F4A261', // Warm Apricot
        '#E76F51', // Muted Red
        '#6D597A', // Dusty Purple
        '#4A4E69', // Slate Blue
        '#8D99AE', // Desaturated Blue
        '#A8DADC', // Pale Aqua
        '#457B9D', // Steel Blue
        '#1D3557', // Navy
        '#B08968', // Earth Brown
        '#495057'  // Charcoal Gray
      ],
        borderColor: 'var(--background-color)',
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
          <i className="fas fa-users text-2xl mb-2 text-primary"></i>
          <h3>Total Users</h3>
          <div className="value">{stats.totalUsers}</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-briefcase text-2xl mb-2 text-primary"></i>
          <h3>Active Services</h3>
          <div className="value">{stats.activeServices}</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-circle text-2xl mb-2 text-green-500"></i>
          <h3>Users Online</h3>
          <div className="value">{stats.onlineUsers}</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-tags text-2xl mb-2 text-primary"></i>
          <h3>Categories</h3>
          <div className="value">{stats.totalCategories}</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-star text-2xl mb-2 text-yellow-500"></i>
          <h3>Average Rating</h3>
          <div className="value">{stats.averageRating} ⭐</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-eye text-2xl mb-2 text-primary"></i>
          <h3>Total Views</h3>
          <div className="value">{stats.totalViews}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="chart-container">
          <h2>User Activity (Last 7 Days)</h2>
          <Line data={userActivityData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h2>Reviews Trend</h2>
          <Line data={reviewsData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h2>Services by Category</h2>
          <Pie data={pieData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h2>Top Rated Services</h2>
          <Bar 
            data={{
              labels: ['Service A', 'Service B', 'Service C', 'Service D', 'Service E'],
              datasets: [{
                label: 'Rating',
                data: [4.8, 4.6, 4.5, 4.3, 4.2],
                backgroundColor: '#3D5AFE',
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;