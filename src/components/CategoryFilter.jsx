import { useState, useEffect } from 'react'
import getInitialCategories from '../data/services'
const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      const Cats = await getInitialCategories();
      setServiceCategories(Cats);
    }
    fetchCategories();
  }, [])
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }



  const handleCategoryClick = (category) => {
    onSelectCategory(category)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  if (isMobile) {
    return (
      <div className="relative w-full mb-6">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center bg-white px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
        >
          <span className="font-medium">{selectedCategory || 'All Services'}</span>
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-royal-blue`}></i>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedCategory === 'All Services' ? 'bg-[rgba(0,170,185,0.9)]   text-white' : ''}`}
              onClick={() => handleCategoryClick('All Services')}
            >
              All Services
            </div>
            {serviceCategories.map(category => (
              <div
                key={category.id}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedCategory === category.name ? 'bg-[rgba(0,170,185,0.9)]   text-white' : ''}`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {typeof category.name}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-[rgba(0,170,185,0.9)]   text-white font-semibold">
        Categories
      </div>
      <div className="p-2">
        <div
          className={`px-3 py-2 rounded-md cursor-pointer mb-1 ${selectedCategory === 'All Services' ? 'bg-[rgba(0,170,185,0.9)]   text-white' : 'hover:bg-gray-100'}`}
          onClick={() => onSelectCategory('All Services')}
        >
          All Services
        </div>
        {serviceCategories.map(category => (
          <div
            key={category.id}
            className={`px-3 py-2 rounded-md cursor-pointer mb-1 ${selectedCategory === category.name ? 'bg-[rgba(0,170,185,0.9)]   text-white' : 'hover:bg-gray-100'}`}
            onClick={() => onSelectCategory(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter