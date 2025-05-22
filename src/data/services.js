// Service categories and subcategories data
export const serviceCategories = [
  {
    id: 1,
    name: "Home Services",
    icon: "fa-house",
    description: "Expert services for home maintenance and repairs",
    services: [
      "Plumbing",
      "Electrical",
      "HVAC",
      "Carpentry",
      "Painting"
    ],
    subcategories: {
      "Plumbing": ["Pipe Repair", "Leak Fixing", "Drain Cleaning", "Water Heater Installation"],
      "Electrical": ["Wiring Installation", "Light Fixture Repair", "Circuit Breaker Replacement"],
      "HVAC": ["AC Repair", "Heating Installation", "Duct Cleaning"],
      "Carpentry": ["Furniture Assembly", "Door Installation", "Woodwork Repair"],
      "Painting": ["Interior Painting", "Exterior Painting", "Wallpaper Installation"]
    }
  },
  {
    id: 2,
    name: "Cleaning Services",
    icon: "fa-broom",
    description: "Professional cleaning services for homes and businesses",
    services: [
      "House Cleaning",
      "Carpet Cleaning",
      "Window Cleaning",
      "Commercial Cleaning"
    ],
    subcategories: {
      "House Cleaning": ["Deep Cleaning", "Regular Maid Service", "Move-Out Cleaning"],
      "Carpet Cleaning": ["Steam Cleaning", "Stain Removal"],
      "Window Cleaning": ["Interior/Exterior Window Washing"],
      "Commercial Cleaning": ["Office Cleaning", "Post-Construction Cleanup"]
    }
  },
  {
    id: 3,
    name: "Automotive Services",
    icon: "fa-car",
    description: "Complete automotive care and maintenance services",
    services: [
      "Car Repair",
      "Car Wash",
      "Tire Services",
      "Auto Body Repair"
    ],
    subcategories: {
      "Car Repair": ["Brake Repair", "Oil Change", "Engine Diagnostics"],
      "Car Wash": ["Exterior Wash", "Full Detailing", "Waxing"],
      "Tire Services": ["Tire Rotation", "Flat Tire Repair", "Alignment"],
      "Auto Body Repair": ["Dent Removal", "Paint Touch-Up"]
    }
  },
  {
    id: 4,
    name: "Personal Care",
    icon: "fa-spa",
    description: "Professional beauty and wellness services",
    services: [
      "Hairdressing",
      "Nail Services",
      "Massage Therapy",
      "Skincare"
    ],
    subcategories: {
      "Hairdressing": ["Haircut", "Coloring", "Styling"],
      "Nail Services": ["Manicure", "Pedicure", "Gel Nails"],
      "Massage Therapy": ["Swedish Massage", "Deep Tissue Massage"],
      "Skincare": ["Facials", "Waxing", "Microdermabrasion"]
    }
  },
  {
    id: 5,
    name: "Professional Services",
    icon: "fa-briefcase",
    description: "Expert professional services for individuals and businesses",
    services: [
      "Legal Services",
      "Accounting",
      "Consulting",
      "Translation"
    ],
    subcategories: {
      "Legal Services": ["Contract Review", "Will Drafting", "Consultation"],
      "Accounting": ["Tax Preparation", "Bookkeeping", "Payroll"],
      "Consulting": ["Business Strategy", "Marketing Consulting"],
      "Translation": ["Document Translation", "Interpretation"]
    }
  },
  {
    id: 6,
    name: "Education and Training",
    icon: "fa-graduation-cap",
    description: "Learning opportunities for all ages and interests",
    services: [
      "Tutoring",
      "Music Lessons",
      "Fitness Training",
      "Cooking Classes"
    ],
    subcategories: {
      "Tutoring": ["Math Tutoring", "Language Lessons", "Test Prep"],
      "Music Lessons": ["Piano Lessons", "Guitar Lessons"],
      "Fitness Training": ["Personal Training", "Yoga Instruction"],
      "Cooking Classes": ["Baking Workshops", "Cuisine-Specific Classes"]
    }
  },
  {
    id: 7,
    name: "Event Services",
    icon: "fa-calendar-days",
    description: "Complete event planning and management services",
    services: [
      "Event Planning",
      "Catering",
      "Photography",
      "DJ Services"
    ],
    subcategories: {
      "Event Planning": ["Wedding Planning", "Corporate Events"],
      "Catering": ["Buffet Catering", "Dessert Tables"],
      "Photography": ["Event Photography", "Portrait Sessions"],
      "DJ Services": ["Party DJ", "Wedding DJ"]
    }
  },
  {
    id: 8,
    name: "Tech Services",
    icon: "fa-laptop-code",
    description: "Technical solutions for modern digital needs",
    services: [
      "IT Support",
      "Web Development",
      "Graphic Design",
      "Cybersecurity"
    ],
    subcategories: {
      "IT Support": ["Computer Repair", "Network Setup"],
      "Web Development": ["Website Design", "E-commerce Setup"],
      "Graphic Design": ["Logo Design", "Marketing Materials"],
      "Cybersecurity": ["Malware Removal", "Security Audits"]
    }
  },
  {
    id: 9,
    name: "Landscaping and Gardening",
    icon: "fa-leaf",
    description: "Professional outdoor space design and maintenance",
    services: [
      "Lawn Care",
      "Tree Services",
      "Garden Design"
    ],
    subcategories: {
      "Lawn Care": ["Mowing", "Weed Control"],
      "Tree Services": ["Tree Trimming", "Stump Removal"],
      "Garden Design": ["Landscape Planning", "Plant Installation"]
    }
  },
  {
    id: 10,
    name: "Health and Wellness",
    icon: "fa-heart-pulse",
    description: "Services supporting physical and mental wellbeing",
    services: [
      "Nutrition Counseling",
      "Physical Therapy",
      "Mental Health Counseling"
    ],
    subcategories: {
      "Nutrition Counseling": ["Diet Planning", "Weight Management"],
      "Physical Therapy": ["Injury Rehab", "Mobility Training"],
      "Mental Health Counseling": ["Therapy Sessions", "Stress Management"]
    }
  },
  {
    id: 11,
    name: "Pet Services",
    icon: "fa-paw",
    description: "Comprehensive care services for your furry friends",
    services: [
      "Pet Grooming",
      "Pet Sitting",
      "Veterinary Services"
    ],
    subcategories: {
      "Pet Grooming": ["Dog Grooming", "Cat Grooming"],
      "Pet Sitting": ["Dog Walking", "In-Home Pet Care"],
      "Veterinary Services": ["Vaccinations", "Check-Ups"]
    }
  },
  {
    id: 12,
    name: "Moving and Storage",
    icon: "fa-truck",
    description: "Reliable moving and storage solutions",
    services: [
      "Moving Services",
      "Packing Services",
      "Storage Solutions"
    ],
    subcategories: {
      "Moving Services": ["Local Moving", "Long-Distance Moving"],
      "Packing Services": ["Packing Assistance", "Unpacking"],
      "Storage Solutions": ["Short-Term Storage", "Warehouse Storage"]
    }
  },
  {
    id: 13,
    name: "Childcare",
    icon: "fa-children",
    description: "Trusted childcare services for all needs",
    services: [
      "Babysitting",
      "Daycare",
      "Nanny Services"
    ],
    subcategories: {
      "Babysitting": ["Evening Babysitting", "After-School Care"],
      "Daycare": ["Full-Day Care", "Drop-In Care"],
      "Nanny Services": ["Live-In Nanny", "Part-Time Nanny"]
    }
  }
]

