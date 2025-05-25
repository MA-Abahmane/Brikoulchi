import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/services?category=${encodeURIComponent(category.name)}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="w-12 h-12 bg-[#3B5BFF]  rounded-full flex items-center justify-center text-white mb-4">
          <i className={`fas ${category.icon} text-xl`}></i>
        </div>
        <h3 className="text-xl font-semibold text-royal-blue mb-2">{category.name}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <div className="text-royal-blue font-medium hover:text-royal-gold transition duration-150">
          View Services <i className="fas fa-arrow-right ml-1"></i>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard