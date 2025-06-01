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
    // Create comprehensive initial services
    const initialServices = [
      // Home Services (6 services)
      {
        id: "1",
        userId: "system",
        category: "Home Services",
        serviceName: "Plumbing",
        serviceType: "Pipe Repair",
        title: "Emergency Pipe Repair Services",
        description: "24/7 plumbing services for all pipe emergencies. Fast response time with 10+ years experience.",
        phone1: "+201234567890",
        email: "plumber@example.com",
        address: "123 Main St, Cairo",
        location: { lat: 30.0444, lng: 31.2357 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "2",
        userId: "system",
        category: "Home Services",
        serviceName: "Electrical",
        serviceType: "Wiring Installation",
        title: "Professional Electrical Wiring",
        description: "Certified electricians for safe wiring installations and repairs in homes and offices.",
        phone1: "+201234567891",
        email: "electrician@example.com",
        address: "456 Electric Ave, Cairo",
        location: { lat: 30.0544, lng: 31.2457 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "3",
        userId: "system",
        category: "Home Services",
        serviceName: "HVAC",
        serviceType: "AC Repair",
        title: "AC Installation & Repair Experts",
        description: "Specialists in all AC brands with same-day service available for urgent repairs.",
        phone1: "+201234567892",
        email: "acrepair@example.com",
        address: "789 Cool St, Cairo",
        location: { lat: 30.0644, lng: 31.2557 },
        rating: 4.9,
        priceRange: "$$$"
      },
      {
        id: "4",
        userId: "system",
        category: "Home Services",
        serviceName: "Carpentry",
        serviceType: "Furniture Assembly",
        title: "Precision Carpentry & Assembly",
        description: "Custom furniture building and professional assembly of all flat-pack furniture.",
        phone1: "+201234567893",
        email: "carpenter@example.com",
        address: "321 Wood Rd, Cairo",
        location: { lat: 30.0744, lng: 31.2657 },
        rating: 4.6,
        priceRange: "$$"
      },
      {
        id: "5",
        userId: "system",
        category: "Home Services",
        serviceName: "Painting",
        serviceType: "Interior Painting",
        title: "Interior Painting Specialists",
        description: "High-quality interior painting with premium materials and clean, professional service.",
        phone1: "+201234567894",
        email: "painter@example.com",
        address: "654 Color St, Cairo",
        location: { lat: 30.0844, lng: 31.2757 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "6",
        userId: "system",
        category: "Home Services",
        serviceName: "Plumbing",
        serviceType: "Water Heater Installation",
        title: "Water Heater Installation Pros",
        description: "Expert installation of all water heater types with warranty on all work.",
        phone1: "+201234567895",
        email: "waterheater@example.com",
        address: "987 Heat Blvd, Cairo",
        location: { lat: 30.0944, lng: 31.2857 },
        rating: 4.8,
        priceRange: "$$$"
      },

      // Cleaning Services (5 services)
      {
        id: "7",
        userId: "system",
        category: "Cleaning Services",
        serviceName: "House Cleaning",
        serviceType: "Deep Cleaning",
        title: "Thorough Deep Cleaning Service",
        description: "Comprehensive deep cleaning for homes and apartments using eco-friendly products.",
        phone1: "+201234567896",
        email: "deepclean@example.com",
        address: "111 Sparkle St, Cairo",
        location: { lat: 30.1044, lng: 31.2957 },
        rating: 4.9,
        priceRange: "$$"
      },
      {
        id: "8",
        userId: "system",
        category: "Cleaning Services",
        serviceName: "Carpet Cleaning",
        serviceType: "Steam Cleaning",
        title: "Professional Carpet Steam Cleaning",
        description: "Advanced steam cleaning that removes deep stains and allergens from carpets.",
        phone1: "+201234567897",
        email: "carpetclean@example.com",
        address: "222 Fabric Ave, Cairo",
        location: { lat: 30.1144, lng: 31.3057 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "9",
        userId: "system",
        category: "Cleaning Services",
        serviceName: "Window Cleaning",
        serviceType: "Interior/Exterior Window Washing",
        title: "Crystal Clear Window Cleaning",
        description: "Streak-free window cleaning for both interior and exterior surfaces of any building.",
        phone1: "+201234567898",
        email: "windowclean@example.com",
        address: "333 Glass Rd, Cairo",
        location: { lat: 30.1244, lng: 31.3157 },
        rating: 4.8,
        priceRange: "$"
      },
      {
        id: "10",
        userId: "system",
        category: "Cleaning Services",
        serviceName: "Commercial Cleaning",
        serviceType: "Office Cleaning",
        title: "Office Cleaning Professionals",
        description: "Reliable daily, weekly or monthly cleaning services for offices and businesses.",
        phone1: "+201234567899",
        email: "officeclean@example.com",
        address: "444 Business St, Cairo",
        location: { lat: 30.1344, lng: 31.3257 },
        rating: 4.6,
        priceRange: "$$"
      },
      {
        id: "11",
        userId: "system",
        category: "Cleaning Services",
        serviceName: "House Cleaning",
        serviceType: "Move-Out Cleaning",
        title: "Move-Out Cleaning Specialists",
        description: "Complete cleaning service for rental properties to ensure full deposit return.",
        phone1: "+201234567810",
        email: "moveclean@example.com",
        address: "555 Rental Ave, Cairo",
        location: { lat: 30.1444, lng: 31.3357 },
        rating: 4.7,
        priceRange: "$$"
      },

      // Automotive Services (6 services)
      {
        id: "12",
        userId: "system",
        category: "Automotive Services",
        serviceName: "Car Repair",
        serviceType: "Brake Repair",
        title: "Expert Brake Repair & Replacement",
        description: "Complete brake system services including pads, rotors, and fluid changes.",
        phone1: "+201234567811",
        email: "brakerepair@example.com",
        address: "666 Auto St, Cairo",
        location: { lat: 30.1544, lng: 31.3457 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "13",
        userId: "system",
        category: "Automotive Services",
        serviceName: "Car Wash",
        serviceType: "Full Detailing",
        title: "Premium Auto Detailing Service",
        description: "Complete interior and exterior detailing to make your car look brand new.",
        phone1: "+201234567812",
        email: "detail@example.com",
        address: "777 Shine Rd, Cairo",
        location: { lat: 30.1644, lng: 31.3557 },
        rating: 4.9,
        priceRange: "$$"
      },
      {
        id: "14",
        userId: "system",
        category: "Automotive Services",
        serviceName: "Tire Services",
        serviceType: "Tire Rotation",
        title: "Complete Tire Services",
        description: "Tire rotation, balancing, and repair services to extend your tire life.",
        phone1: "+201234567813",
        email: "tireservice@example.com",
        address: "888 Wheel Ave, Cairo",
        location: { lat: 30.1744, lng: 31.3657 },
        rating: 4.7,
        priceRange: "$"
      },
      {
        id: "15",
        userId: "system",
        category: "Automotive Services",
        serviceName: "Auto Body Repair",
        serviceType: "Dent Removal",
        title: "Paintless Dent Removal Experts",
        description: "Specializing in paintless dent removal to restore your car's appearance.",
        phone1: "+201234567814",
        email: "dentrepair@example.com",
        address: "999 Body St, Cairo",
        location: { lat: 30.1844, lng: 31.3757 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "16",
        userId: "system",
        category: "Automotive Services",
        serviceName: "Car Repair",
        serviceType: "Oil Change",
        title: "Quick Oil Change Service",
        description: "Fast and affordable oil changes with premium synthetic and conventional oils.",
        phone1: "+201234567815",
        email: "oilchange@example.com",
        address: "1010 Lube Blvd, Cairo",
        location: { lat: 30.1944, lng: 31.3857 },
        rating: 4.6,
        priceRange: "$"
      },
      {
        id: "17",
        userId: "system",
        category: "Automotive Services",
        serviceName: "Car Wash",
        serviceType: "Exterior Wash",
        title: "Express Car Wash",
        description: "5-minute exterior wash with free vacuuming included in all packages.",
        phone1: "+201234567816",
        email: "expresswash@example.com",
        address: "1111 Clean St, Cairo",
        location: { lat: 30.2044, lng: 31.3957 },
        rating: 4.5,
        priceRange: "$"
      },

      // Personal Care (7 services)
      {
        id: "18",
        userId: "system",
        category: "Personal Care",
        serviceName: "Hairdressing",
        serviceType: "Haircut",
        title: "Luxury Hair Salon",
        description: "Premium haircuts and styling from award-winning stylists in a modern salon.",
        phone1: "+201234567817",
        email: "hairsalon@example.com",
        address: "1212 Style Ave, Cairo",
        location: { lat: 30.2144, lng: 31.4057 },
        rating: 4.9,
        priceRange: "$$$"
      },
      {
        id: "19",
        userId: "system",
        category: "Personal Care",
        serviceName: "Nail Services",
        serviceType: "Manicure",
        title: "Nail Art Studio",
        description: "Creative nail designs and professional manicures using top-quality products.",
        phone1: "+201234567818",
        email: "nailstudio@example.com",
        address: "1313 Polish Rd, Cairo",
        location: { lat: 30.2244, lng: 31.4157 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "20",
        userId: "system",
        category: "Personal Care",
        serviceName: "Massage Therapy",
        serviceType: "Swedish Massage",
        title: "Tranquil Massage Spa",
        description: "Relaxing Swedish massage therapy to relieve stress and muscle tension.",
        phone1: "+201234567819",
        email: "massagespa@example.com",
        address: "1414 Relax St, Cairo",
        location: { lat: 30.2344, lng: 31.4257 },
        rating: 4.9,
        priceRange: "$$$"
      },
      {
        id: "21",
        userId: "system",
        category: "Personal Care",
        serviceName: "Skincare",
        serviceType: "Facials",
        title: "Medical Aesthetic Clinic",
        description: "Professional facials and skincare treatments tailored to your skin type.",
        phone1: "+201234567820",
        email: "skinclinic@example.com",
        address: "1515 Glow Blvd, Cairo",
        location: { lat: 30.2444, lng: 31.4357 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "22",
        userId: "system",
        category: "Personal Care",
        serviceName: "Hairdressing",
        serviceType: "Coloring",
        title: "Hair Color Specialists",
        description: "Expert hair coloring services using ammonia-free dyes for vibrant results.",
        phone1: "+201234567821",
        email: "haircolor@example.com",
        address: "1616 Dye St, Cairo",
        location: { lat: 30.2544, lng: 31.4457 },
        rating: 4.7,
        priceRange: "$$$"
      },
      {
        id: "23",
        userId: "system",
        category: "Personal Care",
        serviceName: "Nail Services",
        serviceType: "Gel Nails",
        title: "Gel Nail Extensions",
        description: "Long-lasting gel nail extensions with custom shaping and designs.",
        phone1: "+201234567822",
        email: "gelnails@example.com",
        address: "1717 Nail Ave, Cairo",
        location: { lat: 30.2644, lng: 31.4557 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "24",
        userId: "system",
        category: "Personal Care",
        serviceName: "Massage Therapy",
        serviceType: "Deep Tissue Massage",
        title: "Therapeutic Deep Tissue Massage",
        description: "Targeted deep tissue massage to relieve chronic muscle pain and tension.",
        phone1: "+201234567823",
        email: "deeptissue@example.com",
        address: "1818 Therapy Rd, Cairo",
        location: { lat: 30.2744, lng: 31.4657 },
        rating: 4.8,
        priceRange: "$$$"
      },

      // Professional Services (5 services)
      {
        id: "25",
        userId: "system",
        category: "Professional Services",
        serviceName: "Legal Services",
        serviceType: "Contract Review",
        title: "Business Contract Review",
        description: "Thorough legal review of business contracts and agreements by experienced attorneys.",
        phone1: "+201234567824",
        email: "legalreview@example.com",
        address: "1919 Law St, Cairo",
        location: { lat: 30.2844, lng: 31.4757 },
        rating: 4.9,
        priceRange: "$$$$"
      },
      {
        id: "26",
        userId: "system",
        category: "Professional Services",
        serviceName: "Accounting",
        serviceType: "Tax Preparation",
        title: "Certified Tax Preparation",
        description: "Professional tax preparation services for individuals and small businesses.",
        phone1: "+201234567825",
        email: "taxprep@example.com",
        address: "2020 Finance Ave, Cairo",
        location: { lat: 30.2944, lng: 31.4857 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "27",
        userId: "system",
        category: "Professional Services",
        serviceName: "Consulting",
        serviceType: "Business Strategy",
        title: "Business Growth Consulting",
        description: "Strategic consulting to help businesses scale and improve operations.",
        phone1: "+201234567826",
        email: "businessconsult@example.com",
        address: "2121 Strategy Rd, Cairo",
        location: { lat: 30.3044, lng: 31.4957 },
        rating: 4.7,
        priceRange: "$$$$"
      },
      {
        id: "28",
        userId: "system",
        category: "Professional Services",
        serviceName: "Translation",
        serviceType: "Document Translation",
        title: "Certified Document Translation",
        description: "Accurate translation of legal, medical, and business documents in multiple languages.",
        phone1: "+201234567827",
        email: "translation@example.com",
        address: "2222 Language St, Cairo",
        location: { lat: 30.3144, lng: 31.5057 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "29",
        userId: "system",
        category: "Professional Services",
        serviceName: "Accounting",
        serviceType: "Bookkeeping",
        title: "Small Business Bookkeeping",
        description: "Comprehensive bookkeeping services to keep your finances organized.",
        phone1: "+201234567828",
        email: "bookkeeping@example.com",
        address: "2323 Numbers Blvd, Cairo",
        location: { lat: 30.3244, lng: 31.5157 },
        rating: 4.7,
        priceRange: "$$"
      },

      // Education and Training (6 services)
      {
        id: "30",
        userId: "system",
        category: "Education and Training",
        serviceName: "Tutoring",
        serviceType: "Math Tutoring",
        title: "Math Tutoring for All Levels",
        description: "Patient and experienced math tutor for elementary through college level mathematics.",
        phone1: "+201234567829",
        email: "mathtutor@example.com",
        address: "2424 Learn St, Cairo",
        location: { lat: 30.3344, lng: 31.5257 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "31",
        userId: "system",
        category: "Education and Training",
        serviceName: "Music Lessons",
        serviceType: "Piano Lessons",
        title: "Piano Lessons for Beginners",
        description: "Fun and engaging piano lessons for children and adult beginners.",
        phone1: "+201234567830",
        email: "pianolessons@example.com",
        address: "2525 Music Ave, Cairo",
        location: { lat: 30.3444, lng: 31.5357 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "32",
        userId: "system",
        category: "Education and Training",
        serviceName: "Fitness Training",
        serviceType: "Personal Training",
        title: "Personal Fitness Training",
        description: "Customized workout plans and one-on-one training to meet your fitness goals.",
        phone1: "+201234567831",
        email: "personaltrainer@example.com",
        address: "2626 Fitness Rd, Cairo",
        location: { lat: 30.3544, lng: 31.5457 },
        rating: 4.9,
        priceRange: "$$$"
      },
      {
        id: "33",
        userId: "system",
        category: "Education and Training",
        serviceName: "Cooking Classes",
        serviceType: "Baking Workshops",
        title: "Artisan Baking Classes",
        description: "Hands-on baking classes teaching bread, pastry, and dessert techniques.",
        phone1: "+201234567832",
        email: "bakingclass@example.com",
        address: "2727 Kitchen St, Cairo",
        location: { lat: 30.3644, lng: 31.5557 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "34",
        userId: "system",
        category: "Education and Training",
        serviceName: "Tutoring",
        serviceType: "Language Lessons",
        title: "English Language Tutoring",
        description: "Conversational English lessons with focus on pronunciation and fluency.",
        phone1: "+201234567833",
        email: "englishtutor@example.com",
        address: "2828 Language Ave, Cairo",
        location: { lat: 30.3744, lng: 31.5657 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "35",
        userId: "system",
        category: "Education and Training",
        serviceName: "Music Lessons",
        serviceType: "Guitar Lessons",
        title: "Guitar Lessons for All Ages",
        description: "Learn acoustic or electric guitar from an experienced musician.",
        phone1: "+201234567834",
        email: "guitarlessons@example.com",
        address: "2929 Strings Blvd, Cairo",
        location: { lat: 30.3844, lng: 31.5757 },
        rating: 4.6,
        priceRange: "$$"
      },

      // Event Services (5 services)
      {
        id: "36",
        userId: "system",
        category: "Event Services",
        serviceName: "Event Planning",
        serviceType: "Wedding Planning",
        title: "Full-Service Wedding Planning",
        description: "Stress-free wedding planning from venue selection to day-of coordination.",
        phone1: "+201234567835",
        email: "weddingplanner@example.com",
        address: "3030 Celebration St, Cairo",
        location: { lat: 30.3944, lng: 31.5857 },
        rating: 4.9,
        priceRange: "$$$$"
      },
      {
        id: "37",
        userId: "system",
        category: "Event Services",
        serviceName: "Catering",
        serviceType: "Buffet Catering",
        title: "Gourmet Buffet Catering",
        description: "Elegant buffet catering for weddings, corporate events, and special occasions.",
        phone1: "+201234567836",
        email: "catering@example.com",
        address: "3131 Food Ave, Cairo",
        location: { lat: 30.4044, lng: 31.5957 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "38",
        userId: "system",
        category: "Event Services",
        serviceName: "Photography",
        serviceType: "Event Photography",
        title: "Professional Event Photography",
        description: "High-quality photography coverage for all types of events and celebrations.",
        phone1: "+201234567837",
        email: "eventphoto@example.com",
        address: "3232 Camera Rd, Cairo",
        location: { lat: 30.4144, lng: 31.6057 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "39",
        userId: "system",
        category: "Event Services",
        serviceName: "DJ Services",
        serviceType: "Wedding DJ",
        title: "Wedding DJ & MC Services",
        description: "Professional DJ services with MC capabilities to keep your reception flowing.",
        phone1: "+201234567838",
        email: "weddingdj@example.com",
        address: "3333 Music St, Cairo",
        location: { lat: 30.4244, lng: 31.6157 },
        rating: 4.7,
        priceRange: "$$$"
      },
      {
        id: "40",
        userId: "system",
        category: "Event Services",
        serviceName: "Event Planning",
        serviceType: "Corporate Events",
        title: "Corporate Event Management",
        description: "Complete planning and execution of corporate meetings and conferences.",
        phone1: "+201234567839",
        email: "corpevents@example.com",
        address: "3434 Business Blvd, Cairo",
        location: { lat: 30.4344, lng: 31.6257 },
        rating: 4.7,
        priceRange: "$$$$"
      },

      // Tech Services (7 services)
      {
        id: "41",
        userId: "system",
        category: "Tech Services",
        serviceName: "IT Support",
        serviceType: "Computer Repair",
        title: "Computer Repair & Maintenance",
        description: "Diagnostic and repair services for all computer makes and models.",
        phone1: "+201234567840",
        email: "computerrepair@example.com",
        address: "3535 Tech St, Cairo",
        location: { lat: 30.4444, lng: 31.6357 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "42",
        userId: "system",
        category: "Tech Services",
        serviceName: "Web Development",
        serviceType: "Website Design",
        title: "Custom Website Development",
        description: "Beautiful, responsive websites designed for your business needs.",
        phone1: "+201234567841",
        email: "webdev@example.com",
        address: "3636 Code Ave, Cairo",
        location: { lat: 30.4544, lng: 31.6457 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "43",
        userId: "system",
        category: "Tech Services",
        serviceName: "Graphic Design",
        serviceType: "Logo Design",
        title: "Professional Logo Design",
        description: "Creative logo design that captures your brand identity.",
        phone1: "+201234567842",
        email: "logodesign@example.com",
        address: "3737 Design Rd, Cairo",
        location: { lat: 30.4644, lng: 31.6557 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "44",
        userId: "system",
        category: "Tech Services",
        serviceName: "Cybersecurity",
        serviceType: "Malware Removal",
        title: "Virus & Malware Removal",
        description: "Complete virus removal and system protection services.",
        phone1: "+201234567843",
        email: "malwareremoval@example.com",
        address: "3838 Security St, Cairo",
        location: { lat: 30.4744, lng: 31.6657 },
        rating: 4.9,
        priceRange: "$$"
      },
      {
        id: "45",
        userId: "system",
        category: "Tech Services",
        serviceName: "IT Support",
        serviceType: "Network Setup",
        title: "Home & Office Network Setup",
        description: "Professional installation and configuration of wired and wireless networks.",
        phone1: "+201234567844",
        email: "networksetup@example.com",
        address: "3939 Network Blvd, Cairo",
        location: { lat: 30.4844, lng: 31.6757 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "46",
        userId: "system",
        category: "Tech Services",
        serviceName: "Web Development",
        serviceType: "E-commerce Setup",
        title: "E-commerce Website Development",
        description: "Complete online store setup with payment processing integration.",
        phone1: "+201234567845",
        email: "ecommerce@example.com",
        address: "4040 Shop St, Cairo",
        location: { lat: 30.4944, lng: 31.6857 },
        rating: 4.8,
        priceRange: "$$$$"
      },
      {
        id: "47",
        userId: "system",
        category: "Tech Services",
        serviceName: "Graphic Design",
        serviceType: "Marketing Materials",
        title: "Marketing Material Design",
        description: "Professional design for business cards, brochures, and flyers.",
        phone1: "+201234567846",
        email: "graphicdesign@example.com",
        address: "4141 Creative Ave, Cairo",
        location: { lat: 30.5044, lng: 31.6957 },
        rating: 4.7,
        priceRange: "$$"
      },

      // Landscaping and Gardening (4 services)
      {
        id: "48",
        userId: "system",
        category: "Landscaping and Gardening",
        serviceName: "Lawn Care",
        serviceType: "Mowing",
        title: "Professional Lawn Mowing",
        description: "Regular lawn mowing and maintenance to keep your yard looking its best.",
        phone1: "+201234567847",
        email: "lawncare@example.com",
        address: "4242 Green St, Cairo",
        location: { lat: 30.5144, lng: 31.7057 },
        rating: 4.7,
        priceRange: "$"
      },
      {
        id: "49",
        userId: "system",
        category: "Landscaping and Gardening",
        serviceName: "Tree Services",
        serviceType: "Tree Trimming",
        title: "Tree Trimming & Pruning",
        description: "Professional tree care services to maintain healthy, beautiful trees.",
        phone1: "+201234567848",
        email: "treetrimming@example.com",
        address: "4343 Arbor Rd, Cairo",
        location: { lat: 30.5244, lng: 31.7157 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "50",
        userId: "system",
        category: "Landscaping and Gardening",
        serviceName: "Garden Design",
        serviceType: "Landscape Planning",
        title: "Custom Landscape Design",
        description: "Beautiful landscape designs tailored to your property and preferences.",
        phone1: "+201234567849",
        email: "landscapedesign@example.com",
        address: "4444 Garden Blvd, Cairo",
        location: { lat: 30.5344, lng: 31.7257 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "51",
        userId: "system",
        category: "Landscaping and Gardening",
        serviceName: "Lawn Care",
        serviceType: "Weed Control",
        title: "Lawn Weed Treatment",
        description: "Effective weed control treatments to maintain a healthy lawn.",
        phone1: "+201234567850",
        email: "weedcontrol@example.com",
        address: "4545 Lawn Ave, Cairo",
        location: { lat: 30.5444, lng: 31.7357 },
        rating: 4.6,
        priceRange: "$$"
      },

      // Health and Wellness (5 services)
      {
        id: "52",
        userId: "system",
        category: "Health and Wellness",
        serviceName: "Nutrition Counseling",
        serviceType: "Diet Planning",
        title: "Personalized Nutrition Plans",
        description: "Customized diet plans tailored to your health goals and dietary needs.",
        phone1: "+201234567851",
        email: "nutrition@example.com",
        address: "4646 Health St, Cairo",
        location: { lat: 30.5544, lng: 31.7457 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "53",
        userId: "system",
        category: "Health and Wellness",
        serviceName: "Physical Therapy",
        serviceType: "Injury Rehab",
        title: "Sports Injury Rehabilitation",
        description: "Specialized physical therapy for sports injuries and recovery.",
        phone1: "+201234567852",
        email: "physicaltherapy@example.com",
        address: "4747 Rehab Rd, Cairo",
        location: { lat: 30.5644, lng: 31.7557 },
        rating: 4.9,
        priceRange: "$$$"
      },
      {
        id: "54",
        userId: "system",
        category: "Health and Wellness",
        serviceName: "Mental Health Counseling",
        serviceType: "Therapy Sessions",
        title: "Individual Therapy Services",
        description: "Confidential counseling services for individuals facing life challenges.",
        phone1: "+201234567853",
        email: "therapy@example.com",
        address: "4848 Wellness Ave, Cairo",
        location: { lat: 30.5744, lng: 31.7657 },
        rating: 4.8,
        priceRange: "$$$"
      },
      {
        id: "55",
        userId: "system",
        category: "Health and Wellness",
        serviceName: "Nutrition Counseling",
        serviceType: "Weight Management",
        title: "Weight Loss Coaching",
        description: "Personalized coaching for sustainable weight loss and healthy habits.",
        phone1: "+201234567854",
        email: "weightloss@example.com",
        address: "4949 Fit Blvd, Cairo",
        location: { lat: 30.5844, lng: 31.7757 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "56",
        userId: "system",
        category: "Health and Wellness",
        serviceName: "Physical Therapy",
        serviceType: "Mobility Training",
        title: "Senior Mobility Training",
        description: "Specialized therapy to improve mobility and reduce fall risk for seniors.",
        phone1: "+201234567855",
        email: "mobility@example.com",
        address: "5050 Active St, Cairo",
        location: { lat: 30.5944, lng: 31.7857 },
        rating: 4.8,
        priceRange: "$$$"
      },

      // Pet Services (4 services)
      {
        id: "57",
        userId: "system",
        category: "Pet Services",
        serviceName: "Pet Grooming",
        serviceType: "Dog Grooming",
        title: "Professional Dog Grooming",
        description: "Full-service grooming including bath, haircut, and nail trimming for dogs.",
        phone1: "+201234567856",
        email: "doggrooming@example.com",
        address: "5151 Paws Ave, Cairo",
        location: { lat: 30.6044, lng: 31.7957 },
        rating: 4.9,
        priceRange: "$$"
      },
      {
        id: "58",
        userId: "system",
        category: "Pet Services",
        serviceName: "Pet Sitting",
        serviceType: "Dog Walking",
        title: "Daily Dog Walking Services",
        description: "Reliable dog walking services to keep your pet active and happy.",
        phone1: "+201234567857",
        email: "dogwalker@example.com",
        address: "5252 Walk St, Cairo",
        location: { lat: 30.6144, lng: 31.8057 },
        rating: 4.8,
        priceRange: "$"
      },
      {
        id: "59",
        userId: "system",
        category: "Pet Services",
        serviceName: "Veterinary Services",
        serviceType: "Vaccinations",
        title: "Pet Vaccination Clinic",
        description: "Affordable vaccination services for dogs and cats with licensed veterinarians.",
        phone1: "+201234567858",
        email: "petclinic@example.com",
        address: "5353 Vet Rd, Cairo",
        location: { lat: 30.6244, lng: 31.8157 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "60",
        userId: "system",
        category: "Pet Services",
        serviceName: "Pet Grooming",
        serviceType: "Cat Grooming",
        title: "Feline Grooming Specialist",
        description: "Gentle grooming services specifically for cats in a stress-free environment.",
        phone1: "+201234567859",
        email: "catgrooming@example.com",
        address: "5454 Meow Blvd, Cairo",
        location: { lat: 30.6344, lng: 31.8257 },
        rating: 4.7,
        priceRange: "$$"
      },

      // Moving and Storage (5 services)
      {
        id: "61",
        userId: "system",
        category: "Moving and Storage",
        serviceName: "Moving Services",
        serviceType: "Local Moving",
        title: "Local Moving Company",
        description: "Affordable local moving services with careful handling of all your belongings.",
        phone1: "+201234567860",
        email: "localmovers@example.com",
        address: "5555 Move St, Cairo",
        location: { lat: 30.6444, lng: 31.8357 },
        rating: 4.7,
        priceRange: "$$$"
      },
      {
        id: "62",
        userId: "system",
        category: "Moving and Storage",
        serviceName: "Packing Services",
        serviceType: "Packing Assistance",
        title: "Full-Service Packing",
        description: "Professional packing services using high-quality materials to protect your items.",
        phone1: "+201234567861",
        email: "packingservice@example.com",
        address: "5656 Box Ave, Cairo",
        location: { lat: 30.6544, lng: 31.8457 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "63",
        userId: "system",
        category: "Moving and Storage",
        serviceName: "Storage Solutions",
        serviceType: "Short-Term Storage",
        title: "Secure Short-Term Storage",
        description: "Clean, secure storage units available for short-term rental with 24/7 access.",
        phone1: "+201234567862",
        email: "storage@example.com",
        address: "5757 Store Rd, Cairo",
        location: { lat: 30.6644, lng: 31.8557 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "64",
        userId: "system",
        category: "Moving and Storage",
        serviceName: "Moving Services",
        serviceType: "Long-Distance Moving",
        title: "Long-Distance Movers",
        description: "Reliable nationwide moving services with tracking and insurance options.",
        phone1: "+201234567863",
        email: "longdistance@example.com",
        address: "5858 Truck Blvd, Cairo",
        location: { lat: 30.6744, lng: 31.8657 },
        rating: 4.8,
        priceRange: "$$$$"
      },
      {
        id: "65",
        userId: "system",
        category: "Moving and Storage",
        serviceName: "Packing Services",
        serviceType: "Unpacking",
        title: "Post-Move Unpacking Service",
        description: "Help unpacking and organizing your new home after your move.",
        phone1: "+201234567864",
        email: "unpacking@example.com",
        address: "5959 Unpack St, Cairo",
        location: { lat: 30.6844, lng: 31.8757 },
        rating: 4.7,
        priceRange: "$$"
      },

      // Childcare (6 services)
      {
        id: "66",
        userId: "system",
        category: "Childcare",
        serviceName: "Babysitting",
        serviceType: "Evening Babysitting",
        title: "Evening & Weekend Babysitting",
        description: "Reliable evening and weekend babysitting services by experienced caregivers.",
        phone1: "+201234567865",
        email: "babysitting@example.com",
        address: "6060 Kids Ave, Cairo",
        location: { lat: 30.6944, lng: 31.8857 },
        rating: 4.8,
        priceRange: "$$"
      },
      {
        id: "67",
        userId: "system",
        category: "Childcare",
        serviceName: "Daycare",
        serviceType: "Full-Day Care",
        title: "Full-Time Daycare Center",
        description: "Licensed daycare center offering full-time care with educational activities.",
        phone1: "+201234567866",
        email: "daycare@example.com",
        address: "6161 Child Rd, Cairo",
        location: { lat: 30.7044, lng: 31.8957 },
        rating: 4.7,
        priceRange: "$$$"
      },
      {
        id: "68",
        userId: "system",
        category: "Childcare",
        serviceName: "Nanny Services",
        serviceType: "Live-In Nanny",
        title: "Professional Live-In Nannies",
        description: "Screened and experienced live-in nannies providing full childcare support.",
        phone1: "+201234567867",
        email: "nanny@example.com",
        address: "6262 Care Blvd, Cairo",
        location: { lat: 30.7144, lng: 31.9057 },
        rating: 4.8,
        priceRange: "$$$$"
      },
      {
        id: "69",
        userId: "system",
        category: "Childcare",
        serviceName: "Babysitting",
        serviceType: "After-School Care",
        title: "After-School Childcare",
        description: "Supervised after-school care including homework help and activities.",
        phone1: "+201234567868",
        email: "afterschool@example.com",
        address: "6363 School St, Cairo",
        location: { lat: 30.7244, lng: 31.9157 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "70",
        userId: "system",
        category: "Childcare",
        serviceName: "Daycare",
        serviceType: "Drop-In Care",
        title: "Flexible Drop-In Daycare",
        description: "Hourly daycare services for when you need occasional childcare support.",
        phone1: "+201234567869",
        email: "dropindaycare@example.com",
        address: "6464 Flex Ave, Cairo",
        location: { lat: 30.7344, lng: 31.9257 },
        rating: 4.7,
        priceRange: "$$"
      },
      {
        id: "71",
        userId: "system",
        category: "Childcare",
        serviceName: "Nanny Services",
        serviceType: "Part-Time Nanny",
        title: "Part-Time Nanny Services",
        description: "Experienced part-time nannies available for regular or occasional childcare.",
        phone1: "+201234567870",
        email: "parttimenanny@example.com",
        address: "6565 Nanny Rd, Cairo",
        location: { lat: 30.7444, lng: 31.9357 },
        rating: 4.8,
        priceRange: "$$$"
      }
    ];
    
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