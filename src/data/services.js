// Service categories and subcategories data

import axios from "axios"
import BrikoulchiApi from "../api/BrikoulchiApi";
import { useAuth } from "../context/AuthContext";
// export default function hello(){
//     return 0;
// }
export async function APICategories(withGlobalServices = false) {
    try {
        const url = withGlobalServices ? `http://127.0.0.1:8000/api/Categories/${withGlobalServices}` :
            "http://127.0.0.1:8000/api/Categories";
        const res = await axios.get(url);
        return res.data;
    }
    catch (error) {
        console.log(error.message);
    }
}
export async function APIServices(userId = null, globalserviceId = null) {
    
    try {
        let url = userId
        ? `http://127.0.0.1:8000/api/Services/${userId}`
        : globalserviceId
        ? `http://127.0.0.1:8000/api/GServices/${globalserviceId}`
        : `http://127.0.0.1:8000/api/Services`;
        const res = await BrikoulchiApi.get(url);      
        // console.log('userID', userId);
        // console.log('globalID', globalserviceId);
        // console.log('this is the response:', res);  
        return res.data;
    } catch (error) {
        console.log(error.message + "fetching services error");
    }
}
export async function getInitialServices(userId = null) {
    return APIServices(userId);
}
export default async function getInitialCategories(withGlobalServices) {
    return APICategories(withGlobalServices);
}
// export const serviceCategories = [
//     {
//         id: 1,
//         name: "Home Services",
//         icon: "fa-house",
//         description: "Expert services for home maintenance and repairs",
//         services: [
//             "Plumbing",
//             "Electrical",
//             "HVAC",
//             "Carpentry",
//             "Painting"
//         ],
//         subcategories: {
//             "Plumbing": ["Pipe Repair", "Leak Fixing", "Drain Cleaning", "Water Heater Installation"],
//             "Electrical": ["Wiring Installation", "Light Fixture Repair", "Circuit Breaker Replacement"],
//             "HVAC": ["AC Repair", "Heating Installation", "Duct Cleaning"],
//             "Carpentry": ["Furniture Assembly", "Door Installation", "Woodwork Repair"],
//             "Painting": ["Interior Painting", "Exterior Painting", "Wallpaper Installation"]
//         }
//     },
//     {
//         id: 2,
//         name: "Cleaning Services",
//         icon: "fa-broom",
//         description: "Professional cleaning services for homes and businesses",
//         services: [
//             "House Cleaning",
//             "Carpet Cleaning",
//             "Window Cleaning",
//             "Commercial Cleaning"
//         ],
//         subcategories: {
//             "House Cleaning": ["Deep Cleaning", "Regular Maid Service", "Move-Out Cleaning"],
//             "Carpet Cleaning": ["Steam Cleaning", "Stain Removal"],
//             "Window Cleaning": ["Interior/Exterior Window Washing"],
//             "Commercial Cleaning": ["Office Cleaning", "Post-Construction Cleanup"]
//         }
//     },
//     {
//         id: 3,
//         name: "Automotive Services",
//         icon: "fa-car",
//         description: "Complete automotive care and maintenance services",
//         services: [
//             "Car Repair",
//             "Car Wash",
//             "Tire Services",
//             "Auto Body Repair"
//         ],
//         subcategories: {
//             "Car Repair": ["Brake Repair", "Oil Change", "Engine Diagnostics"],
//             "Car Wash": ["Exterior Wash", "Full Detailing", "Waxing"],
//             "Tire Services": ["Tire Rotation", "Flat Tire Repair", "Alignment"],
//             "Auto Body Repair": ["Dent Removal", "Paint Touch-Up"]
//         }
//     },
//     {
//         id: 4,
//         name: "Personal Care",
//         icon: "fa-spa",
//         description: "Professional beauty and wellness services",
//         services: [
//             "Hairdressing",
//             "Nail Services",
//             "Massage Therapy",
//             "Skincare"
//         ],
//         subcategories: {
//             "Hairdressing": ["Haircut", "Coloring", "Styling"],
//             "Nail Services": ["Manicure", "Pedicure", "Gel Nails"],
//             "Massage Therapy": ["Swedish Massage", "Deep Tissue Massage"],
//             "Skincare": ["Facials", "Waxing", "Microdermabrasion"]
//         }
//     },
//     {
//         id: 5,
//         name: "Professional Services",
//         icon: "fa-briefcase",
//         description: "Expert professional services for individuals and businesses",
//         services: [
//             "Legal Services",
//             "Accounting",
//             "Consulting",
//             "Translation"
//         ],
//         subcategories: {
//             "Legal Services": ["Contract Review", "Will Drafting", "Consultation"],
//             "Accounting": ["Tax Preparation", "Bookkeeping", "Payroll"],
//             "Consulting": ["Business Strategy", "Marketing Consulting"],
//             "Translation": ["Document Translation", "Interpretation"]
//         }
//     },
//     {
//         id: 6,
//         name: "Education and Training",
//         icon: "fa-graduation-cap",
//         description: "Learning opportunities for all ages and interests",
//         services: [
//             "Tutoring",
//             "Music Lessons",
//             "Fitness Training",
//             "Cooking Classes"
//         ],
//         subcategories: {
//             "Tutoring": ["Math Tutoring", "Language Lessons", "Test Prep"],
//             "Music Lessons": ["Piano Lessons", "Guitar Lessons"],
//             "Fitness Training": ["Personal Training", "Yoga Instruction"],
//             "Cooking Classes": ["Baking Workshops", "Cuisine-Specific Classes"]
//         }
//     },
//     {
//         id: 7,
//         name: "Event Services",
//         icon: "fa-calendar-days",
//         description: "Complete event planning and management services",
//         services: [
//             "Event Planning",
//             "Catering",
//             "Photography",
//             "DJ Services"
//         ],
//         subcategories: {
//             "Event Planning": ["Wedding Planning", "Corporate Events"],
//             "Catering": ["Buffet Catering", "Dessert Tables"],
//             "Photography": ["Event Photography", "Portrait Sessions"],
//             "DJ Services": ["Party DJ", "Wedding DJ"]
//         }
//     },
//     {
//         id: 8,
//         name: "Tech Services",
//         icon: "fa-laptop-code",
//         description: "Technical solutions for modern digital needs",
//         services: [
//             "IT Support",
//             "Web Development",
//             "Graphic Design",
//             "Cybersecurity"
//         ],
//         subcategories: {
//             "IT Support": ["Computer Repair", "Network Setup"],
//             "Web Development": ["Website Design", "E-commerce Setup"],
//             "Graphic Design": ["Logo Design", "Marketing Materials"],
//             "Cybersecurity": ["Malware Removal", "Security Audits"]
//         }
//     },
//     {
//         id: 9,
//         name: "Landscaping and Gardening",
//         icon: "fa-leaf",
//         description: "Professional outdoor space design and maintenance",
//         services: [
//             "Lawn Care",
//             "Tree Services",
//             "Garden Design"
//         ],
//         subcategories: {
//             "Lawn Care": ["Mowing", "Weed Control"],
//             "Tree Services": ["Tree Trimming", "Stump Removal"],
//             "Garden Design": ["Landscape Planning", "Plant Installation"]
//         }
//     },
//     {
//         id: 10,
//         name: "Health and Wellness",
//         icon: "fa-heart-pulse",
//         description: "Services supporting physical and mental wellbeing",
//         services: [
//             "Nutrition Counseling",
//             "Physical Therapy",
//             "Mental Health Counseling"
//         ],
//         subcategories: {
//             "Nutrition Counseling": ["Diet Planning", "Weight Management"],
//             "Physical Therapy": ["Injury Rehab", "Mobility Training"],
//             "Mental Health Counseling": ["Therapy Sessions", "Stress Management"]
//         }
//     },
//     {
//         id: 11,
//         name: "Pet Services",
//         icon: "fa-paw",
//         description: "Comprehensive care services for your furry friends",
//         services: [
//             "Pet Grooming",
//             "Pet Sitting",
//             "Veterinary Services"
//         ],
//         subcategories: {
//             "Pet Grooming": ["Dog Grooming", "Cat Grooming"],
//             "Pet Sitting": ["Dog Walking", "In-Home Pet Care"],
//             "Veterinary Services": ["Vaccinations", "Check-Ups"]
//         }
//     },
//     {
//         id: 12,
//         name: "Moving and Storage",
//         icon: "fa-truck",
//         description: "Reliable moving and storage solutions",
//         services: [
//             "Moving Services",
//             "Packing Services",
//             "Storage Solutions"
//         ],
//         subcategories: {
//             "Moving Services": ["Local Moving", "Long-Distance Moving"],
//             "Packing Services": ["Packing Assistance", "Unpacking"],
//             "Storage Solutions": ["Short-Term Storage", "Warehouse Storage"]
//         }
//     },
//     {
//         id: 13,
//         name: "Childcare",
//         icon: "fa-children",
//         description: "Trusted childcare services for all needs",
//         services: [
//             "Babysitting",
//             "Daycare",
//             "Nanny Services"
//         ],
//         subcategories: {
//             "Babysitting": ["Evening Babysitting", "After-School Care"],
//             "Daycare": ["Full-Day Care", "Drop-In Care"],
//             "Nanny Services": ["Live-In Nanny", "Part-Time Nanny"]
//         }
//     }
// ]

