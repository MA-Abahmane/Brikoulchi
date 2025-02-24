/*
  # Initial Schema Setup for Service Management App

  1. New Tables
    - `profiles`
      - User profiles with contact information and settings
    - `categories`
      - Predefined service categories
    - `services`
      - Predefined service templates
    - `provider_services`
      - Services offered by providers
    - `service_views`
      - Track service listing views
    - `service_reviews`
      - User reviews and ratings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Public read access to categories, services
      - Authenticated provider access to own services
      - Public read access to provider services
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  phone_primary text,
  phone_secondary text,
  whatsapp text,
  facebook text,
  instagram text,
  location_lat decimal,
  location_lng decimal,
  preferred_language text DEFAULT 'en',
  is_provider boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  name_fr text NOT NULL,
  description_en text,
  description_ar text,
  description_fr text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES categories ON DELETE CASCADE,
  name_en text NOT NULL,
  name_ar text NOT NULL,
  name_fr text NOT NULL,
  description_en text,
  description_ar text,
  description_fr text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create provider_services table
CREATE TABLE IF NOT EXISTS provider_services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id uuid REFERENCES profiles ON DELETE CASCADE,
  service_id uuid REFERENCES services ON DELETE CASCADE,
  location_lat decimal NOT NULL,
  location_lng decimal NOT NULL,
  active boolean DEFAULT true,
  views_count integer DEFAULT 0,
  rating_avg decimal DEFAULT 0,
  reviews_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_views table
CREATE TABLE IF NOT EXISTS service_views (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_service_id uuid REFERENCES provider_services ON DELETE CASCADE,
  viewer_ip text,
  created_at timestamptz DEFAULT now()
);

-- Create service_reviews table
CREATE TABLE IF NOT EXISTS service_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_service_id uuid REFERENCES provider_services ON DELETE CASCADE,
  reviewer_id uuid REFERENCES profiles ON DELETE SET NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Services policies
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

-- Provider services policies
CREATE POLICY "Provider services are viewable by everyone"
  ON provider_services FOR SELECT
  USING (true);

CREATE POLICY "Providers can insert their own services"
  ON provider_services FOR INSERT
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their own services"
  ON provider_services FOR UPDATE
  USING (auth.uid() = provider_id);

-- Service views policies
CREATE POLICY "Anyone can insert service views"
  ON service_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service views are viewable by the service provider"
  ON service_views FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM provider_services
    WHERE provider_services.id = service_views.provider_service_id
    AND provider_services.provider_id = auth.uid()
  ));

-- Service reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON service_reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON service_reviews FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);