import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../lib/store';
import { Eye, Star, MapPin, Plus } from 'lucide-react';

interface ProviderService {
  id: string;
  location_lat: number;
  location_lng: number;
  views_count: number;
  rating_avg: number;
  active: boolean;
  service: {
    name_en: string;
    name_ar: string;
    name_fr: string;
    description_en: string;
    description_ar: string;
    description_fr: string;
    image_url: string;
  };
}

export const MyServices = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const [services, setServices] = useState<ProviderService[]>([]);

  useEffect(() => {
    if (user) {
      fetchMyServices();
    }
  }, [user]);

  const fetchMyServices = async () => {
    const { data, error } = await supabase
      .from('provider_services')
      .select(`
        *,
        service:services(
          name_en,
          name_ar,
          name_fr,
          description_en,
          description_ar,
          description_fr,
          image_url
        )
      `)
      .eq('provider_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      return;
    }

    setServices(data);
  };

  const getLocalizedName = (service: ProviderService['service']) => {
    switch (i18n.language) {
      case 'ar':
        return service.name_ar;
      case 'fr':
        return service.name_fr;
      default:
        return service.name_en;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral">{t('nav.myServices')}</h1>
        <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          <span>{t('myServices.addNew')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={service.service.image_url}
              alt={getLocalizedName(service.service)}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-neutral">
                  {getLocalizedName(service.service)}
                </h2>
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{service.views_count}</span>
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm text-gray-500">
                    {service.rating_avg.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin size={16} />
                <span className="text-sm">
                  {service.location_lat.toFixed(6)}, {service.location_lng.toFixed(6)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    service.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {service.active ? t('myServices.active') : t('myServices.inactive')}
                </span>
                <button className="text-primary hover:text-primary-light transition-colors">
                  {t('myServices.edit')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};