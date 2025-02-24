import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  description_en: string;
  description_ar: string;
  description_fr: string;
  image_url: string;
}

export const Categories = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalizedName = (category: Category) => {
    switch (i18n.language) {
      case 'ar':
        return category.name_ar;
      case 'fr':
        return category.name_fr;
      default:
        return category.name_en;
    }
  };

  const getLocalizedDescription = (category: Category) => {
    switch (i18n.language) {
      case 'ar':
        return category.description_ar;
      case 'fr':
        return category.description_fr;
      default:
        return category.description_en;
    }
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
      <motion.h1 
        className="text-4xl font-bold mb-12 text-neutral text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('nav.categories')}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link 
              to={`/services?category=${category.id}`}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image_url}
                    alt={getLocalizedName(category)}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
                  <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {getLocalizedName(category)}
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 line-clamp-2">
                    {getLocalizedDescription(category)}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-primary font-semibold">
                      {t('categories.viewServices')}
                    </span>
                    <span className="text-gray-400 group-hover:text-primary transition-colors duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};