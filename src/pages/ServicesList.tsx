import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Phone } from 'lucide-react';

interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
}

interface Service {
  id: string;
  category_id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  description_en: string;
  description_ar: string;
  description_fr: string;
  image_url: string;
  providers: {
    id: string;
    provider: {
      username: string;
      phone_primary: string;
    };
    location_lat: number;
    location_lng: number;
    rating_avg: number;
  }[];
}

export const ServicesList = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    fetchCategories();
    fetchServices();
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name_en, name_ar, name_fr');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('services')
        .select(`
          *,
          providers:provider_services(
            id,
            provider:profiles(username, phone_primary),
            location_lat,
            location_lng,
            rating_avg
          )
        `);

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalizedName = (item: { name_en: string; name_ar: string; name_fr: string }) => {
    switch (i18n.language) {
      case 'ar':
        return item.name_ar;
      case 'fr':
        return item.name_fr;
      default:
        return item.name_en;
    }
  };

  const getLocalizedDescription = (service: Service) => {
    switch (i18n.language) {
      case 'ar':
        return service.description_ar;
      case 'fr':
        return service.description_fr;
      default:
        return service.description_en;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <motion.div 
          className="lg:w-64 bg-white p-6 rounded-xl shadow-lg h-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 text-neutral">
            Categories
          </h2>
          <div className="space-y-3">
            {categories.map(category => (
              <label
                key={category.id}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="form-radio h-5 w-5 text-primary rounded-full border-gray-300 focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary transition-colors">
                  {getLocalizedName(category)}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img
                      src={service.image_url}
                      alt={getLocalizedName(service)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                      {getLocalizedName(service)}
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      {getLocalizedDescription(service)}
                    </p>
                    
                    <div className="space-y-4">
                      {service.providers.map(provider => (
                        <motion.div
                          key={provider.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-t pt-4 first:border-t-0 first:pt-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-neutral">
                              {provider.provider.username}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-600">
                                {provider.rating_avg.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {provider.location_lat.toFixed(2)}, {provider.location_lng.toFixed(2)}
                              </span>
                            </div>
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={`tel:${provider.provider.phone_primary}`}
                              className="flex items-center space-x-1 text-primary hover:text-primary-dark transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              <span>{provider.provider.phone_primary}</span>
                            </motion.a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};