# ServiceHub - Local Service Provider Platform

ServiceHub is a modern web application that connects local service providers with customers, making it easy to discover and contact professional service providers in your area.

## Features

- 🌍 Multi-language support (English, Arabic, French)
- 🗺️ Interactive Google Maps integration
- 🔍 Advanced search and filtering
- ⭐ Rating and review system
- 📱 Responsive design
- 🔒 Secure authentication
- 📊 Provider statistics and analytics

## Tech Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Google Maps API for location services
- Supabase for backend and authentication
- i18next for internationalization
- Zustand for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```
3. Look out for a file by the name `env.txt`; it contains the envorimen variables for testing:
```
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   VITE_GOOGLE_MAPS_API_KEY=
   /* Copy the values of these vars to use in your .env file */
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── lib/           # Utilities and configurations
├── i18n/          # Internationalization
└── assets/        # Static assets
```

## Database Schema

The application uses Supabase with the following main tables:
- profiles
- categories
- services
- provider_services
- service_reviews
- service_views

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.