// // Function to get all services data (for initial render)







// export const getInitialServices = () => {
//     const storedServices = localStorage.getItem('services')

//     if (storedServices) {
//         return JSON.parse(storedServices)
//     } else {
//         // Create comprehensive initial services
//         const initialServices = [
//             // Home Services (6 services)
//             {
//                 id: "1",
//                 userId: "system",
//                 category: "Home Services",
//                 serviceName: "Plumbing",
//                 serviceType: "Pipe Repair",
//                 title: "Emergency Pipe Repair Services",
//                 description: "24/7 plumbing services for all pipe emergencies. Fast response time with 10+ years experience.",
//                 phone1: "+201234567890",
//                 email: "plumber@example.com",
//                 address: "123 Main St, London",
//                 location: { lat: 51.5074, lng: -0.1278 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "2",
//                 userId: "system",
//                 category: "Home Services",
//                 serviceName: "Electrical",
//                 serviceType: "Wiring Installation",
//                 title: "Professional Electrical Wiring",
//                 description: "Certified electricians for safe wiring installations and repairs in homes and offices.",
//                 phone1: "+201234567891",
//                 email: "electrician@example.com",
//                 address: "456 Electric Ave, New York",
//                 location: { lat: 40.7128, lng: -74.0060 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "3",
//                 userId: "system",
//                 category: "Home Services",
//                 serviceName: "HVAC",
//                 serviceType: "AC Repair",
//                 title: "AC Installation & Repair Experts",
//                 description: "Specialists in all AC brands with same-day service available for urgent repairs.",
//                 phone1: "+201234567892",
//                 email: "acrepair@example.com",
//                 address: "789 Cool St, Tokyo",
//                 location: { lat: 35.6762, lng: 139.6503 },
//                 rating: 4.9,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "4",
//                 userId: "system",
//                 category: "Home Services",
//                 serviceName: "Carpentry",
//                 serviceType: "Furniture Assembly",
//                 title: "Precision Carpentry & Assembly",
//                 description: "Custom furniture building and professional assembly of all flat-pack furniture.",
//                 phone1: "+201234567893",
//                 email: "carpenter@example.com",
//                 address: "321 Wood Rd, Sydney",
//                 location: { lat: -33.8688, lng: 151.2093 },
//                 rating: 4.6,
//                 priceRange: "$$"
//             },
//             {
//                 id: "5",
//                 userId: "system",
//                 category: "Home Services",
//                 serviceName: "Painting",
//                 serviceType: "Interior Painting",
//                 title: "Interior Painting Specialists",
//                 description: "High-quality interior painting with premium materials and clean, professional service.",
//                 phone1: "+201234567894",
//                 email: "painter@example.com",
//                 address: "654 Color St, Paris",
//                 location: { lat: 48.8566, lng: 2.3522 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "6",
//                 userId: "system",
//                 category: "Home Services",
//                 serviceName: "Plumbing",
//                 serviceType: "Water Heater Installation",
//                 title: "Water Heater Installation Pros",
//                 description: "Expert installation of all water heater types with warranty on all work.",
//                 phone1: "+201234567895",
//                 email: "waterheater@example.com",
//                 address: "987 Heat Blvd, Dubai",
//                 location: { lat: 25.2048, lng: 55.2708 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },

