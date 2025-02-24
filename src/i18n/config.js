import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          nav: {
            services: 'Services',
            categories: 'Categories',
            login: 'Login',
            myServices: 'My Services',
            account: 'Account',
            stats: 'Stats',
          },
          home: {
            title: 'Find Local Service Providers',
            subtitle: 'Connect with trusted professionals in your area for all your service needs',
            findServices: 'Find Services',
          },
          signup: {
            title: 'Create Account',
            email: 'Email',
            password: 'Password',
            username: 'Username',
            phone: 'Phone Number',
            isProvider: 'I want to offer services',
            submit: 'Sign Up',
            signingUp: 'Creating Account...',
            haveAccount: 'Already have an account?',
            loginLink: 'Login here',
          },
          services: {
            categories: 'Filter by Category',
          },
          categories: {
            viewServices: 'View Services',
          },
        },
      },
      ar: {
        translation: {
          nav: {
            services: 'الخدمات',
            categories: 'التصنيفات',
            login: 'تسجيل الدخول',
            myServices: 'خدماتي',
            account: 'الحساب',
            stats: 'الإحصائيات',
          },
          home: {
            title: 'ابحث عن مقدمي الخدمات المحليين',
            subtitle: 'تواصل مع المهنيين الموثوق بهم في منطقتك لجميع احتياجات خدماتك',
            findServices: 'ابحث عن الخدمات',
          },
          signup: {
            title: 'إنشاء حساب',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            username: 'اسم المستخدم',
            phone: 'رقم الهاتف',
            isProvider: 'أريد تقديم الخدمات',
            submit: 'التسجيل',
            signingUp: 'جاري إنشاء الحساب...',
            haveAccount: 'لديك حساب بالفعل؟',
            loginLink: 'سجل دخول هنا',
          },
          services: {
            categories: 'تصفية حسب الفئة',
          },
          categories: {
            viewServices: 'عرض الخدمات',
          },
        },
      },
      fr: {
        translation: {
          nav: {
            services: 'Services',
            categories: 'Catégories',
            login: 'Connexion',
            myServices: 'Mes Services',
            account: 'Compte',
            stats: 'Statistiques',
          },
          home: {
            title: 'Trouvez des Prestataires Locaux',
            subtitle: 'Connectez-vous avec des professionnels de confiance dans votre région pour tous vos besoins en services',
            findServices: 'Trouver des Services',
          },
          signup: {
            title: 'Créer un Compte',
            email: 'Email',
            password: 'Mot de passe',
            username: 'Nom d\'utilisateur',
            phone: 'Numéro de téléphone',
            isProvider: 'Je veux offrir des services',
            submit: 'S\'inscrire',
            signingUp: 'Création du compte...',
            haveAccount: 'Vous avez déjà un compte ?',
            loginLink: 'Connectez-vous ici',
          },
          services: {
            categories: 'Filtrer par Catégorie',
          },
          categories: {
            viewServices: 'Voir les Services',
          },
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });