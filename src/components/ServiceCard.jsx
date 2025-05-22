import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from './FormInput.jsx'
import { LocationPickerMap } from './Map.jsx'
import { serviceCategories } from '../data/services.js'

const ServiceCard = ({ service, isEditable = false, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedService, setEditedService] = useState(service)
  const [selectedCategory, setSelectedCategory] = useState(service.category)
  const [selectedServiceType, setSelectedServiceType] = useState(service.serviceName)
  const [location, setLocation] = useState(service.location)
  const [workDays, setWorkDays] = useState(
    service.workDays ? service.workDays.split(', ').reduce((acc, day) => ({
      ...acc,
      [day.toLowerCase()]: true
    }), {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }) : {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }
  )
  const [workHours, setWorkHours] = useState(
    service.workHours ? {
      start: service.workHours.split(' - ')[0],
      end: service.workHours.split(' - ')[1]
    } : {
      start: '',
      end: ''
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedService(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleWorkDayChange = (day) => {
    setWorkDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  const handleWorkHourChange = (type, value) => {
    setWorkHours(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation)
  }

  const handleSave = () => {
    const selectedDays = Object.entries(workDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
      .join(', ')

    const updatedService = {
      ...editedService,
      category: selectedCategory,
      serviceName: selectedServiceType,
      workDays: selectedDays,
      workHours: `${workHours.start} - ${workHours.end}`,
      location: location
    }

    onUpdate(service.id, updatedService)
    setIsEditing(false)
  }

  if (isEditing && isEditable) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <FormInput
            label="Category"
            name="category"
            type="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {serviceCategories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </FormInput>

          <FormInput
            label="Service"
            name="serviceName"
            type="select"
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {selectedCategory && serviceCategories
              .find(c => c.name === selectedCategory)?.services
              .map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))
            }
          </FormInput>

          <FormInput
            label="Title"
            name="title"
            value={editedService.title}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Description"
            name="description"
            type="textarea"
            value={editedService.description}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Primary Phone"
              name="phone1"
              value={editedService.phone1}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Secondary Phone"
              name="phone2"
              value={editedService.phone2}
              onChange={handleChange}
            />
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={editedService.email}
            onChange={handleChange}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Days
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(workDays).map(([day, isChecked]) => (
                <label
                  key={day}
                  className={`flex items-center justify-center p-2 rounded-lg cursor-pointer border transition-colors ${
                    isChecked 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleWorkDayChange(day)}
                    className="hidden"
                  />
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={workHours.start}
                onChange={(e) => handleWorkHourChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={workHours.end}
                onChange={(e) => handleWorkHourChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <FormInput
            label="Address"
            name="address"
            value={editedService.address}
            onChange={handleChange}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <LocationPickerMap
              initialPosition={location}
              onLocationSelected={handleLocationSelect}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Save Changes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isEditable && (
        <div className="absolute top-2 right-2 z-10 flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <i className="fas fa-edit text-primary"></i>
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <i className="fas fa-trash text-red-500"></i>
          </button>
        </div>
      )}

      <Link to={`/service/${service.id}`} className="block">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="h-48 bg-gray-200 relative">
            <img 
              src={`/${service.category.toLowerCase().replace(/\s+/g, '_')}.jpg`}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-0 bg-secondary/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 m-3 rounded-full">
              {service.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-tag w-5 text-primary"></i>
                <span>{service.serviceName} - {service.serviceType}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-phone w-5 text-primary"></i>
                <span>{service.phone1}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-envelope w-5 text-primary"></i>
                <span>{service.email}</span>
              </div>
              {service.workDays && (
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-calendar w-5 text-primary"></i>
                  <span>{service.workDays}</span>
                </div>
              )}
              {service.workHours && (
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-clock w-5 text-primary"></i>
                  <span>{service.workHours}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ServiceCard