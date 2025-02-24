import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../lib/store';
import { BarChart, Eye, Star, MessageSquare } from 'lucide-react';

interface Stats {
  total_views: number;
  total_reviews: number;
  average_rating: number;
  active_services: number;
}

interface ServiceStats {
  id: string;
  views_count: number;
  reviews_count: number;
  rating_avg: number;
  service: {
    name_en: string;
    name_ar: string;
    name_fr: string;
  };
}

export const Stats = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchServiceStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('provider_services')
        .select('views_count, reviews_count, rating_avg, active')
        .eq('provider_id', user?.id);

      if (error) throw error;

      const stats = data.reduce(
        (acc, curr) => ({
          total_views: acc.total_views + curr.views_count,
          total_reviews: acc.total_reviews + curr.reviews_count,
          average_rating:
            acc.total_reviews > 0
              ? (acc.average_rating * acc.total_reviews + curr.rating_avg * curr.reviews_count) /
                (acc.total_reviews + curr.reviews_count)
              : 0,
          active_services: acc.active_services + (curr.active ? 1 : 0),
        }),
        { total_views: 0, total_reviews: 0, average_rating: 0, active_services: 0 }
      );

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchServiceStats = async () => {
    try {
      const { data, error } = await supabase
        .from('provider_services')
        .select(`
          id,
          views_count,
          reviews_count,
          rating_avg,
          service:services(
            name_en,
            name_ar,
            name_fr
          )
        `)
        .eq('provider_id', user?.id)
        .order('views_count', { ascending: false });

      if (error) throw error;

      setServiceStats(data);
    } catch (error) {
      console.error('Error fetching service stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalizedName = (service: ServiceStats['service']) => {
    switch (i18n.language) {
      case 'ar':
        return service.name_ar;
      case 'fr':
        return service.name_fr;
      default:
        return service.name_en;
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BarChart size={32} className="text-primary" />
        <h1 className="text-3xl font-bold text-neutral">{t('nav.stats')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-primary" />
            <h2 className="text-lg font-semibold text-neutral">
              {t('stats.totalViews')}
            </h2>
          </div>
          <p className="text-3xl font-bold text-neutral">{stats?.total_views}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h2 className="text-lg font-semibold text-neutral">
              {t('stats.totalReviews')}
            </h2>
          </div>
          <p className="text-3xl font-bold text-neutral">{stats?.total_reviews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-8 h-8 text-primary" />
            <h2 className="text-lg font-semibold text-neutral">
              {t('stats.averageRating')}
            </h2>
          </div>
          <p className="text-3xl font-bold text-neutral">
            {stats?.average_rating.toFixed(1)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="w-8 h-8 text-primary" />
            <h2 className="text-lg font-semibold text-neutral">
              {t('stats.activeServices')}
            </h2>
          </div>
          <p className="text-3xl font-bold text-neutral">{stats?.active_services}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-neutral mb-6">
        {t('stats.servicePerformance')}
      </h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('stats.service')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('stats.views')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('stats.reviews')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('stats.rating')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceStats.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getLocalizedName(service.service)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{service.views_count}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{service.reviews_count}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {service.rating_avg.toFixed(1)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};