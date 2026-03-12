import { createContext, useContext, useState, useMemo } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 2000,
    categories: [], // ['Oila', 'Talaba (Qiz)', etc.]
    smoking: null, // null (hammasi), true (chekish mumkin), false (mumkin emas)
    isUrgent: false,
    isCheap: false,
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: 0,
      maxPrice: 2000,
      categories: [],
      smoking: null,
      isUrgent: false,
      isCheap: false,
    });
  };

  const value = useMemo(() => ({
    filters,
    updateFilters,
    resetFilters
  }), [filters]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
