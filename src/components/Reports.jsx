import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function Reports() {
  const [reportData, setReportData] = useState({
    users: [],
    services: [],
    reviews: []
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    let allReviews = [];
    services.forEach(service => {
      const serviceReviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]');
      allReviews = [...allReviews, ...serviceReviews.map(review => ({
        ...review,
        serviceTitle: service.title,
        serviceCategory: service.category
      }))];
    });

    setReportData({ users, services, reviews: allReviews });
  }, []);

  const downloadUserReport = () => {
    const userData = reportData.users.map(user => ({
      Username: user.username,
      'First Name': user.firstName,
      'Last Name': user.lastName,
      Email: user.email,
      Phone: user.phone || user.phone1,
      'Secondary Phone': user.phone2 || '',
      Address: user.address || '',
      'Has Profile Image': user.profileImage ? 'Yes' : 'No'
    }));

    const ws = XLSX.utils.json_to_sheet(userData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, `user_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const downloadServiceReport = () => {
    const serviceData = reportData.services.map(service => {
      const reviews = JSON.parse(localStorage.getItem(`reviews_${service.id}`) || '[]');
      const avgRating = reviews.length ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(2) : 0;
      
      return {
        'Service ID': service.id,
        Title: service.title,
        Category: service.category,
        'Service Name': service.serviceName,
        'Service Type': service.serviceType,
        Description: service.description,
        'Provider Username': service.userId,
        'Primary Phone': service.phone1,
        'Secondary Phone': service.phone2 || '',
        Email: service.email,
        Address: service.address || '',
        'Work Days': service.workDays || '',
        'Work Hours': service.workHours || '',
        'Total Reviews': reviews.length,
        'Average Rating': avgRating,
        'Location Lat': service.location?.lat || '',
        'Location Lng': service.location?.lng || ''
      };
    });

    const ws = XLSX.utils.json_to_sheet(serviceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Services');
    XLSX.writeFile(wb, `service_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const downloadReviewReport = () => {
    const reviewData = reportData.reviews.map(review => ({
      'Review ID': review.id,
      'Service Title': review.serviceTitle,
      'Service Category': review.serviceCategory,
      'Reviewer Username': review.userId,
      Rating: review.rating,
      Comment: review.comment,
      Date: new Date(review.date).toLocaleDateString()
    }));

    const ws = XLSX.utils.json_to_sheet(reviewData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reviews');
    XLSX.writeFile(wb, `review_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const reports = [
    { 
      id: 1, 
      name: 'User Growth Report', 
      description: 'Complete user data with registration details',
      count: reportData.users.length,
      action: downloadUserReport
    },
    { 
      id: 2, 
      name: 'Service Analytics', 
      description: 'All services with ratings and provider information',
      count: reportData.services.length,
      action: downloadServiceReport
    },
    { 
      id: 3, 
      name: 'Reviews Summary', 
      description: 'All reviews and ratings across services',
      count: reportData.reviews.length,
      action: downloadReviewReport
    },
  ];

  return (
    <div className="admin-page-container">
      <h1 className="page-title">Reports</h1>
      <div className="card" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map(report => (
            <div key={report.id} className="bg-surface-color border border-border-color rounded-lg p-6">
              <h3 className="text-lg font-semibold text-hover-color mb-2">{report.name}</h3>
              <p className="text-text-color mb-4">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{report.count}</span>
                <button 
                  onClick={report.action}
                  className="button flex items-center gap-2"
                >
                  <i className="fas fa-download"></i>
                  Download Excel
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-surface-color border border-border-color rounded-lg">
          <h3 className="text-lg font-semibold text-hover-color mb-2">Report Information</h3>
          <ul className="text-text-color space-y-1">
            <li>• Reports are generated in real-time from current data</li>
            <li>• Excel files include all available fields for comprehensive analysis</li>
            <li>• Files are named with current date for easy organization</li>
            <li>• All sensitive information like passwords are excluded</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reports;