//             // Cleaning Services (5 services)
//             {
//                 id: "7",
//                 userId: "system",
//                 category: "Cleaning Services",
//                 serviceName: "House Cleaning",
//                 serviceType: "Deep Cleaning",
//                 title: "Thorough Deep Cleaning Service",
//                 description: "Comprehensive deep cleaning for homes and apartments using eco-friendly products.",
//                 phone1: "+201234567896",
//                 email: "deepclean@example.com",
//                 address: "111 Sparkle St, Singapore",
//                 location: { lat: 1.3521, lng: 103.8198 },
//                 rating: 4.9,
//                 priceRange: "$$"
//             },
//             {
//                 id: "8",
//                 userId: "system",
//                 category: "Cleaning Services",
//                 serviceName: "Carpet Cleaning",
//                 serviceType: "Steam Cleaning",
//                 title: "Professional Carpet Steam Cleaning",
//                 description: "Advanced steam cleaning that removes deep stains and allergens from carpets.",
//                 phone1: "+201234567897",
//                 email: "carpetclean@example.com",
//                 address: "222 Fabric Ave, Toronto",
//                 location: { lat: 43.6532, lng: -79.3832 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "9",
//                 userId: "system",
//                 category: "Cleaning Services",
//                 serviceName: "Window Cleaning",
//                 serviceType: "Interior/Exterior Window Washing",
//                 title: "Crystal Clear Window Cleaning",
//                 description: "Streak-free window cleaning for both interior and exterior surfaces of any building.",
//                 phone1: "+201234567898",
//                 email: "windowclean@example.com",
//                 address: "333 Glass Rd, Hong Kong",
//                 location: { lat: 22.3193, lng: 114.1694 },
//                 rating: 4.8,
//                 priceRange: "$"
//             },
//             {
//                 id: "10",
//                 userId: "system",
//                 category: "Cleaning Services",
//                 serviceName: "Commercial Cleaning",
//                 serviceType: "Office Cleaning",
//                 title: "Office Cleaning Professionals",
//                 description: "Reliable daily, weekly or monthly cleaning services for offices and businesses.",
//                 phone1: "+201234567899",
//                 email: "officeclean@example.com",
//                 address: "444 Business St, Berlin",
//                 location: { lat: 52.5200, lng: 13.4050 },
//                 rating: 4.6,
//                 priceRange: "$$"
//             },
//             {
//                 id: "11",
//                 userId: "system",
//                 category: "Cleaning Services",
//                 serviceName: "House Cleaning",
//                 serviceType: "Move-Out Cleaning",
//                 title: "Move-Out Cleaning Specialists",
//                 description: "Complete cleaning service for rental properties to ensure full deposit return.",
//                 phone1: "+201234567810",
//                 email: "moveclean@example.com",
//                 address: "555 Rental Ave, Mumbai",
//                 location: { lat: 19.0760, lng: 72.8777 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },

