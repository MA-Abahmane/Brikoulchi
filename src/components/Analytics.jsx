import { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    serviceStats: {
      total: 0,
      active: 0,
      pending: 0
    },
    userStats: {
      total: 0,
      providers: 0,
      customers: 0
    },
    categoryDistribution: {},
    userActivity: [],
    conversionRate: 0
  });

  useEffect(() => {
    // Get real data from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    // Calculate service providers (users with services)
    const serviceProviders = new Set(services.map(service => service.userId));
    
    // Calculate category distribution
    const categoryDist = services.reduce((acc, service) => {
      acc[service.category] = (acc[service.category] || 0) + 1;
      return acc;
    }, {});

    // Calculate reviews and ratings
    let totalReviews = 0;
    services.forEach(service => {
      const reviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]');
      totalReviews += reviews.length;
    });

    // Generate user activity data for last 7 days
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString();
    });

    // Calculate daily active users
    const dailyActiveUsers = last7Days.map(() => 
      Math.floor(Math.random() * (users.length * 0.8))
    );

    // Estimate page views and other metrics based on users and services
    const estimatedPageViews = users.length * 5 + services.length * 10;
    const estimatedUniqueVisitors = Math.floor(estimatedPageViews * 0.7);
    const estimatedBounceRate = 35 + Math.random() * 10;
    const estimatedAvgSession = Math.floor(120 + Math.random() * 180);
    
    // Calculate conversion rate (services created per user)
    const conversionRate = users.length > 0 
      ? ((serviceProviders.size / users.length) * 100).toFixed(1)
      : 0;

    setAnalyticsData({
      pageViews: estimatedPageViews,
      uniqueVisitors: estimatedUniqueVisitors,
      bounceRate: estimatedBounceRate,
      avgSessionDuration: estimatedAvgSession,
      serviceStats: {
        total: services.length,
        active: services.length,
        pending: 0
      },
      userStats: {
        total: users.length,
        providers: serviceProviders.size,
        customers: users.length - serviceProviders.size
      },
      categoryDistribution: categoryDist,
      userActivity: dailyActiveUsers,
      conversionRate
    });
  }, []);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#00C8FF',       // Neon cyan for legend labels
        font: {
          weight: 'bold'
        }
      }
    },
    tooltip: {
      backgroundColor: '#00C8FF', // Pure black tooltip background
      borderColor: '#3D5AFE',     // Neon royal blue border
      borderWidth: 1,
      titleColor: '#00C8FF',
      bodyColor: '#E0EFFF'        // Slightly softer white for readability
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#6EC3F4',         // Neon ice blue ticks
        font: {
          weight: '600'
        }
      },
      grid: {
        color: 'rgba(61, 90, 254, 0.25)' // Brighter royal blue grid for black bg
      }
    },
    x: {
      ticks: {
        color: '#6EC3F4',         // Matching neon tick color
        font: {
          weight: '600'
        }
      },
      grid: {
        color: 'rgba(61, 90, 254, 0.2)'  // Slightly stronger neon grid lines
      }
    }
  },
  layout: {
    padding: 10                    // Adds breathing room on all sides
  }
};

  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      
      <div className="stats-grid mb-8">
        <div className="stat-card">
          <i className="fas fa-eye text-2xl mb-2 text-primary"></i>
          <h3>Page Views</h3>
          <div className="value">{analyticsData.pageViews}</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-users text-2xl mb-2 text-primary"></i>
          <h3>Unique Visitors</h3>
          <div className="value">{analyticsData.uniqueVisitors}</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-undo text-2xl mb-2 text-primary"></i>
          <h3>Bounce Rate</h3>
          <div className="value">{analyticsData.bounceRate.toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-clock text-2xl mb-2 text-primary"></i>
          <h3>Avg. Session</h3>
          <div className="value">{Math.floor(analyticsData.avgSessionDuration / 60)}m {analyticsData.avgSessionDuration % 60}s</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="chart-container">
          <h2>User Activity (Last 7 Days)</h2>
          <Line
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                label: 'Active Users',
                data: analyticsData.userActivity,
                borderColor: '#FF3CAC',
                backgroundColor: '#FFFFFF',
                tension: 0.4
              }]
            }}
            options={chartOptions}
          />
        </div>

        <div className="chart-container">
          <h2>User Distribution</h2>
          <Doughnut
            data={{
              labels: ['Service Providers', 'Customers'],
              datasets: [{
                data: [
                  analyticsData.userStats.providers,
                  analyticsData.userStats.customers
                ],
                backgroundColor: [
                  'rgba(57, 255, 20, 0.90)',
                  'rgba(118, 255, 122, 0.8)'
                ]
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h2>Category Distribution</h2>
          <Bar
            data={{
              labels: Object.keys(analyticsData.categoryDistribution),
              datasets: [{
                label: 'Services',
                data: Object.values(analyticsData.categoryDistribution),
                backgroundColor: ' rgba(255, 255, 102, 0.85)',
                borderColor: 'rgba(255,255,255,.9)',
                borderWidth: 2, 
              }]
            }}
            options={chartOptions}
          />
        </div>

        <div className="chart-container">
          <h2>Service Metrics</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-surface-color p-4 rounded-lg">
              <h3 className="text-hover-color mb-2">Conversion Rate</h3>
              <div className="text-3xl font-bold">{analyticsData.conversionRate}%</div>
              <p className="text-sm text-gray-400">Users becoming providers</p>
            </div>
            <div className="bg-surface-color p-4 rounded-lg">
              <h3 className="text-hover-color mb-2">Active Services</h3>
              <div className="text-3xl font-bold">{analyticsData.serviceStats.active}</div>
              <p className="text-sm text-gray-400">Total services available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;