import { useState, useMemo } from 'react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';

const defaultFilters = { search: '', minPrice: '', maxPrice: '', minBeds: '', minBaths: '', type: '', sort: 'newest' };

export default function HomePage() {
  const [filters, setFilters] = useState(defaultFilters);

  const filtered = useMemo(() => {
    let list = [...properties];
    const { search, minPrice, maxPrice, minBeds, minBaths, type, sort } = filters;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.zip.includes(q)
      );
    }
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (minBeds) list = list.filter(p => p.beds >= Number(minBeds));
    if (minBaths) list = list.filter(p => p.baths >= Number(minBaths));
    if (type) list = list.filter(p => p.type === type);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'sqft') list.sort((a, b) => b.sqft - a.sqft);
    else list.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
    return list;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Dream Home</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Browse listings and represent yourself with confidence. No agent fees — just the right information at your fingertips.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        {[
          { label: 'Active Listings', value: properties.length },
          { label: 'Avg Days on Market', value: Math.round(properties.reduce((a, p) => a + p.daysOnMarket, 0) / properties.length) },
          { label: 'Cities', value: new Set(properties.map(p => p.city)).size },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-3xl font-bold text-blue-600">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <SearchFilters filters={filters} onFilterChange={setFilters} />

      <div className="mt-4 mb-3 flex items-center justify-between">
        <p className="text-sm text-gray-500">{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</p>
        {JSON.stringify(filters) !== JSON.stringify(defaultFilters) && (
          <button onClick={() => setFilters(defaultFilters)} className="text-sm text-blue-600 hover:underline">Clear all filters</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-lg font-medium">No properties match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
