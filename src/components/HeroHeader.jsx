import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';
import { useFilters } from '../context/FilterContext';
import { Search, MapPin, DollarSign, Cigarette as Smoke } from 'lucide-react';

const HeroHeader = ({ onNavigate, onLogoClick }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { filters, updateFilters } = useFilters();
  
  // Background images for slider
  const bgImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1f2d9368ce?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleCategory = (cat) => {
    const newCats = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    updateFilters({ categories: newCats });
  };

  const staticTags = [
    { id: 'Oila', label: t('tag_family') },
    { id: 'Talaba (O\'g\'il)', label: t('filter_who_student_m') },
    { id: 'Talaba (Qiz)', label: t('filter_who_student_f') },
    { id: 'Arzon', label: t('tag_cheap') },
    { id: 'Srochna', label: t('tag_urgent') }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden">
      <Navbar onNavigate={onNavigate} onLogoClick={onLogoClick} />

      <div className="absolute inset-0 z-0">
        {bgImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-slider-img"
            style={{
              backgroundImage: `url(${img})`,
              animationDelay: `${index * 5}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[var(--color-base-black)]/60 z-0"></div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full mt-24 px-4 sm:px-6 mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-4 tracking-tight drop-shadow-lg">
          {t('hero_title')}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {staticTags.map((tag) => (
            <span
              key={tag.id}
              onClick={() => toggleCategory(tag.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border cursor-pointer transition-all ${
                filters.categories.includes(tag.id)
                  ? 'bg-[var(--color-primary-accent)] text-white border-[var(--color-primary-accent)] shadow-[0_0_15px_rgba(3,92,58,0.5)]'
                  : 'bg-[var(--color-forest-900)]/80 text-gray-300 border-[var(--color-forest-700)] hover:text-white hover:border-white'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="w-full max-w-4xl bg-[var(--color-base-dark)]/70 backdrop-blur-xl border border-[var(--color-forest-900)] rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="flex flex-col">
                <label className="text-xs font-black text-gray-500 mb-2 uppercase tracking-widest ml-1">{t('filter_location')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary-accent)] w-4 h-4" />
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => updateFilters({ location: e.target.value.toUpperCase() })}
                    placeholder={t('filter_location_placeholder')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary-accent)] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-black text-gray-500 mb-2 uppercase tracking-widest ml-1">{t('filter_rent')}</label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilters({ minPrice: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-2 py-3.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                    />
                  </div>
                  <span className="text-gray-600">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilters({ maxPrice: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-2 py-3.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-black text-gray-500 mb-2 uppercase tracking-widest ml-1">Chekasizmi?</label>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => updateFilters({ smoking: true })}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${filters.smoking === true ? 'bg-[var(--color-primary-accent)] text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    HA
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFilters({ smoking: false })}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${filters.smoking === false ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    YO'Q
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFilters({ smoking: null })}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${filters.smoking === null ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    HAMMASI
                  </button>
                </div>
              </div>

            </div>

            <div className="pt-4 mt-6 border-t border-white/5">
              <button
                type="submit"
                className="w-full py-4.5 rounded-2xl text-lg font-black text-white bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-hover)] shadow-lg transform hover:-translate-y-1 transition-all uppercase tracking-[0.2em]"
              >
                {t('btn_search')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