// Function to get all services data (for initial render)
export const getInitialServices = () => {
  const storedServices = localStorage.getItem('services')
  
  if (storedServices) {
    return JSON.parse(storedServices)
  } else {
    // Create initial services if none exist
    const initialServices = [
      {
        id: "1",
        userId: "system",
        category: "Home Services",
        serviceName: "Plumbing",
        serviceType: "Pipe Repair",
        title: "Expert Pipe Repair & Installation",
        description: "Professional plumbing services with 10+ years of experience. Available 24/7 for emergencies.",
        phone1: "+201234567890",
        email: "plumber@example.com",
        address: "123 Main St, Cairo",
        location: { lat: 30.0444, lng: 31.2357 }
      },
      {
        id: "2",
        userId: "system",
        category: "Tech Services",
        serviceName: "IT Support",
        serviceType: "Computer Repair",
        title: "Fast Computer Repair Services",
        description: "Quick and reliable computer repair for all brands. Data recovery, virus removal, hardware upgrades.",
        phone1: "+201234567891",
        email: "techsupport@example.com",
        address: "456 Tech Ave, Cairo",
        location: { lat: 30.0544, lng: 31.2457 }
      },
      {
        id: "3",
        userId: "system",
        category: "Personal Care",
        serviceName: "Hairdressing",
        serviceType: "Haircut",
        title: "Professional Hair Styling",
        description: "Experienced stylist offering cuts, coloring, and styling for all hair types.",
        phone1: "+201234567892",
        email: "hairstylist@example.com",
        address: "789 Beauty St, Cairo",
        location: { lat: 30.0644, lng: 31.2557 }
      },
      {
        id: "4",
        userId: "system",
        category: "Childcare",
        serviceName: "babysit",
        serviceType: "babysitting",
        title: "Professional babysittinger",
        description: "Experienced offering babysitting, guidance and support",
        phone1: "+201234564592",
        email: "ana.gg@example.com",
        address: "782 mo St, Cairo",
        location: { lat: 10.0644, lng: 21.2557 }
      },
      {
        id: "5",
        userId: "system",
        category: "Health and Wellness",
        serviceName: "doctor",
        serviceType: "doctor",
        title: "Professional Hair Styling",
        description: "Experienced doctor",
        phone1: "+201234567892",
        email: "doc@example.com",
        address: "789 353 St, Cairo",
        location: { lat: 35.0644, lng: 72.2557 }
      }
    ]
    
    localStorage.setItem('services', JSON.stringify(initialServices))
    return initialServices
  }
}

// Function to add a new service
export const addService = (service) => {
  const services = getInitialServices()
  const newService = {
    ...service,
    id: Date.now().toString()
  }
  
  services.push(newService)
  localStorage.setItem('services', JSON.stringify(services))
  return newService
}

// Function to update a service
export const updateService = (serviceId, updatedData) => {
  const services = getInitialServices()
  const updatedServices = services.map(service => 
    service.id === serviceId ? { ...service, ...updatedData } : service
  )
  localStorage.setItem('services', JSON.stringify(updatedServices))
  return updatedServices.find(service => service.id === serviceId)
}

// Function to delete a service
export const deleteService = (serviceId) => {
  const services = getInitialServices()
  const updatedServices = services.filter(service => service.id !== serviceId)
  localStorage.setItem('services', JSON.stringify(updatedServices))
  return true
}

// Function to get services by userId
export const getUserServices = (userId) => {
  const services = getInitialServices()
  return services.filter(service => service.userId === userId)
}

// Function to get services by category
export const getServicesByCategory = (category) => {
  if (category === "All Services") {
    return getInitialServices()
  }
  
  const services = getInitialServices()
  return services.filter(service => service.category === category)
}