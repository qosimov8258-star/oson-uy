import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, ChevronRight } from 'lucide-react';
import { properties } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useFilters } from '../context/FilterContext';

const ListingGrid = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { filters } = useFilters();

  const filteredListings = useMemo(() => {
    return properties.filter(item => {
      // Location Filter (City or address)
      const matchesLocation = !filters.location || 
        item.city.toUpperCase().includes(filters.location) ||
        item.location.toUpperCase().includes(filters.location);

      // Price Range Filter
      const matchesPrice = item.numericPrice >= filters.minPrice && item.numericPrice <= filters.maxPrice;

      // Category Filter (Multi-select)
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(item.category) ||
        filters.categories.some(cat => item.tags?.includes(cat));

      // Habits Filter (Smoking)
      const matchesSmoking = filters.smoking === null || item.rules?.smoking === filters.smoking;

      return matchesLocation && matchesPrice && matchesCategory && matchesSmoking;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center">
            <span className="w-2 h-10 bg-[var(--color-primary-accent)] rounded-full mr-4 shadow-[0_0_15px_rgba(3,92,58,0.5)]"></span>
            {filters.location ? `"${filters.location}"` : t('results_recent')}
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-bold tracking-widest uppercase">
            {filteredListings.length} {t('results_found')}
          </p>
        </div>
        
        <button className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[var(--color-primary-accent)] hover:text-white transition-all group">
          <span>{t('btn_view_all')}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredListings.map((property) => (
            <div 
              key={property.id} 
              onClick={() => navigate(`/property/${property.id}`)}
              className="group bg-[var(--color-base-dark)]/40 border border-[var(--color-forest-900)] rounded-[2.5rem] overflow-hidden hover:border-[var(--color-primary-accent)] hover:shadow-[0_20px_50px_rgba(3,92,58,0.15)] transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  <span className="px-4 py-1.5 bg-[var(--color-primary-accent)] text-white text-[9px] font-black uppercase rounded-xl shadow-xl backdrop-blur-md">
                    {property.numericPrice < 300 ? t('tag_cheap') : t('tag_urgent')}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base-dark)] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-primary-accent)] transition-colors line-clamp-1">{property.title || property.location}</h3>
                  <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                    <MapPin className="w-3 h-3 mr-1.5 text-[var(--color-primary-accent)]" />
                    {property.city}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs font-bold text-gray-400">
                      <Users className="w-3.5 h-3.5 mr-2 text-[var(--color-primary-accent)]" />
                      {property.capacity}
                    </div>
                    {property.category && (
                      <div className="text-[9px] font-black text-white/50 uppercase tracking-tighter bg-white/5 px-3 py-1 rounded-lg">
                        {property.category}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-black text-white tracking-tighter">
                    {property.price}
                    <span className="text-[10px] text-gray-600 font-bold ml-1 uppercase">/{t('detail_month')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
            <Search className="w-12 h-12 text-[var(--color-primary-accent)]" />
          </div>
          <h3 className="text-3xl font-black text-white mb-4">{t('results_none')}</h3>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            {t('results_empty_msg')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListingGrid;
