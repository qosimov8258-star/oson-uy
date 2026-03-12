import { useState, useEffect } from 'react';
import { Menu, X, UserCog, UserCircle, Globe, ChevronDown, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ forceSolid = false, onNavigate, onLogoClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    if (!forceSolid) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceSolid]);

  const bgColor = forceSolid || isScrolled
    ? 'bg-[var(--color-base-dark)]/90 backdrop-blur-md border-b border-[var(--color-forest-900)] shadow-lg'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => onLogoClick ? onLogoClick() : onNavigate('landing')}
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[var(--color-primary-accent)] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(3,92,58,0.3)] group-hover:scale-110 transition-transform duration-300">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col items-start leading-none -space-y-0.5">
                <span className="text-2xl font-black tracking-tighter">
                  <span className="text-[var(--color-primary-accent)]">Oson</span>
                  <span className="text-white">Uy</span>
                </span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-0.5">
                  Platform
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* CTA Button */}
            <button
              onClick={() => onNavigate('post-ad')}
              className="inline-flex items-center justify-center px-8 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] shadow-md hover:shadow-lg hover:shadow-[var(--color-primary-accent)]/30 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('nav_post_ad')}
            </button>

            {/* Admin Link */}
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
              title={t('nav_admin')}
            >
              <UserCog className="w-5 h-5 mr-2" />
              <span>{t('nav_admin')}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[var(--color-primary-accent)] transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">{language === 'uz' ? "UZ" : "RU"}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[var(--color-base-dark)]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={() => { setLanguage('uz'); setIsLangOpen(false); }}
                    className={`w-full px-4 py-3 text-left text-xs font-bold hover:bg-[var(--color-primary-accent)] hover:text-white transition-colors ${language === 'uz' ? 'text-[var(--color-primary-accent)]' : 'text-gray-400'}`}
                  >
                    O'zbekcha
                  </button>
                  <button
                    onClick={() => { setLanguage('ru'); setIsLangOpen(false); }}
                    className={`w-full px-4 py-3 text-left text-xs font-bold hover:bg-[var(--color-primary-accent)] hover:text-white transition-colors ${language === 'ru' ? 'text-[var(--color-primary-accent)]' : 'text-gray-400'}`}
                  >
                    Русский
                  </button>
                </div>
              )}
            </div>

            {/* Registration Button */}
            <button 
              onClick={() => onNavigate('/registration')}
              className="bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(3,92,58,0.3)] active:scale-95"
            >
              {t('nav_register')}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden space-x-4">
             {/* Mobile Language Toggle */}
             <button
                onClick={() => setLanguage(language === 'uz' ? 'ru' : 'uz')}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black"
              >
                {language === 'uz' ? "RU" : "UZ"}
              </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-[var(--color-forest-900)] transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-[var(--color-base-dark)] border-b border-[var(--color-forest-900)] shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <button
            onClick={() => { onNavigate('post-ad'); setIsMobileMenuOpen(false); }}
            className="flex justify-center w-full px-5 py-4 text-base font-bold text-white bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] rounded-xl transition-all"
          >
            {t('nav_post_ad')}
          </button>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { onNavigate('admin'); setIsMobileMenuOpen(false); }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            >
              <UserCog className="w-6 h-6 mb-2" />
              <span className="text-xs font-bold uppercase tracking-widest">{t('nav_admin')}</span>
            </button>
            <button
              onClick={() => { onNavigate('registration'); setIsMobileMenuOpen(false); }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            >
              <UserCircle className="w-6 h-6 mb-2" />
              <span className="text-xs font-bold uppercase tracking-widest">{t('nav_profile')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