//             // Automotive Services (6 services)
//             {
//                 id: "12",
//                 userId: "system",
//                 category: "Automotive Services",
//                 serviceName: "Car Repair",
//                 serviceType: "Brake Repair",
//                 title: "Expert Brake Repair & Replacement",
//                 description: "Complete brake system services including pads, rotors, and fluid changes.",
//                 phone1: "+201234567811",
//                 email: "brakerepair@example.com",
//                 address: "666 Auto St, Los Angeles",
//                 location: { lat: 34.0522, lng: -118.2437 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "13",
//                 userId: "system",
//                 category: "Automotive Services",
//                 serviceName: "Car Wash",
//                 serviceType: "Full Detailing",
//                 title: "Premium Auto Detailing Service",
//                 description: "Complete interior and exterior detailing to make your car look brand new.",
//                 phone1: "+201234567812",
//                 email: "detail@example.com",
//                 address: "777 Shine Rd, São Paulo",
//                 location: { lat: -23.5505, lng: -46.6333 },
//                 rating: 4.9,
//                 priceRange: "$$"
//             },
//             {
//                 id: "14",
//                 userId: "system",
//                 category: "Automotive Services",
//                 serviceName: "Tire Services",
//                 serviceType: "Tire Rotation",
//                 title: "Complete Tire Services",
//                 description: "Tire rotation, balancing, and repair services to extend your tire life.",
//                 phone1: "+201234567813",
//                 email: "tireservice@example.com",
//                 address: "888 Wheel Ave, Moscow",
//                 location: { lat: 55.7558, lng: 37.6173 },
//                 rating: 4.7,
//                 priceRange: "$"
//             },
//             {
//                 id: "15",
//                 userId: "system",
//                 category: "Automotive Services",
//                 serviceName: "Auto Body Repair",
//                 serviceType: "Dent Removal",
//                 title: "Paintless Dent Removal Experts",
//                 description: "Specializing in paintless dent removal to restore your car's appearance.",
//                 phone1: "+201234567814",
//                 email: "dentrepair@example.com",
//                 address: "999 Body St, Seoul",
//                 location: { lat: 37.5665, lng: 126.9780 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "16",
//                 userId: "system",
//                 category: "Automotive Services",
//                 serviceName: "Car Repair",
//                 serviceType: "Oil Change",
//                 title: "Quick Oil Change Service",
//                 description: "Fast and affordable oil changes with premium synthetic and conventional oils.",
//                 phone1: "+201234567815",
//                 email: "oilchange@example.com",
//                 address: "1010 Lube Blvd, Mexico City",
//                 location: { lat: 19.4326, lng: -99.1332 },
//                 rating: 4.6,
//                 priceRange: "$"
//             },
//             {
//                 id: "17",
//                 userId: "system",
//                 category: "Automotive Services",
//                 serviceName: "Car Wash",
//                 serviceType: "Exterior Wash",
//                 title: "Express Car Wash",
//                 description: "5-minute exterior wash with free vacuuming included in all packages.",
//                 phone1: "+201234567816",
//                 email: "expresswash@example.com",
//                 address: "1111 Clean St, Jakarta",
//                 location: { lat: -6.2088, lng: 106.8456 },
//                 rating: 4.5,
//                 priceRange: "$"
//             },

//             // Personal Care (7 services)
//             {
//                 id: "18",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Hairdressing",
//                 serviceType: "Haircut",
//                 title: "Luxury Hair Salon",
//                 description: "Premium haircuts and styling from award-winning stylists in a modern salon.",
//                 phone1: "+201234567817",
//                 email: "hairsalon@example.com",
//                 address: "1212 Style Ave, Istanbul",
//                 location: { lat: 41.0082, lng: 28.9784 },
//                 rating: 4.9,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "19",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Nail Services",
//                 serviceType: "Manicure",
//                 title: "Nail Art Studio",
//                 description: "Creative nail designs and professional manicures using top-quality products.",
//                 phone1: "+201234567818",
//                 email: "nailstudio@example.com",
//                 address: "1313 Polish Rd, Bangkok",
//                 location: { lat: 13.7563, lng: 100.5018 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "20",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Massage Therapy",
//                 serviceType: "Swedish Massage",
//                 title: "Tranquil Massage Spa",
//                 description: "Relaxing Swedish massage therapy to relieve stress and muscle tension.",
//                 phone1: "+201234567819",
//                 email: "massagespa@example.com",
//                 address: "1414 Relax St, Beijing",
//                 location: { lat: 39.9042, lng: 116.4074 },
//                 rating: 4.9,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "21",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Skincare",
//                 serviceType: "Facials",
//                 title: "Medical Aesthetic Clinic",
//                 description: "Professional facials and skincare treatments tailored to your skin type.",
//                 phone1: "+201234567820",
//                 email: "skinclinic@example.com",
//                 address: "1515 Glow Blvd, Shanghai",
//                 location: { lat: 31.2304, lng: 121.4737 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "22",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Hairdressing",
//                 serviceType: "Coloring",
//                 title: "Hair Color Specialists",
//                 description: "Expert hair coloring services using ammonia-free dyes for vibrant results.",
//                 phone1: "+201234567821",
//                 email: "haircolor@example.com",
//                 address: "1616 Dye St, Buenos Aires",
//                 location: { lat: -34.6037, lng: -58.3816 },
//                 rating: 4.7,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "23",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Nail Services",
//                 serviceType: "Gel Nails",
//                 title: "Gel Nail Extensions",
//                 description: "Long-lasting gel nail extensions with custom shaping and designs.",
//                 phone1: "+201234567822",
//                 email: "gelnails@example.com",
//                 address: "1717 Nail Ave, Lagos",
//                 location: { lat: 6.5244, lng: 3.3792 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "24",
//                 userId: "system",
//                 category: "Personal Care",
//                 serviceName: "Massage Therapy",
//                 serviceType: "Deep Tissue Massage",
//                 title: "Therapeutic Deep Tissue Massage",
//                 description: "Targeted deep tissue massage to relieve chronic muscle pain and tension.",
//                 phone1: "+201234567823",
//                 email: "deeptissue@example.com",
//                 address: "1818 Therapy Rd, Rio de Janeiro",
//                 location: { lat: -22.9068, lng: -43.1729 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },

