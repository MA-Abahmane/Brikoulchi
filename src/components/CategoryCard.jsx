import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/services?category=${encodeURIComponent(category.name)}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div className="p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
            <i className={`fas ${category.icon} text-2xl`}></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
              Explore Services
            </span>
            <i className="fas fa-arrow-right text-primary group-hover:translate-x-1 group-hover:text-secondary transition-all"></i>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard