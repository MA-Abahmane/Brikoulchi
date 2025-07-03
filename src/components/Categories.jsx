import { useState, useEffect } from 'react';
import  APICategories from '../data/services';
const fechedCategories = APICategories();
function Categories() {
  const [servicesByCategory, setServicesByCategory] = useState({});

  // useEffect(() => {
  //   const services = JSON.parse(localStorage.getItem('services') || '[]');
    
  //   const categoryCounts = services.reduce((acc, service) => {
  //     acc[service.category] = (acc[service.category] || 0) + 1;
  //     return acc;
  //   }, {});

  //   setServicesByCategory(categoryCounts);
  // }, []);

  return (
    <div>
      <h1 className="page-title">Categories</h1>
      {fechedCategories.map(category => (
        <div key={category.id} className="card">
          <h2>{category.name}</h2>
          <p>Total Services: {servicesByCategory[category.name] || 0}</p>
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            {category.services.map(service => (
              <li key={service} style={{ color: '#8ab8ff', marginBottom: '5px' }}>{service}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Categories;