//             // Professional Services (5 services)
//             {
//                 id: "25",
//                 userId: "system",
//                 category: "Professional Services",
//                 serviceName: "Legal Services",
//                 serviceType: "Contract Review",
//                 title: "Business Contract Review",
//                 description: "Thorough legal review of business contracts and agreements by experienced attorneys.",
//                 phone1: "+201234567824",
//                 email: "legalreview@example.com",
//                 address: "1919 Law St, Chicago",
//                 location: { lat: 41.8781, lng: -87.6298 },
//                 rating: 4.9,
//                 priceRange: "$$$$"
//             },
//             {
//                 id: "26",
//                 userId: "system",
//                 category: "Professional Services",
//                 serviceName: "Accounting",
//                 serviceType: "Tax Preparation",
//                 title: "Certified Tax Preparation",
//                 description: "Professional tax preparation services for individuals and small businesses.",
//                 phone1: "+201234567825",
//                 email: "taxprep@example.com",
//                 address: "2020 Finance Ave, Houston",
//                 location: { lat: 29.7604, lng: -95.3698 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "27",
//                 userId: "system",
//                 category: "Professional Services",
//                 serviceName: "Consulting",
//                 serviceType: "Business Strategy",
//                 title: "Business Growth Consulting",
//                 description: "Strategic consulting to help businesses scale and improve operations.",
//                 phone1: "+201234567826",
//                 email: "businessconsult@example.com",
//                 address: "2121 Strategy Rd, Dallas",
//                 location: { lat: 32.7767, lng: -96.7970 },
//                 rating: 4.7,
//                 priceRange: "$$$$"
//             },
//             {
//                 id: "28",
//                 userId: "system",
//                 category: "Professional Services",
//                 serviceName: "Translation",
//                 serviceType: "Document Translation",
//                 title: "Certified Document Translation",
//                 description: "Accurate translation of legal, medical, and business documents in multiple languages.",
//                 phone1: "+201234567827",
//                 email: "translation@example.com",
//                 address: "2222 Language St, Philadelphia",
//                 location: { lat: 39.9526, lng: -75.1652 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "29",
//                 userId: "system",
//                 category: "Professional Services",
//                 serviceName: "Accounting",
//                 serviceType: "Bookkeeping",
//                 title: "Small Business Bookkeeping",
//                 description: "Comprehensive bookkeeping services to keep your finances organized.",
//                 phone1: "+201234567828",
//                 email: "bookkeeping@example.com",
//                 address: "2323 Numbers Blvd, Atlanta",
//                 location: { lat: 33.7490, lng: -84.3880 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },

//             // Education and Training (6 services)
//             {
//                 id: "30",
//                 userId: "system",
//                 category: "Education and Training",
//                 serviceName: "Tutoring",
//                 serviceType: "Math Tutoring",
//                 title: "Math Tutoring for All Levels",
//                 description: "Patient and experienced math tutor for elementary through college level mathematics.",
//                 phone1: "+201234567829",
//                 email: "mathtutor@example.com",
//                 address: "2424 Learn St, Miami",
//                 location: { lat: 25.7617, lng: -80.1918 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "31",
//                 userId: "system",
//                 category: "Education and Training",
//                 serviceName: "Music Lessons",
//                 serviceType: "Piano Lessons",
//                 title: "Piano Lessons for Beginners",
//                 description: "Fun and engaging piano lessons for children and adult beginners.",
//                 phone1: "+201234567830",
//                 email: "pianolessons@example.com",
//                 address: "2525 Music Ave, Seattle",
//                 location: { lat: 47.6062, lng: -122.3321 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "32",
//                 userId: "system",
//                 category: "Education and Training",
//                 serviceName: "Fitness Training",
//                 serviceType: "Personal Training",
//                 title: "Personal Fitness Training",
//                 description: "Customized workout plans and one-on-one training to meet your fitness goals.",
//                 phone1: "+201234567831",
//                 email: "personaltrainer@example.com",
//                 address: "2626 Fitness Rd, Denver",
//                 location: { lat: 39.7392, lng: -104.9903 },
//                 rating: 4.9,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "33",
//                 userId: "system",
//                 category: "Education and Training",
//                 serviceName: "Cooking Classes",
//                 serviceType: "Baking Workshops",
//                 title: "Artisan Baking Classes",
//                 description: "Hands-on baking classes teaching bread, pastry, and dessert techniques.",
//                 phone1: "+201234567832",
//                 email: "bakingclass@example.com",
//                 address: "2727 Kitchen St, Boston",
//                 location: { lat: 42.3601, lng: -71.0589 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "34",
//                 userId: "system",
//                 category: "Education and Training",
//                 serviceName: "Tutoring",
//                 serviceType: "Language Lessons",
//                 title: "English Language Tutoring",
//                 description: "Conversational English lessons with focus on pronunciation and fluency.",
//                 phone1: "+201234567833",
//                 email: "englishtutor@example.com",
//                 address: "2828 Language Ave, Phoenix",
//                 location: { lat: 33.4484, lng: -112.0740 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "35",
//                 userId: "system",
//                 category: "Education and Training",
//                 serviceName: "Music Lessons",
//                 serviceType: "Guitar Lessons",
//                 title: "Guitar Lessons for All Ages",
//                 description: "Learn acoustic or electric guitar from an experienced musician.",
//                 phone1: "+201234567834",
//                 email: "guitarlessons@example.com",
//                 address: "2929 Strings Blvd, San Francisco",
//                 location: { lat: 37.7749, lng: -122.4194 },
//                 rating: 4.6,
//                 priceRange: "$$"
//             },

