import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { Phone, MapPin, Star, Eye, Search, Filter, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in webpack/vite environments
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ProviderService {
  id: string;
  location_lat: number;
  location_lng: number;
  views_count: number;
  rating_avg: number;
  service: {
    name_en: string; 
    name_ar: string;
    name_fr: string;
    description_en: string;
    description_ar: string;
    description_fr: string;
    image_url: string;
  };
  provider: {
    username: string;
    phone_primary: string;
    phone_secondary: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
  };
}

export const Services = () => {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<ProviderService[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState<[number, number]>([25.2048, 55.2708]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
        fetchNearbyServices(position.coords.latitude, position.coords.longitude);
      },
      () => {
        fetchNearbyServices(center[0], center[1]);
      }
    );
  }, []);

  const fetchNearbyServices = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
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
          ),
          provider:profiles(
            username,
            phone_primary,
            phone_secondary,
            whatsapp,
            facebook,
            instagram
          )
        `)
        .order('location_lat', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalizedName = useCallback((service: ProviderService['service']) => {
    switch (i18n.language) {
      case 'ar':
        return service.name_ar;
      case 'fr':
        return service.name_fr;
      default:
        return service.name_en;
    }
  }, [i18n.language]);

  const getLocalizedDescription = useCallback((service: ProviderService['service']) => {
    switch (i18n.language) {
      case 'ar':
        return service.description_ar;
      case 'fr':
        return service.description_fr;
      default:
        return service.description_en;
    }
  }, [i18n.language]);

  const filteredServices = services.filter(service => 
    getLocalizedName(service.service).toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.provider.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section and Featured Services sections remain the same */}
      
      {/* OpenStreetMap Section */}
      <div id="map" className="h-[600px] relative z-0">
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredServices.map((service) => (
            <Marker
              key={service.id}
              position={[service.location_lat, service.location_lng]}
            >
              <Popup>
                <div className="p-4 max-w-xs">
                  <img
                    src={service.service.image_url}
                    alt={getLocalizedName(service.service)}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-bold text-lg mb-1">
                    {getLocalizedName(service.service)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {getLocalizedDescription(service.service)}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{service.rating_avg.toFixed(1)}</span>
                    <Eye className="w-4 h-4 ml-2" />
                    <span>{service.views_count}</span>
                  </div>

                  <div className="border-t pt-2">
                    <h4 className="font-semibold mb-1">{service.provider.username}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${service.provider.phone_primary}`} className="text-primary hover:underline">
                        {service.provider.phone_primary}
                      </a>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};