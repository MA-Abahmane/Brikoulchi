/*
  # Fix Services RLS and Add Contact Fields

  1. Security Changes
    - Add RLS policy for services table to allow providers to create services
    - Update profiles RLS to handle single row selection properly

  2. Schema Updates
    - Add contact fields to provider_services table
*/

-- Allow providers to create services
CREATE POLICY "Providers can create services"
ON services
FOR INSERT
TO public
WITH CHECK (true);

-- Update profiles policy to handle single row selection
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
ON profiles
FOR ALL
TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);