//             // Event Services (5 services)
//             {
//                 id: "36",
//                 userId: "system",
//                 category: "Event Services",
//                 serviceName: "Event Planning",
//                 serviceType: "Wedding Planning",
//                 title: "Full-Service Wedding Planning",
//                 description: "Stress-free wedding planning from venue selection to day-of coordination.",
//                 phone1: "+201234567835",
//                 email: "weddingplanner@example.com",
//                 address: "3030 Celebration St, Washington DC",
//                 location: { lat: 38.9072, lng: -77.0369 },
//                 rating: 4.9,
//                 priceRange: "$$$$"
//             },
//             {
//                 id: "37",
//                 userId: "system",
//                 category: "Event Services",
//                 serviceName: "Catering",
//                 serviceType: "Buffet Catering",
//                 title: "Gourmet Buffet Catering",
//                 description: "Elegant buffet catering for weddings, corporate events, and special occasions.",
//                 phone1: "+201234567836",
//                 email: "catering@example.com",
//                 address: "3131 Food Ave, Las Vegas",
//                 location: { lat: 36.1699, lng: -115.1398 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "38",
//                 userId: "system",
//                 category: "Event Services",
//                 serviceName: "Photography",
//                 serviceType: "Event Photography",
//                 title: "Professional Event Photography",
//                 description: "High-quality photography coverage for all types of events and celebrations.",
//                 phone1: "+201234567837",
//                 email: "eventphoto@example.com",
//                 address: "3232 Camera Rd, Orlando",
//                 location: { lat: 28.5383, lng: -81.3792 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "39",
//                 userId: "system",
//                 category: "Event Services",
//                 serviceName: "DJ Services",
//                 serviceType: "Wedding DJ",
//                 title: "Wedding DJ & MC Services",
//                 description: "Professional DJ services with MC capabilities to keep your reception flowing.",
//                 phone1: "+201234567838",
//                 email: "weddingdj@example.com",
//                 address: "3333 Music St, San Diego",
//                 location: { lat: 32.7157, lng: -117.1611 },
//                 rating: 4.7,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "40",
//                 userId: "system",
//                 category: "Event Services",
//                 serviceName: "Event Planning",
//                 serviceType: "Corporate Events",
//                 title: "Corporate Event Management",
//                 description: "Complete planning and execution of corporate meetings and conferences.",
//                 phone1: "+201234567839",
//                 email: "corpevents@example.com",
//                 address: "3434 Business Blvd, Minneapolis",
//                 location: { lat: 44.9778, lng: -93.2650 },
//                 rating: 4.7,
//                 priceRange: "$$$$"
//             },

//             // Tech Services (7 services)
//             {
//                 id: "41",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "IT Support",
//                 serviceType: "Computer Repair",
//                 title: "Computer Repair & Maintenance",
//                 description: "Diagnostic and repair services for all computer makes and models.",
//                 phone1: "+201234567840",
//                 email: "computerrepair@example.com",
//                 address: "3535 Tech St, Detroit",
//                 location: { lat: 42.3314, lng: -83.0458 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "42",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "Web Development",
//                 serviceType: "Website Design",
//                 title: "Custom Website Development",
//                 description: "Beautiful, responsive websites designed for your business needs.",
//                 phone1: "+201234567841",
//                 email: "webdev@example.com",
//                 address: "3636 Code Ave, Portland",
//                 location: { lat: 45.5051, lng: -122.6750 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "43",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "Graphic Design",
//                 serviceType: "Logo Design",
//                 title: "Professional Logo Design",
//                 description: "Creative logo design that captures your brand identity.",
//                 phone1: "+201234567842",
//                 email: "logodesign@example.com",
//                 address: "3737 Design Rd, Charlotte",
//                 location: { lat: 35.2271, lng: -80.8431 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "44",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "Cybersecurity",
//                 serviceType: "Malware Removal",
//                 title: "Virus & Malware Removal",
//                 description: "Complete virus removal and system protection services.",
//                 phone1: "+201234567843",
//                 email: "malwareremoval@example.com",
//                 address: "3838 Security St, San Antonio",
//                 location: { lat: 29.4241, lng: -98.4936 },
//                 rating: 4.9,
//                 priceRange: "$$"
//             },
//             {
//                 id: "45",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "IT Support",
//                 serviceType: "Network Setup",
//                 title: "Home & Office Network Setup",
//                 description: "Professional installation and configuration of wired and wireless networks.",
//                 phone1: "+201234567844",
//                 email: "networksetup@example.com",
//                 address: "3939 Network Blvd, Indianapolis",
//                 location: { lat: 39.7684, lng: -86.1581 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "46",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "Web Development",
//                 serviceType: "E-commerce Setup",
//                 title: "E-commerce Website Development",
//                 description: "Complete online store setup with payment processing integration.",
//                 phone1: "+201234567845",
//                 email: "ecommerce@example.com",
//                 address: "4040 Shop St, Columbus",
//                 location: { lat: 39.9612, lng: -82.9988 },
//                 rating: 4.8,
//                 priceRange: "$$$$"
//             },
//             {
//                 id: "47",
//                 userId: "system",
//                 category: "Tech Services",
//                 serviceName: "Graphic Design",
//                 serviceType: "Marketing Materials",
//                 title: "Marketing Material Design",
//                 description: "Professional design for business cards, brochures, and flyers.",
//                 phone1: "+201234567846",
//                 email: "graphicdesign@example.com",
//                 address: "4141 Creative Ave, Austin",
//                 location: { lat: 30.2672, lng: -97.7431 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },

//             // Landscaping and Gardening (4 services)
//             {
//                 id: "48",
//                 userId: "system",
//                 category: "Landscaping and Gardening",
//                 serviceName: "Lawn Care",
//                 serviceType: "Mowing",
//                 title: "Professional Lawn Mowing",
//                 description: "Regular lawn mowing and maintenance to keep your yard looking its best.",
//                 phone1: "+201234567847",
//                 email: "lawncare@example.com",
//                 address: "4242 Green St, Nashville",
//                 location: { lat: 36.1627, lng: -86.7816 },
//                 rating: 4.7,
//                 priceRange: "$"
//             },
//             {
//                 id: "49",
//                 userId: "system",
//                 category: "Landscaping and Gardening",
//                 serviceName: "Tree Services",
//                 serviceType: "Tree Trimming",
//                 title: "Tree Trimming & Pruning",
//                 description: "Professional tree care services to maintain healthy, beautiful trees.",
//                 phone1: "+201234567848",
//                 email: "treetrimming@example.com",
//                 address: "4343 Arbor Rd, Baltimore",
//                 location: { lat: 39.2904, lng: -76.6122 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "50",
//                 userId: "system",
//                 category: "Landscaping and Gardening",
//                 serviceName: "Garden Design",
//                 serviceType: "Landscape Planning",
//                 title: "Custom Landscape Design",
//                 description: "Beautiful landscape designs tailored to your property and preferences.",
//                 phone1: "+201234567849",
//                 email: "landscapedesign@example.com",
//                 address: "4444 Garden Blvd, Louisville",
//                 location: { lat: 38.2527, lng: -85.7585 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "51",
//                 userId: "system",
//                 category: "Landscaping and Gardening",
//                 serviceName: "Lawn Care",
//                 serviceType: "Weed Control",
//                 title: "Lawn Weed Treatment",
//                 description: "Effective weed control treatments to maintain a healthy lawn.",
//                 phone1: "+201234567850",
//                 email: "weedcontrol@example.com",
//                 address: "4545 Lawn Ave, Milwaukee",
//                 location: { lat: 43.0389, lng: -87.9065 },
//                 rating: 4.6,
//                 priceRange: "$$"
//             },

