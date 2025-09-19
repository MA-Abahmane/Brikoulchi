import { useEffect, useState } from "react"
import FormInput from "./FormInput"
import { LocationPickerMap } from "./Map"
import { useAuth } from "../context/AuthContext"
import { addService, APICategories, APIServices, editService } from "../data/services"
export default function ServiceForm({ fetchservice, fetchuserservices, setShowEditService, editmode, service = null }) {
    const { user, accessToken, setMessage } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState(service ? service.category_id : 0)
    const [Categories, setCategories] = useState([])
    const [selectedGlobalService, setSelectedGlobalService] = useState(service ? service.global_service_id : 0);
    const [availableGlobalServices, setAvailableGlobalServices] = useState([])
    const [selectedService, setSelectedService] = useState(service ? service.initial_service_id : 0);
    const [availableServices, setAvailableServices] = useState([])
    const [pastService, setPastService] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        phone1: user?.phone1 || '',
        phone2: user?.phone2 || '',
        email: user?.email || '',
        address: user?.address || '',
        workDays: '',
        workHours: ''
    })

    const [workDays, setWorkDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    })
    const [workHours, setWorkHours] = useState({
        start: '',
        end: ''
    })
    const [errors, setErrors] = useState({})
    const [location, setLocation] = useState(null);
    const fetchcategories = async () => {
        const Categories = await APICategories(true);
        console.log('the categories', Categories);
        setCategories(Categories);
    }

    useEffect(() => {
        fetchcategories();
    }, []);
    useEffect(() => {
        const category = Categories.find(c => c.id === selectedCategory)
        setAvailableGlobalServices(category ? category.globalservices : [])
        console.log('it works', category, 'hahahaha');
        console.log(Categories);
        console.log('it works', selectedCategory, 'hehehehe');
    }, [Categories]);
