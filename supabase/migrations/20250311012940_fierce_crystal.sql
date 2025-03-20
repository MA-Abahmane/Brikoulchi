/*
  # Add function to increment service views

  Creates a function to safely increment the views_count for a service
*/

CREATE OR REPLACE FUNCTION increment_service_views(service_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE provider_services
  SET views_count = views_count + 1
  WHERE id = service_id;
END;
$$;