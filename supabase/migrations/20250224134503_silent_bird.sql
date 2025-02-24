/*
  # Add Essential Service Categories
  
  1. New Data
    - Adds essential service categories with translations
    - Categories cover most common local services
    
  2. Categories added:
    - Home Services (Cleaning, Maintenance, etc.)
    - Healthcare (Nursing, Physical Therapy, etc.)
    - Education (Tutoring, Language Teaching)
    - Transportation (Drivers, Moving Services)
    - Beauty & Wellness (Hair, Makeup, Massage)
    - Technical Services (IT Support, Electronics Repair)
    - Professional Services (Legal, Accounting)
    - Skilled Trade (Plumbing, Electrical, Carpentry)
*/

INSERT INTO categories (name_en, name_ar, name_fr, description_en, description_ar, description_fr, image_url) 
VALUES 
  (
    'Home Services',
    'خدمات منزلية',
    'Services à Domicile',
    'Cleaning, maintenance, and home improvement services',
    'خدمات التنظيف والصيانة وتحسين المنزل',
    'Services de nettoyage, d''entretien et d''amélioration de la maison',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952'
  ),
  (
    'Healthcare',
    'الرعاية الصحية',
    'Soins de Santé',
    'Medical care and health services',
    'الرعاية الطبية والخدمات الصحية',
    'Services médicaux et de santé',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef'
  ),
  (
    'Education',
    'التعليم',
    'Éducation',
    'Tutoring and educational services',
    'التدريس والخدمات التعليمية',
    'Services de tutorat et d''éducation',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94'
  ),
  (
    'Transportation',
    'المواصلات',
    'Transport',
    'Transportation and moving services',
    'خدمات النقل والتحريك',
    'Services de transport et de déménagement',
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d'
  ),
  (
    'Beauty & Wellness',
    'الجمال والعافية',
    'Beauté & Bien-être',
    'Beauty, spa, and wellness services',
    'خدمات الجمال والسبا والعافية',
    'Services de beauté, spa et bien-être',
    'https://images.unsplash.com/photo-1560750588-73207b1ef5b8'
  ),
  (
    'Technical Services',
    'الخدمات التقنية',
    'Services Techniques',
    'IT support and technical repairs',
    'دعم تكنولوجيا المعلومات والإصلاحات التقنية',
    'Support informatique et réparations techniques',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2'
  ),
  (
    'Professional Services',
    'الخدمات المهنية',
    'Services Professionnels',
    'Legal, accounting, and consulting services',
    'الخدمات القانونية والمحاسبية والاستشارية',
    'Services juridiques, comptables et de conseil',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
  ),
  (
    'Skilled Trade',
    'الحرف الماهرة',
    'Métiers Qualifiés',
    'Plumbing, electrical, and carpentry services',
    'خدمات السباكة والكهرباء والنجارة',
    'Services de plomberie, d''électricité et de menuiserie',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789'
  );