const fetchservices = async (globalServiceId) => {
        const services = await APIServices(null, globalServiceId);
        setAvailableServices(services);
        console.log('hahaha sub global services:', availableServices);
        console.log(selectedGlobalService);
        console.log(services, 'hwhwhwh');
        return services;
    }
    useEffect(() => {
        if (selectedCategory) {
            const category = Categories.find(c => c.id === selectedCategory)
            console.log('categorie:', category);
            console.log('categories:', Categories);
            setAvailableGlobalServices(category ? category.globalservices : [])
            selectedCategory === service.category_id ? fetchservices(service.global_service_id) : setAvailableServices([])
        } else {
            setAvailableGlobalServices([])
            setSelectedGlobalService('')
            setAvailableServices([])
        }
    }, [selectedCategory])
    
    useEffect(() => {
        fetchservices(selectedGlobalService);
    }, [selectedGlobalService])
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        !pastService && setPastService((service && availableServices.length > 0) ? availableServices.find(ser => ser.id === service.initial_service_id).name : false)
        //         // normalize to ensure no undefined/null values
        setFormData({
            title: service.title ?? '',
            description: service.description ?? '',
            phone1: service.phone1 ?? user?.phone1 ?? '',
            phone2: service.phone2 ?? user?.phone2 ?? '',
            email: service.email ?? user?.email ?? '',
            address: service.address ?? user?.address ?? '',
            workDays: service.workDays ?? '',
            workHours: service.workHours ?? ''
        });
    }, [Categories]);
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


    const validateForm = () => {
        const newErrors = {}

        if (!selectedCategory) {
            newErrors.category = 'Please select a category'
        }

        if (!selectedGlobalService) {
            newErrors.serviceName = 'Please select a service'
        }

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        if (!Object.values(workDays).some(day => day)) {
            newErrors.workDays = 'Select at least one work day'
        }

        if (!workHours.start || !workHours.end) {
            newErrors.workHours = 'Both start and end time are required'
        }

        if (!location || !location.lat || !location.lng) {
            newErrors.location = 'Please select a location on the map'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            const selectedDays = Object.entries(workDays)
                .filter(([_, isSelected]) => isSelected)
                .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                .join(', ')

            const newService = {
                user_id: user.id,
                category_id: selectedCategory,
                global_service_id: selectedGlobalService,
                initial_service_id: selectedService,
                title: formData.title,
                type: 'freelance',
                status: 'busy',
                description: formData.description,
                workDays: selectedDays,
                workHours: `${workHours.start} - ${workHours.end}`,
                lat: 1.643,
                lng: 5.634,
            }
            if (service) {
                await editService(service.id, accessToken, user.id, newService);
                // await fetchuserservices();
                setShowEditService(false)
            } else {
                await addService(newService, accessToken);
                await fetchuserservices();
            }

            setSelectedCategory(0)
            setSelectedGlobalService(0)
            setFormData({
                title: '',
                description: '',
                phone1: user?.phone1 || '',
                phone2: user?.phone2 || '',
                email: user?.email || '',
                address: user?.address || '',
                workDays: '',
                workHours: ''
            })
            setLocation(null)

            setMessage(!service ? {
                type: 'success',
                text: 'Your service has been created successfully!'
            } : {
                type: 'success',
                text: 'Your service has been edited successfully!'
            })

            setTimeout(() => {
                setMessage({ type: '', text: '' })
            }, 6000)
        }
        fetchservice()
    }
    return <>
        {
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6">Create a New Service</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormInput
                        label="Category"
                        name="category"
                        type="select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                        required
                        error={errors.category}
                    >
                        <option className="bg-blue-300" value={service ? service.category_id : 0}>{service ? service.category.name : "Select a category"}</option>
                        {Categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </FormInput>

                    <FormInput
                        label="Global Service"
                        name="globalserviceName"
                        type="select"
                        value={selectedGlobalService}
                        onChange={(e) => setSelectedGlobalService(parseInt(e.target.value))}
                        required
                        disabled={service ? false : !selectedCategory}
                        error={errors.serviceName}
                    >
                        {
                            service.category_id === selectedCategory ? service && Categories.length && <option className="bg-blue-300" value={service ? service.global_service_id : 0}>{`${Categories.find(cat => cat.id === service.category_id).globalservices.find(ser => ser.id === service.global_service_id).name}`}</option> : <option>Select a global service</option>
                        }
                        {availableGlobalServices.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </FormInput>
                </div>

                <FormInput
                    label="Service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(parseInt(e.target.value))}
                    name="service"
                    id="service"
                    type="select"
                    disabled={service ? false : !selectedGlobalService}
                >
                    {
                        console.log('abarkou""""""""""""""""""""""', availableServices, service, selectedGlobalService, 'pastserv', pastService, 'availaible G serv', availableGlobalServices)
                    }
                    {
                        (service.global_service_id === selectedGlobalService && service.category_id === selectedCategory) ? <option className="bg-blue-300" value={service ? service.initial_service_id : 0}> {pastService} </option> : <option>Select a global service</option>
                    }
                    {
                        availableServices.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                </FormInput>

                <FormInput
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="E.g., Professional Plumbing Services"
                    required
                    error={errors.title}
                />

                <FormInput
                    label="Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your service..."
                    rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                        label="Primary Phone"
                        name="phone1"
                        value={formData.phone1}
                        onChange={handleChange}
                        placeholder="Your contact number"
                        disabled={true}
                    />

                    <FormInput
                        label="Secondary Phone (Optional)"
                        name="phone2"
                        value={formData.phone2}
                        onChange={handleChange}
                        disabled={true}
                        placeholder="Alternative contact number"
                    />
                </div>

                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true}
                    placeholder="Your email address"
                />

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Days <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(workDays).map(([day, isChecked]) => (
                            <label
                                key={day}
                                className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${isChecked
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
                    {errors.workDays && (
                        <p className="mt-1 text-sm text-red-500">{errors.workDays}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            value={workHours.start}
                            onChange={(e) => handleWorkHourChange('start', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            value={workHours.end}
                            onChange={(e) => handleWorkHourChange('end', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    {errors.workHours && (
                        <p className="col-span-2 mt-1 text-sm text-red-500">{errors.workHours}</p>
                    )}
                </div>

                <FormInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={true}
                    placeholder="Your business address"
                />

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                        Click on the map to set your service location
                    </p>

                    <LocationPickerMap
                        initialPosition={location}
                        onLocationSelected={handleLocationSelect}
                    />

                    {errors.location && (
                        <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#3B5BFF] hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition duration-150"
                    >
                        {editmode ? 'Edit Service' : 'Create Service'}
                    </button>
                </div>
            </div>
        }
    </>


}