//             // Health and Wellness (5 services)
//             {
//                 id: "52",
//                 userId: "system",
//                 category: "Health and Wellness",
//                 serviceName: "Nutrition Counseling",
//                 serviceType: "Diet Planning",
//                 title: "Personalized Nutrition Plans",
//                 description: "Customized diet plans tailored to your health goals and dietary needs.",
//                 phone1: "+201234567851",
//                 email: "nutrition@example.com",
//                 address: "4646 Health St, Albuquerque",
//                 location: { lat: 35.0844, lng: -106.6504 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "53",
//                 userId: "system",
//                 category: "Health and Wellness",
//                 serviceName: "Physical Therapy",
//                 serviceType: "Injury Rehab",
//                 title: "Sports Injury Rehabilitation",
//                 description: "Specialized physical therapy for sports injuries and recovery.",
//                 phone1: "+201234567852",
//                 email: "physicaltherapy@example.com",
//                 address: "4747 Rehab Rd, Tucson",
//                 location: { lat: 32.2226, lng: -110.9747 },
//                 rating: 4.9,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "54",
//                 userId: "system",
//                 category: "Health and Wellness",
//                 serviceName: "Mental Health Counseling",
//                 serviceType: "Therapy Sessions",
//                 title: "Individual Therapy Services",
//                 description: "Confidential counseling services for individuals facing life challenges.",
//                 phone1: "+201234567853",
//                 email: "therapy@example.com",
//                 address: "4848 Wellness Ave, Fresno",
//                 location: { lat: 36.7378, lng: -119.7871 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },
//             {
//                 id: "55",
//                 userId: "system",
//                 category: "Health and Wellness",
//                 serviceName: "Nutrition Counseling",
//                 serviceType: "Weight Management",
//                 title: "Weight Loss Coaching",
//                 description: "Personalized coaching for sustainable weight loss and healthy habits.",
//                 phone1: "+201234567854",
//                 email: "weightloss@example.com",
//                 address: "4949 Fit Blvd, Sacramento",
//                 location: { lat: 38.5816, lng: -121.4944 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },
//             {
//                 id: "56",
//                 userId: "system",
//                 category: "Health and Wellness",
//                 serviceName: "Physical Therapy",
//                 serviceType: "Mobility Training",
//                 title: "Senior Mobility Training",
//                 description: "Specialized therapy to improve mobility and reduce fall risk for seniors.",
//                 phone1: "+201234567855",
//                 email: "mobility@example.com",
//                 address: "5050 Active St, Kansas City",
//                 location: { lat: 39.0997, lng: -94.5786 },
//                 rating: 4.8,
//                 priceRange: "$$$"
//             },

//             // Pet Services (4 services)
//             {
//                 id: "57",
//                 userId: "system",
//                 category: "Pet Services",
//                 serviceName: "Pet Grooming",
//                 serviceType: "Dog Grooming",
//                 title: "Professional Dog Grooming",
//                 description: "Full-service grooming including bath, haircut, and nail trimming for dogs.",
//                 phone1: "+201234567856",
//                 email: "doggrooming@example.com",
//                 address: "5151 Paws Ave, Mesa",
//                 location: { lat: 33.4152, lng: -111.8315 },
//                 rating: 4.9,
//                 priceRange: "$$"
//             },
//             {
//                 id: "58",
//                 userId: "system",
//                 category: "Pet Services",
//                 serviceName: "Pet Sitting",
//                 serviceType: "Dog Walking",
//                 title: "Daily Dog Walking Services",
//                 description: "Reliable dog walking services to keep your pet active and happy.",
//                 phone1: "+201234567857",
//                 email: "dogwalker@example.com",
//                 address: "5252 Walk St, Colorado Springs",
//                 location: { lat: 38.8339, lng: -104.8214 },
//                 rating: 4.8,
//                 priceRange: "$"
//             },
//             {
//                 id: "59",
//                 userId: "system",
//                 category: "Pet Services",
//                 serviceName: "Veterinary Services",
//                 serviceType: "Vaccinations",
//                 title: "Pet Vaccination Clinic",
//                 description: "Affordable vaccination services for dogs and cats with licensed veterinarians.",
//                 phone1: "+201234567858",
//                 email: "petclinic@example.com",
//                 address: "5353 Vet Rd, Omaha",
//                 location: { lat: 41.2565, lng: -95.9345 },
//                 rating: 4.8,
//                 priceRange: "$$"
//             },
//             {
//                 id: "60",
//                 userId: "system",
//                 category: "Pet Services",
//                 serviceName: "Pet Grooming",
//                 serviceType: "Cat Grooming",
//                 title: "Feline Grooming Specialist",
//                 description: "Gentle grooming services specifically for cats in a stress-free environment.",
//                 phone1: "+201234567859",
//                 email: "catgrooming@example.com",
//                 address: "5454 Meow Blvd, Raleigh",
//                 location: { lat: 35.7796, lng: 31.8257 },
//                 rating: 4.7,
//                 priceRange: "$$"
//             },

