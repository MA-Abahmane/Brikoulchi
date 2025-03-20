import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { supabase } from '../lib/supabase';
import { Star, Eye, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

interface ServiceDetails {
  id: string;
  service: {
    name_en: string;
    name_ar: string;
    name_fr: string;
    description_en: string;
    description_ar: string;
    description_fr: string;
    image_url: string;
    category: {
      id: string;
      name_en: string;
      name_ar: string;
      name_fr: string;
    };
  };
  provider: {
    username: string;
    phone_primary: string;
    email: string;
    whatsapp: string;
  };
  location_lat: number;
  location_lng: number;
  rating_avg: number;
  reviews_count: number;
  views_count: number;
  contact_phone: string;
  contact_email: string;
  contact_website: string | null;
  created_at: string;
}

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchServiceDetails();
      incrementViewCount();
    }
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('provider_services')
        .select(`
          *,
          service:services(
            *,
            category:categories(*)
          ),
          provider:profiles(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Service not found');
      
      setService(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementViewCount = async () => {
    if (!id) return;
    
    try {
      const { error } = await supabase.rpc('increment_service_views', {
        service_id: id
      });

      if (error) throw error;
    } catch (err) {
      console.error('Error incrementing view count:', err);
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

  const getLocalizedDescription = (item: {
    description_en: string;
    description_ar: string;
    description_fr: string;
  }) => {
    switch (i18n.language) {
      case 'ar':
        return item.description_ar;
      case 'fr':
        return item.description_fr;
      default:
        return item.description_en;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error || 'Service not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-64 md:h-96">
          <img
            src={service.service.image_url}
            alt={getLocalizedName(service.service)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {getLocalizedName(service.service)}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>{service.rating_avg.toFixed(1)}</span>
                <span className="text-gray-300">({service.reviews_count} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-5 h-5" />
                <span>{service.views_count} views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">About this service</h2>
              <p className="text-gray-600 mb-6">{getLocalizedDescription(service.service)}</p>

              <h3 className="text-xl font-semibold mb-4">Category</h3>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                {getLocalizedName(service.service.category)}
              </div>

              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="h-64 rounded-lg overflow-hidden mb-6">
                <MapContainer
                  center={[service.location_lat, service.location_lng]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[service.location_lat, service.location_lng]}>
                    <Popup>{getLocalizedName(service.service)}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${service.contact_phone}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        {service.contact_phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${service.contact_email}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        {service.contact_email}
                      </a>
                    </div>
                  </div>

                  {service.contact_website && (
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a
                          href={service.contact_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-700">
                        {service.location_lat.toFixed(6)}, {service.location_lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetails;