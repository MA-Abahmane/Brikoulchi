import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../lib/store';
import { Menu, Globe, User } from 'lucide-react';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : i18n.language === 'ar' ? 'fr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            ServiceHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/services" className="hover:text-secondary">
              {t('nav.services')}
            </Link>
            <Link to="/categories" className="hover:text-secondary">
              {t('nav.categories')}
            </Link>
            
            {user ? (
              <>
                <Link to="/my-services" className="hover:text-secondary">
                  {t('nav.myServices')}
                </Link>
                <Link to="/account" className="hover:text-secondary">
                  {t('nav.account')}
                </Link>
                <Link to="/stats" className="hover:text-secondary">
                  {t('nav.stats')}
                </Link>
              </>
            ) : (
              <Link to="/login" className="hover:text-secondary">
                {t('nav.login')}
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-primary-light rounded-full"
            >
              <Globe size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-primary-light rounded-full"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/services" className="block py-2 hover:text-secondary">
              {t('nav.services')}
            </Link>
            <Link to="/categories" className="block py-2 hover:text-secondary">
              {t('nav.categories')}
            </Link>
            
            {user ? (
              <>
                <Link to="/my-services" className="block py-2 hover:text-secondary">
                  {t('nav.myServices')}
                </Link>
                <Link to="/account" className="block py-2 hover:text-secondary">
                  {t('nav.account')}
                </Link>
                <Link to="/stats" className="block py-2 hover:text-secondary">
                  {t('nav.stats')}
                </Link>
              </>
            ) : (
              <Link to="/login" className="block py-2 hover:text-secondary">
                {t('nav.login')}
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="w-full text-left py-2 hover:text-secondary flex items-center"
            >
              <Globe size={20} className="mr-2" />
              Change Language
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};