//             {
//                 id: "61",
//                 userId: "system",
//                 category: "Moving and Storage",
//                 serviceName: "Moving Services",
//                 serviceType: "Local Moving",
//                 title: "Quick & Reliable Local Movers",
//                 description: "Fully licensed movers with 5 years experience. We handle packing, loading, transport and unpacking with care.",
//                 phone1: "+442012345600",
//                 email: "localmovers@example.com",
//                 address: "123 Move St, London",
//                 location: { lat: 51.5074, lng: -0.1278 }
//             },
//             {
//                 id: "62",
//                 userId: "system",
//                 category: "Moving and Storage",
//                 serviceName: "Packing Services",
//                 serviceType: "Packing Assistance",
//                 title: "Professional Packing Services",
//                 description: "Expert packers using high-quality materials. Special care for fragile items. Available same-day.",
//                 phone1: "+12125551234",
//                 email: "packingpros@example.com",
//                 address: "456 Pack Ave, New York",
//                 location: { lat: 40.7128, lng: -74.0060 }
//             },
//             {
//                 id: "63",
//                 userId: "system",
//                 category: "Moving and Storage",
//                 serviceName: "Storage Solutions",
//                 serviceType: "Short-Term Storage",
//                 title: "Secure Short-Term Storage Units",
//                 description: "Climate-controlled storage with 24/7 security monitoring. Various unit sizes available.",
//                 phone1: "+61398765432",
//                 email: "securestorage@example.com",
//                 address: "789 Storage Ln, Sydney",
//                 location: { lat: -33.8688, lng: 151.2093 }
//             },
//             {
//                 id: "64",
//                 userId: "system",
//                 category: "Childcare",
//                 serviceName: "Babysitting",
//                 serviceType: "Evening Babysitting",
//                 title: "Trusted Evening Babysitter",
//                 description: "CPR-certified babysitter available evenings and weekends. Arts, crafts, and educational activities.",
//                 phone1: "+33123456789",
//                 email: "eveningcare@example.com",
//                 address: "101 Child St, Paris",
//                 location: { lat: 48.8566, lng: 2.3522 }
//             },
//             {
//                 id: "65",
//                 userId: "system",
//                 category: "Childcare",
//                 serviceName: "Daycare",
//                 serviceType: "Full-Day Care",
//                 title: "Sunshine Daycare Center",
//                 description: "Licensed daycare with early childhood educators. Nutritious meals included. Ages 6 months to 5 years.",
//                 phone1: "+81398765432",
//                 email: "sunshinedaycare@example.com",
//                 address: "202 Care Blvd, Tokyo",
//                 location: { lat: 35.6762, lng: 139.6503 }
//             },
//             {
//                 id: "66",
//                 userId: "system",
//                 category: "Childcare",
//                 serviceName: "Nanny Services",
//                 serviceType: "Live-In Nanny",
//                 title: "Experienced Live-In Nanny",
//                 description: "10+ years experience with excellent references. Specializes in newborn care and early education.",
//                 phone1: "+971501234567",
//                 email: "professionalnanny@example.com",
//                 address: "303 Nanny Rd, Dubai",
//                 location: { lat: 25.2048, lng: 55.2708 }
//             },
//             {
//                 id: "67",
//                 userId: "system",
//                 category: "Childcare",
//                 serviceName: "Babysitting",
//                 serviceType: "After-School Care",
//                 title: "After-School Childcare",
//                 description: "Pick-up from school, homework help, and engaging activities until parents return from work.",
//                 phone1: "+14165551234",
//                 email: "afterschoolcare@example.com",
//                 address: "404 School St, Toronto",
//                 location: { lat: 43.6532, lng: -79.3832 }
//             },
//             {
//                 id: "68",
//                 userId: "system",
//                 category: "Childcare",
//                 serviceName: "Daycare",
//                 serviceType: "Drop-In Care",
//                 title: "Flexible Drop-In Daycare",
//                 description: "Hourly or daily care when you need it. Safe environment with certified caregivers.",
//                 phone1: "+61298765432",
//                 email: "flexicare@example.com",
//                 address: "505 Flexi Ln, Melbourne",
//                 location: { lat: -37.8136, lng: 144.9631 }
//             },
//             {
//                 id: "69",
//                 userId: "system",
//                 category: "Childcare",
//                 serviceName: "Nanny Services",
//                 serviceType: "Part-Time Nanny",
//                 title: "Reliable Part-Time Nanny",
//                 description: "Available mornings or afternoons. Specializes in toddler care and early development activities.",
//                 phone1: "+442012345678",
//                 email: "parttimenanny@example.com",
//                 address: "606 Nanny Ave, Manchester",
//                 location: { lat: 53.4808, lng: -2.2426 }
//             }
//         ];




//         localStorage.setItem('services', JSON.stringify(initialServices))
//         return initialServices
//     }
// }

// Function to add a new service
export const addService = async (service, accessToken) => {
    console.log('created service:',service);
    
    try {
        const res = await BrikoulchiApi.post('/api/auth/create/service', service, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('service test created: ', res.data);
        return res.data
    } catch (error) {
        console.log('Error while creating the service:', error.message);
    }
}

// Function to get services by userId
export const getUserServices = (userId) => {
    const services = getInitialServices(userId);
    return services
}

// Function to get services by category
export const getServicesByCategory = async (catname) => {
    if (catname === "All Services") {
        return getInitialServices();
    }
    const services = await getInitialServices()

    // console.log('services page');
    // console.log(services);

    return services.filter(service => service.category.name === catname)
}