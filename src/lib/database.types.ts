export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          phone_primary: string | null;
          phone_secondary: string | null;
          whatsapp: string | null;
          facebook: string | null;
          instagram: string | null;
          location_lat: number | null;
          location_lng: number | null;
          preferred_language: string;
          is_provider: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          phone_primary?: string | null;
          phone_secondary?: string | null;
          whatsapp?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          preferred_language?: string;
          is_provider?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          phone_primary?: string | null;
          phone_secondary?: string | null;
          whatsapp?: string | null;
          facebook?: string | null;
          instagram?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          preferred_language?: string;
          is_provider?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name_en: string;
          name_ar: string;
          name_fr: string;
          description_en: string | null;
          description_ar: string | null;
          description_fr: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_en: string;
          name_ar: string;
          name_fr: string;
          description_en?: string | null;
          description_ar?: string | null;
          description_fr?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_en?: string;
          name_ar?: string;
          name_fr?: string;
          description_en?: string | null;
          description_ar?: string | null;
          description_fr?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          category_id: string;
          name_en: string;
          name_ar: string;
          name_fr: string;
          description_en: string | null;
          description_ar: string | null;
          description_fr: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name_en: string;
          name_ar: string;
          name_fr: string;
          description_en?: string | null;
          description_ar?: string | null;
          description_fr?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name_en?: string;
          name_ar?: string;
          name_fr?: string;
          description_en?: string | null;
          description_ar?: string | null;
          description_fr?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      provider_services: {
        Row: {
          id: string;
          provider_id: string;
          service_id: string;
          location_lat: number;
          location_lng: number;
          active: boolean;
          views_count: number;
          rating_avg: number;
          reviews_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          service_id: string;
          location_lat: number;
          location_lng: number;
          active?: boolean;
          views_count?: number;
          rating_avg?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          service_id?: string;
          location_lat?: number;
          location_lng?: number;
          active?: boolean;
          views_count?: number;
          rating_avg?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      service_views: {
        Row: {
          id: string;
          provider_service_id: string;
          viewer_ip: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_service_id: string;
          viewer_ip?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_service_id?: string;
          viewer_ip?: string | null;
          created_at?: string;
        };
      };
      service_reviews: {
        Row: {
          id: string;
          provider_service_id: string;
          reviewer_id: string | null;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_service_id: string;
          reviewer_id?: string | null;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_service_id?: string;
          reviewer_id?: string | null;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}