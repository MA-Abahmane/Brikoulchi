/*
  # Add contact information to provider services

  1. Changes
    - Add contact information columns to provider_services table:
      - contact_phone (text)
      - contact_email (text)
      - contact_website (text)

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE provider_services
ADD COLUMN IF NOT EXISTS contact_phone text,
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS contact_website text;